(function () {
    "use strict";

    const App = window.MotoCrazy;
    let cartChannel = null;
    let cartLoading = false;

    App.cart = {
        load: loadCartForUser,
        render: renderCart,
        clear: clearCart,
        total: cartTotal,
        toggle: toggleCart
    };

    App.onReady(initCart);
    App.onLanguageChange(renderCart);

    async function initCart() {
        createCartDrawer();
        bindCartEvents();
        renderCart();

        window.addEventListener("motocrazy:auth-changed", function () {
            loadCartForUser();
        });

        if (App.state.user) {
            await loadCartForUser();
        }
    }

    function createCartDrawer() {
        if (document.getElementById("cartDrawer")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <div id="cartOverlay" class="cart-overlay" data-action="close-cart"></div>
            <aside id="cartDrawer" class="cart-drawer" aria-hidden="true" aria-labelledby="cartTitle">
                <header class="cart-drawer__header">
                    <h2 id="cartTitle">${App.escapeHTML(App.t("cartTitle"))}</h2>
                    <button class="icon-button" type="button" data-action="close-cart" aria-label="${App.escapeAttribute(App.t("closeCart"))}">X</button>
                </header>
                <ul id="cartList" class="cart-list"></ul>
                <footer class="cart-drawer__footer">
                    <div class="cart-total-row">
                        <span>${App.escapeHTML(App.t("cartTotal"))}</span>
                        <strong id="cartTotal">${App.formatMoney(0)}</strong>
                    </div>
                    <p id="cartExchange" class="cart-exchange"></p>
                    <button class="checkout-button" type="button" data-action="checkout">${App.escapeHTML(App.t("checkout"))}</button>
                    <button class="button button--secondary" type="button" data-action="clear-cart">${App.escapeHTML(App.t("clearCart"))}</button>
                </footer>
            </aside>
        `);
    }

    function bindCartEvents() {
        document.addEventListener("click", async function (event) {
            const actionElement = event.target.closest("[data-action]");
            if (!actionElement) return;

            const action = actionElement.dataset.action;
            if (action === "toggle-cart") {
                toggleCart();
                return;
            }

            if (action === "close-cart") {
                toggleCart(false);
                return;
            }

            if (action === "add-to-cart") {
                await addToCart(actionElement.dataset.productType, actionElement.dataset.productId);
                return;
            }

            if (action === "increase") {
                await changeQuantity(actionElement.dataset.cartId, 1);
                return;
            }

            if (action === "decrease") {
                await changeQuantity(actionElement.dataset.cartId, -1);
                return;
            }

            if (action === "remove") {
                await removeFromCart(actionElement.dataset.cartId);
                return;
            }

            if (action === "clear-cart") {
                await clearCart();
                return;
            }

            if (action === "checkout") {
                if (App.checkout && App.checkout.checkoutCart) {
                    await App.checkout.checkoutCart();
                }
            }
        });

        const overlay = document.getElementById("cartOverlay");
        if (overlay) {
            overlay.addEventListener("click", function () {
                toggleCart(false);
            });
        }
    }

    async function loadCartForUser() {
        if (cartLoading) return;
        cartLoading = true;

        try {
            if (!App.state.user) {
                App.state.cart = null;
                App.state.cartItems = [];
                unsubscribeCart();
                renderCart();
                return;
            }

            const cart = await ensureActiveCart();
            if (!cart) return;
            await loadCartItems();
            subscribeCart();
        } catch (error) {
            console.error("Error cargando carrito desde Supabase:", error);
            App.showToast(App.t("cartLoadError"));
            App.state.cartItems = [];
            renderCart();
        } finally {
            cartLoading = false;
        }
    }

    async function ensureActiveCart() {
        const client = App.requireClient();
        const user = App.state.user;
        if (!client || !user) return null;

        if (App.state.cart && App.state.cart.user_id === user.id && App.state.cart.estado === "activo") {
            return App.state.cart;
        }

        const current = await client
            .from("carritos")
            .select("id_carrito,user_id,estado,created_at,updated_at")
            .eq("user_id", user.id)
            .eq("estado", "activo")
            .order("updated_at", { ascending: false })
            .limit(1);

        if (current.error) throw current.error;

        if (current.data && current.data.length) {
            App.state.cart = current.data[0];
            return App.state.cart;
        }

        const created = await client
            .from("carritos")
            .insert({
                user_id: user.id,
                estado: "activo"
            })
            .select("id_carrito,user_id,estado,created_at,updated_at")
            .single();

        if (created.error) throw created.error;
        App.state.cart = created.data;
        return App.state.cart;
    }

    async function loadCartItems() {
        const client = App.requireClient();
        const cart = App.state.cart;
        if (!client || !cart) return;

        const result = await client
            .from("carrito_items")
            .select("id_item,id_carrito,producto_id,tipo,nombre,imagen_url,precio,cantidad,subtotal,created_at")
            .eq("id_carrito", cart.id_carrito)
            .order("created_at", { ascending: true });

        if (result.error) throw result.error;
        App.state.cartItems = Array.isArray(result.data) ? result.data : [];
        renderCart();
    }

    function subscribeCart() {
        const client = App.requireClient();
        const cart = App.state.cart;
        if (!client || !cart || !client.channel) return;

        unsubscribeCart();
        cartChannel = client
            .channel(`cart-${cart.id_carrito}`)
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "carrito_items",
                filter: `id_carrito=eq.${cart.id_carrito}`
            }, function () {
                loadCartItems();
            })
            .subscribe();
    }

    function unsubscribeCart() {
        const client = App.client;
        if (client && cartChannel) {
            client.removeChannel(cartChannel);
        }
        cartChannel = null;
    }

    async function addToCart(type, id) {
        const client = App.requireClient();
        if (!client) return;

        if (!App.state.user) {
            App.showToast(App.t("cartLoginRequired"));
            if (App.auth) App.auth.openModal("login");
            return;
        }

        const product = App.findProduct(type, id);
        if (!product) return;

        try {
            await ensureActiveCart();
            const existing = App.state.cartItems.find(function (item) {
                return String(item.producto_id) === String(product.productId || product.id) && item.tipo === product.type;
            });

            if (existing) {
                const quantity = Number(existing.cantidad || 0) + 1;
                const result = await client
                    .from("carrito_items")
                    .update({
                        cantidad: quantity,
                        subtotal: Number(existing.precio || product.price || 0) * quantity
                    })
                    .eq("id_item", existing.id_item);
                if (result.error) throw result.error;
            } else {
                const result = await client
                    .from("carrito_items")
                    .insert({
                        id_carrito: App.state.cart.id_carrito,
                        producto_id: String(product.productId || product.id),
                        tipo: product.type,
                        nombre: product.name,
                        imagen_url: product.image || App.config.fallbackImage,
                        precio: Number(product.price || 0),
                        cantidad: 1,
                        subtotal: Number(product.price || 0)
                    });
                if (result.error) throw result.error;
            }

            await touchCart();
            await loadCartItems();
            App.showToast(App.t("itemAdded"));
            toggleCart(true);
        } catch (error) {
            console.error("Error actualizando carrito:", error);
            App.showToast(App.t("cartWriteError"));
        }
    }

    async function changeQuantity(idItem, amount) {
        const client = App.requireClient();
        const item = App.state.cartItems.find(function (cartItem) {
            return String(cartItem.id_item) === String(idItem);
        });
        if (!client || !item) return;

        const nextQuantity = Math.max(0, Number(item.cantidad || 0) + amount);
        try {
            if (nextQuantity <= 0) {
                await removeFromCart(idItem);
                return;
            }

            const result = await client
                .from("carrito_items")
                .update({
                    cantidad: nextQuantity,
                    subtotal: Number(item.precio || 0) * nextQuantity
                })
                .eq("id_item", item.id_item);

            if (result.error) throw result.error;
            await touchCart();
            await loadCartItems();
        } catch (error) {
            console.error("Error cambiando cantidad:", error);
            App.showToast(App.t("cartWriteError"));
        }
    }

    async function removeFromCart(idItem) {
        const client = App.requireClient();
        if (!client) return;

        try {
            const result = await client
                .from("carrito_items")
                .delete()
                .eq("id_item", idItem);
            if (result.error) throw result.error;

            await touchCart();
            await loadCartItems();
            App.showToast(App.t("itemRemoved"));
        } catch (error) {
            console.error("Error eliminando item:", error);
            App.showToast(App.t("cartWriteError"));
        }
    }

    async function clearCart(options) {
        const settings = options || {};
        const client = App.requireClient();
        const cart = App.state.cart;
        if (!client || !cart) return;

        try {
            const result = await client
                .from("carrito_items")
                .delete()
                .eq("id_carrito", cart.id_carrito);
            if (result.error) throw result.error;

            App.state.cartItems = [];
            await touchCart();
            renderCart();
            if (!settings.silent) App.showToast(App.t("cartCleared"));
        } catch (error) {
            console.error("Error vaciando carrito:", error);
            App.showToast(App.t("cartWriteError"));
        }
    }

    async function touchCart() {
        const client = App.client;
        const cart = App.state.cart;
        if (!client || !cart) return;

        await client
            .from("carritos")
            .update({ updated_at: new Date().toISOString() })
            .eq("id_carrito", cart.id_carrito);
    }

    function renderCart() {
        const countNode = document.getElementById("cartCount");
        const list = document.getElementById("cartList");
        const totalNode = document.getElementById("cartTotal");
        const title = document.getElementById("cartTitle");
        const checkout = document.querySelector("[data-action='checkout']");
        const clear = document.querySelector("[data-action='clear-cart']");
        const close = document.querySelector("[data-action='close-cart'].icon-button");
        const exchangeNode = document.getElementById("cartExchange");
        const total = cartTotal();
        const itemCount = App.state.cartItems.reduce(function (sum, item) {
            return sum + Number(item.cantidad || 0);
        }, 0);

        if (countNode) countNode.textContent = String(itemCount);
        if (title) title.textContent = App.t("cartTitle");
        if (checkout) checkout.textContent = App.t("checkout");
        if (clear) clear.textContent = App.t("clearCart");
        if (close) close.setAttribute("aria-label", App.t("closeCart"));
        if (totalNode) totalNode.textContent = App.formatMoney(total);

        if (exchangeNode) {
            exchangeNode.textContent = App.state.usdRate && total
                ? `${App.t("exchangeLabel")}: ${App.formatUsd(total * App.state.usdRate)}`
                : "";
        }

        if (!list) return;

        if (!App.state.user) {
            list.innerHTML = `<li class="empty-state">${App.escapeHTML(App.t("cartLoginRequired"))}</li>`;
            return;
        }

        if (!App.state.cartItems.length) {
            list.innerHTML = `<li class="empty-state">${App.escapeHTML(App.t("cartEmpty"))}</li>`;
            return;
        }

        list.innerHTML = App.state.cartItems.map(function (item) {
            return `
                <li class="cart-item">
                    <img src="${App.escapeAttribute(item.imagen_url || App.config.fallbackImage)}" alt="${App.escapeAttribute(item.nombre)}">
                    <div>
                        <h3>${App.escapeHTML(item.nombre)}</h3>
                        <p>${App.escapeHTML(App.formatMoney(item.precio))} x ${Number(item.cantidad || 0)}</p>
                        <p>${App.escapeHTML(App.formatMoney(item.subtotal))}</p>
                    </div>
                    <div class="cart-item__controls">
                        <button class="qty-button" type="button" data-action="decrease" data-cart-id="${App.escapeAttribute(item.id_item)}" aria-label="-">-</button>
                        <span>${Number(item.cantidad || 0)}</span>
                        <button class="qty-button" type="button" data-action="increase" data-cart-id="${App.escapeAttribute(item.id_item)}" aria-label="+">+</button>
                        <button class="icon-button" type="button" data-action="remove" data-cart-id="${App.escapeAttribute(item.id_item)}" aria-label="${App.escapeAttribute(App.t("remove"))}">X</button>
                    </div>
                </li>
            `;
        }).join("");
    }

    function cartTotal() {
        return App.state.cartItems.reduce(function (sum, item) {
            return sum + Number(item.subtotal || 0);
        }, 0);
    }

    function toggleCart(forceOpen) {
        const drawer = document.getElementById("cartDrawer");
        const overlay = document.getElementById("cartOverlay");
        if (!drawer || !overlay) return;

        const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !drawer.classList.contains("is-open");
        drawer.classList.toggle("is-open", shouldOpen);
        overlay.classList.toggle("is-open", shouldOpen);
        drawer.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
        document.body.classList.toggle("cart-open", shouldOpen);
    }
})();
