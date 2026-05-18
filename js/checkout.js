(function () {
    "use strict";

    const App = window.MotoCrazy;

    App.checkout = {
        checkoutCart,
        fetchUserOrders,
        renderOrders
    };

    App.onReady(initCheckout);
    App.onLanguageChange(renderOrders);

    async function initCheckout() {
        window.addEventListener("motocrazy:auth-changed", function () {
            fetchUserOrders();
        });

        if (App.state.user) {
            await fetchUserOrders();
        } else {
            renderOrders();
        }
    }

    async function checkoutCart() {
        const client = App.requireClient();
        if (!client) return;

        if (!App.state.user) {
            App.showToast(App.t("checkoutLoginRequired"));
            if (App.auth) App.auth.openModal("login");
            return;
        }

        if (!App.state.cartItems.length) {
            App.showToast(App.t("checkoutEmpty"));
            return;
        }

        const total = App.cart ? App.cart.total() : cartTotalFallback();
        const user = App.state.user;

        try {
            const orderResult = await client
                .from("pedidos")
                .insert({
                    user_id: user.id,
                    email: user.email || "",
                    total,
                    estado: "creado"
                })
                .select("id_pedido,user_id,email,total,estado,created_at")
                .single();

            if (orderResult.error) throw orderResult.error;

            const order = orderResult.data;
            const details = App.state.cartItems.map(function (item) {
                const quantity = Number(item.cantidad || 0);
                const price = Number(item.precio || 0);
                return {
                    id_pedido: order.id_pedido,
                    producto_id: String(item.producto_id),
                    tipo: item.tipo,
                    nombre: item.nombre,
                    precio: price,
                    cantidad: quantity,
                    subtotal: Number(item.subtotal || price * quantity)
                };
            });

            const detailResult = await client
                .from("detalle_pedidos")
                .insert(details);

            if (detailResult.error) throw detailResult.error;

            if (App.cart && App.cart.clear) {
                await App.cart.clear({ silent: true });
                App.cart.toggle(false);
            }

            await fetchUserOrders();
            App.showToast(App.t("orderCreated"));
        } catch (error) {
            console.error("Error creando pedido:", error);
            App.showToast(App.t("orderError"));
        }
    }

    async function fetchUserOrders() {
        const history = document.getElementById("orderHistory");
        if (!history) return;

        const client = App.requireClient();
        if (!client) {
            App.state.orders = [];
            renderOrders();
            return;
        }

        if (!App.state.user) {
            App.state.orders = [];
            renderOrders();
            return;
        }

        try {
            const result = await client
                .from("pedidos")
                .select("id_pedido,user_id,email,total,estado,created_at,detalle_pedidos(id_detalle,producto_id,tipo,nombre,precio,cantidad,subtotal)")
                .eq("user_id", App.state.user.id)
                .order("created_at", { ascending: false });

            if (result.error) throw result.error;
            App.state.orders = Array.isArray(result.data) ? result.data : [];
        } catch (error) {
            console.error("Error cargando pedidos:", error);
            App.state.orders = [];
        }

        renderOrders();
    }

    function renderOrders() {
        const node = document.getElementById("orderHistory");
        if (!node) return;

        if (!App.state.user) {
            node.innerHTML = `<p class="empty-state">${App.escapeHTML(App.t("orderHistoryLogin"))}</p>`;
            return;
        }

        if (!App.state.orders.length) {
            node.innerHTML = `<p class="empty-state">${App.escapeHTML(App.t("orderHistoryEmpty"))}</p>`;
            return;
        }

        node.innerHTML = App.state.orders.map(function (order) {
            const items = Array.isArray(order.detalle_pedidos) ? order.detalle_pedidos : [];
            return `
                <article class="order-card">
                    <h3>#${App.escapeHTML(order.id_pedido)}</h3>
                    <p>${App.escapeHTML(new Date(order.created_at).toLocaleString(App.state.lang === "en" ? "en-US" : "es-CO"))}</p>
                    <strong>${App.escapeHTML(App.formatMoney(order.total))}</strong>
                    <p>${App.escapeHTML(order.estado || "")}</p>
                    <ul>
                        ${items.map(function (item) {
                            return `<li>${App.escapeHTML(item.nombre)} x ${Number(item.cantidad || 0)}</li>`;
                        }).join("")}
                    </ul>
                </article>
            `;
        }).join("");
    }

    function cartTotalFallback() {
        return App.state.cartItems.reduce(function (sum, item) {
            return sum + Number(item.subtotal || 0);
        }, 0);
    }
})();
