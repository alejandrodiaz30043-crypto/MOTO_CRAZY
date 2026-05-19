(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;
    let canalCarrito = null;
    let cargandoCarrito = false;

    Aplicacion.cart = {
        load: loadCartForUser,
        render: renderCart,
        clear: clearCart,
        total: totalCarrito,
        toggle: toggleCart
    };

    Aplicacion.onReady(initCart);
    Aplicacion.onLanguageChange(renderCart);

    async function initCart() {
        createCartDrawer();
        bindCartEvents();
        renderCart();

        window.addEventListener("motocrazy:auth-changed", function () {
            loadCartForUser();
        });

        if (Aplicacion.estado.user) {
            await loadCartForUser();
        }
    }

    function createCartDrawer() {
        if (document.getElementById("cajonCarrito")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <section id="superposicionCarrito" class="superposicion-carrito" data-accion="cerrar-carrito"></section>
            <aside id="cajonCarrito" class="cajon-carrito" aria-hidden="true" aria-labelledby="tituloCarrito">
                <header class="cajon-carrito__encabezado">
                    <h2 id="tituloCarrito">${Aplicacion.escapeHTML(Aplicacion.t("tituloCarrito"))}</h2>
                    <button class="boton-icono" type="button" data-accion="cerrar-carrito" aria-label="${Aplicacion.escapeAttribute(Aplicacion.t("closeCart"))}">X</button>
                </header>
                <ul id="listaCarrito" class="lista-carrito"></ul>
                <footer class="cajon-carrito__pie">
                    <section class="fila-total-carrito">
                        <span>${Aplicacion.escapeHTML(Aplicacion.t("totalCarrito"))}</span>
                        <strong id="totalCarrito">${Aplicacion.formatMoney(0)}</strong>
                    </section>
                    <p id="cambioCarrito" class="cambio-carrito"></p>
                    <button class="boton-finalizar" type="button" data-accion="finalizarCompra">${Aplicacion.escapeHTML(Aplicacion.t("finalizarCompra"))}</button>
                    <button class="boton boton--secondary" type="button" data-accion="vaciar-carrito">${Aplicacion.escapeHTML(Aplicacion.t("clearCart"))}</button>
                </footer>
            </aside>
        `);
    }

    function bindCartEvents() {
        document.addEventListener("click", async function (event) {
            const actionElement = event.target.closest("[data-accion]");
            if (!actionElement) return;

            const action = actionElement.dataset.accion;
            if (action === "alternar-carrito") {
                toggleCart();
                return;
            }

            if (action === "cerrar-carrito") {
                toggleCart(false);
                return;
            }

            if (action === "agregar-carrito") {
                await agregarAlCarrito(actionElement.dataset.tipoProducto, actionElement.dataset.idProducto);
                return;
            }

            if (action === "aumentar") {
                await changeQuantity(actionElement.dataset.idCarrito, 1);
                return;
            }

            if (action === "disminuir") {
                await changeQuantity(actionElement.dataset.idCarrito, -1);
                return;
            }

            if (action === "eliminar") {
                await eliminarFromCart(actionElement.dataset.idCarrito);
                return;
            }

            if (action === "vaciar-carrito") {
                await clearCart();
                return;
            }

            if (action === "finalizarCompra") {
                if (Aplicacion.finalizarCompra && Aplicacion.finalizarCompra.finalizarCompraCart) {
                    await Aplicacion.finalizarCompra.finalizarCompraCart();
                }
            }
        });

        const overlay = document.getElementById("superposicionCarrito");
        if (overlay) {
            overlay.addEventListener("click", function () {
                toggleCart(false);
            });
        }
    }

    async function loadCartForUser() {
        if (cargandoCarrito) return;
        cargandoCarrito = true;

        try {
            if (!Aplicacion.estado.user) {
                Aplicacion.estado.cart = null;
                Aplicacion.estado.itemsCarrito = [];
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
            Aplicacion.showToast(Aplicacion.t("errorCargaCarrito"));
            Aplicacion.estado.itemsCarrito = [];
            renderCart();
        } finally {
            cargandoCarrito = false;
        }
    }

    async function ensureActiveCart() {
        const cliente = Aplicacion.requireClient();
        const user = Aplicacion.estado.user;
        if (!cliente || !user) return null;

        if (Aplicacion.estado.cart && Aplicacion.estado.cart.user_id === user.id && Aplicacion.estado.cart.estado === "activo") {
            return Aplicacion.estado.cart;
        }

        const current = await cliente
            .from("carritos")
            .select("id_carrito,user_id,estado,created_at,updated_at")
            .eq("user_id", user.id)
            .eq("estado", "activo")
            .order("updated_at", { ascending: false })
            .limit(1);

        if (current.error) throw current.error;

        if (current.data && current.data.length) {
            Aplicacion.estado.cart = current.data[0];
            return Aplicacion.estado.cart;
        }

        const created = await cliente
            .from("carritos")
            .insert({
                user_id: user.id,
                estado: "activo"
            })
            .select("id_carrito,user_id,estado,created_at,updated_at")
            .single();

        if (created.error) throw created.error;
        Aplicacion.estado.cart = created.data;
        return Aplicacion.estado.cart;
    }

    async function loadCartItems() {
        const cliente = Aplicacion.requireClient();
        const cart = Aplicacion.estado.cart;
        if (!cliente || !cart) return;

        const result = await cliente
            .from("carrito_items")
            .select("id_item,id_carrito,producto_id,tipo,nombre,imagen_url,precio,cantidad,subtotal,created_at")
            .eq("id_carrito", cart.id_carrito)
            .order("created_at", { ascending: true });

        if (result.error) throw result.error;
        Aplicacion.estado.itemsCarrito = Array.isArray(result.data) ? result.data : [];
        renderCart();
    }

    function subscribeCart() {
        const cliente = Aplicacion.requireClient();
        const cart = Aplicacion.estado.cart;
        if (!cliente || !cart || !cliente.channel) return;

        unsubscribeCart();
        canalCarrito = cliente
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
        const cliente = Aplicacion.cliente;
        if (cliente && canalCarrito) {
            cliente.removeChannel(canalCarrito);
        }
        canalCarrito = null;
    }

    async function agregarAlCarrito(type, id) {
        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        if (!Aplicacion.estado.user) {
            Aplicacion.showToast(Aplicacion.t("carritoSesionRequerida"));
            if (Aplicacion.auth) Aplicacion.auth.openModal("login");
            return;
        }

        const producto = Aplicacion.findProduct(type, id);
        if (!producto) return;

        try {
            await ensureActiveCart();
            const existing = Aplicacion.estado.itemsCarrito.find(function (item) {
                return String(item.producto_id) === String(producto.idProducto || producto.id) && item.tipo === producto.type;
            });

            if (existing) {
                const quantity = Number(existing.cantidad || 0) + 1;
                const result = await cliente
                    .from("carrito_items")
                    .update({
                        cantidad: quantity,
                        subtotal: Number(existing.precio || producto.precio || 0) * quantity
                    })
                    .eq("id_item", existing.id_item);
                if (result.error) throw result.error;
            } else {
                const result = await cliente
                    .from("carrito_items")
                    .insert({
                        id_carrito: Aplicacion.estado.cart.id_carrito,
                        producto_id: String(producto.idProducto || producto.id),
                        tipo: producto.type,
                        nombre: producto.name,
                        imagen_url: producto.image || Aplicacion.config.fallbackImage,
                        precio: Number(producto.precio || 0),
                        cantidad: 1,
                        subtotal: Number(producto.precio || 0)
                    });
                if (result.error) throw result.error;
            }

            await touchCart();
            await loadCartItems();
            Aplicacion.showToast(Aplicacion.t("itemAgregado"));
            toggleCart(true);
        } catch (error) {
            console.error("Error actualizando carrito:", error);
            Aplicacion.showToast(Aplicacion.t("errorEscrituraCarrito"));
        }
    }

    async function changeQuantity(idItem, amount) {
        const cliente = Aplicacion.requireClient();
        const item = Aplicacion.estado.itemsCarrito.find(function (cartItem) {
            return String(cartItem.id_item) === String(idItem);
        });
        if (!cliente || !item) return;

        const nextQuantity = Math.max(0, Number(item.cantidad || 0) + amount);
        try {
            if (nextQuantity <= 0) {
                await eliminarFromCart(idItem);
                return;
            }

            const result = await cliente
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
            Aplicacion.showToast(Aplicacion.t("errorEscrituraCarrito"));
        }
    }

    async function eliminarFromCart(idItem) {
        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        try {
            const result = await cliente
                .from("carrito_items")
                .delete()
                .eq("id_item", idItem);
            if (result.error) throw result.error;

            await touchCart();
            await loadCartItems();
            Aplicacion.showToast(Aplicacion.t("itemEliminado"));
        } catch (error) {
            console.error("Error eliminando item:", error);
            Aplicacion.showToast(Aplicacion.t("errorEscrituraCarrito"));
        }
    }

    async function clearCart(options) {
        const ajustes = options || {};
        const cliente = Aplicacion.requireClient();
        const cart = Aplicacion.estado.cart;
        if (!cliente || !cart) return;

        try {
            const result = await cliente
                .from("carrito_items")
                .delete()
                .eq("id_carrito", cart.id_carrito);
            if (result.error) throw result.error;

            Aplicacion.estado.itemsCarrito = [];
            await touchCart();
            renderCart();
            if (!ajustes.silent) Aplicacion.showToast(Aplicacion.t("carritoVaciado"));
        } catch (error) {
            console.error("Error vaciando carrito:", error);
            Aplicacion.showToast(Aplicacion.t("errorEscrituraCarrito"));
        }
    }

    async function touchCart() {
        const cliente = Aplicacion.cliente;
        const cart = Aplicacion.estado.cart;
        if (!cliente || !cart) return;

        await cliente
            .from("carritos")
            .update({ updated_at: new Date().toISOString() })
            .eq("id_carrito", cart.id_carrito);
    }

    function renderCart() {
        const countNode = document.getElementById("contadorCarrito");
        const list = document.getElementById("listaCarrito");
        const totalNode = document.getElementById("totalCarrito");
        const title = document.getElementById("tituloCarrito");
        const finalizarCompra = document.querySelector("[data-accion='finalizarCompra']");
        const clear = document.querySelector("[data-accion='vaciar-carrito']");
        const close = document.querySelector("[data-accion='cerrar-carrito'].boton-icono");
        const exchangeNode = document.getElementById("cambioCarrito");
        const total = totalCarrito();
        const itemCount = Aplicacion.estado.itemsCarrito.reduce(function (sum, item) {
            return sum + Number(item.cantidad || 0);
        }, 0);

        if (countNode) countNode.textContent = String(itemCount);
        if (title) title.textContent = Aplicacion.t("tituloCarrito");
        if (finalizarCompra) finalizarCompra.textContent = Aplicacion.t("finalizarCompra");
        if (clear) clear.textContent = Aplicacion.t("clearCart");
        if (close) close.setAttribute("aria-label", Aplicacion.t("closeCart"));
        if (totalNode) totalNode.textContent = Aplicacion.formatMoney(total);

        if (exchangeNode) {
            exchangeNode.textContent = Aplicacion.estado.usdRate && total
                ? `${Aplicacion.t("etiquetaCambio")}: ${Aplicacion.formatUsd(total * Aplicacion.estado.usdRate)}`
                : "";
        }

        if (!list) return;

        if (!Aplicacion.estado.user) {
            list.innerHTML = `<li class="estado-vacio">${Aplicacion.escapeHTML(Aplicacion.t("carritoSesionRequerida"))}</li>`;
            return;
        }

        if (!Aplicacion.estado.itemsCarrito.length) {
            list.innerHTML = `<li class="estado-vacio">${Aplicacion.escapeHTML(Aplicacion.t("carritoVacio"))}</li>`;
            return;
        }

        list.innerHTML = Aplicacion.estado.itemsCarrito.map(function (item) {
            return `
                <li class="elemento-carrito">
                    <img src="${Aplicacion.escapeAttribute(item.imagen_url || Aplicacion.config.fallbackImage)}" alt="${Aplicacion.escapeAttribute(item.nombre)}">
                    <section>
                        <h3>${Aplicacion.escapeHTML(item.nombre)}</h3>
                        <p>${Aplicacion.escapeHTML(Aplicacion.formatMoney(item.precio))} x ${Number(item.cantidad || 0)}</p>
                        <p>${Aplicacion.escapeHTML(Aplicacion.formatMoney(item.subtotal))}</p>
                    </section>
                    <section class="controles-elemento-carrito">
                        <button class="boton-cantidad" type="button" data-accion="disminuir" data-id-carrito="${Aplicacion.escapeAttribute(item.id_item)}" aria-label="-">-</button>
                        <span>${Number(item.cantidad || 0)}</span>
                        <button class="boton-cantidad" type="button" data-accion="aumentar" data-id-carrito="${Aplicacion.escapeAttribute(item.id_item)}" aria-label="+">+</button>
                        <button class="boton-icono" type="button" data-accion="eliminar" data-id-carrito="${Aplicacion.escapeAttribute(item.id_item)}" aria-label="${Aplicacion.escapeAttribute(Aplicacion.t("eliminar"))}">X</button>
                    </section>
                </li>
            `;
        }).join("");
    }

    function totalCarrito() {
        return Aplicacion.estado.itemsCarrito.reduce(function (sum, item) {
            return sum + Number(item.subtotal || 0);
        }, 0);
    }

    function toggleCart(forceOpen) {
        const drawer = document.getElementById("cajonCarrito");
        const overlay = document.getElementById("superposicionCarrito");
        if (!drawer || !overlay) return;

        const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !drawer.classList.contains("esta-abierto");
        drawer.classList.toggle("esta-abierto", shouldOpen);
        overlay.classList.toggle("esta-abierto", shouldOpen);
        drawer.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
        document.body.classList.toggle("carrito-abierto", shouldOpen);
    }
})();
