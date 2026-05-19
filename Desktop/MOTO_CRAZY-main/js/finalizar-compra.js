(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;
    let compraProcesando = false;

    Aplicacion.finalizarCompra = {
        finalizarCompraCart,
        fetchUserOrders,
        renderOrders
    };

    Aplicacion.onReady(initCheckout);
    Aplicacion.onLanguageChange(renderOrders);
    Aplicacion.onLanguageChange(updateCheckoutModalTexts);

    async function initCheckout() {
        createCheckoutModal();
        bindCheckoutModal();

        window.addEventListener("motocrazy:auth-changed", function () {
            fetchUserOrders();
        });

        if (Aplicacion.estado.user) {
            await fetchUserOrders();
        } else {
            renderOrders();
        }
    }

    async function finalizarCompraCart() {
        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        if (!Aplicacion.estado.user) {
            Aplicacion.showToast(Aplicacion.t("finalizarCompraLoginRequired"));
            if (Aplicacion.auth) Aplicacion.auth.openModal("login");
            return;
        }

        if (!Aplicacion.estado.itemsCarrito.length) {
            Aplicacion.showToast(Aplicacion.t("finalizarCompraEmpty"));
            return;
        }

        openCheckoutModal();
    }

    function createCheckoutModal() {
        if (document.getElementById("modalCompraSimulada")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <section id="modalCompraSimulada" class="modal-autenticacion modal-compra" aria-hidden="true">
                <section class="modal-autenticacion__fondo" data-accion="cerrar-compra-simulada"></section>
                <section class="modal-autenticacion__panel modal-compra__panel" role="dialog" aria-modal="true" aria-labelledby="tituloCompraSimulada">
                    <button class="boton-icono modal-autenticacion__cerrar" type="button" data-accion="cerrar-compra-simulada" aria-label="${Aplicacion.escapeAttribute(Aplicacion.t("closeCart"))}">X</button>
                    <p class="ceja" data-i18n="pagoSimuladoCeja">${Aplicacion.escapeHTML(Aplicacion.t("pagoSimuladoCeja"))}</p>
                    <h2 id="tituloCompraSimulada" data-i18n="pagoSimuladoTitulo">${Aplicacion.escapeHTML(Aplicacion.t("pagoSimuladoTitulo"))}</h2>
                    <p class="modal-autenticacion__pista" data-i18n="pagoSimuladoIntro">${Aplicacion.escapeHTML(Aplicacion.t("pagoSimuladoIntro"))}</p>
                    <section id="resumenCompraSimulada" class="resumen-compra"></section>
                    <form id="formularioCompraSimulada" class="formulario-autenticacion formulario-compra">
                        <label>
                            <span data-i18n="metodoPagoTexto">${Aplicacion.escapeHTML(Aplicacion.t("metodoPagoTexto"))}</span>
                            <select name="metodo" required>
                                <option value="tarjeta" data-i18n="metodoTarjeta">${Aplicacion.escapeHTML(Aplicacion.t("metodoTarjeta"))}</option>
                                <option value="pse" data-i18n="metodoPse">${Aplicacion.escapeHTML(Aplicacion.t("metodoPse"))}</option>
                                <option value="contraentrega" data-i18n="metodoContraentrega">${Aplicacion.escapeHTML(Aplicacion.t("metodoContraentrega"))}</option>
                            </select>
                        </label>
                        <label>
                            <span data-i18n="nombrePagoTexto">${Aplicacion.escapeHTML(Aplicacion.t("nombrePagoTexto"))}</span>
                            <input name="nombre" type="text" autocomplete="name" required placeholder="MotoCrazy MC">
                        </label>
                        <label>
                            <span data-i18n="referenciaPagoTexto">${Aplicacion.escapeHTML(Aplicacion.t("referenciaPagoTexto"))}</span>
                            <input name="referencia" type="text" inputmode="numeric" minlength="4" maxlength="12" required placeholder="1234">
                        </label>
                        <button class="boton-finalizar" type="submit" data-i18n="confirmarCompra">${Aplicacion.escapeHTML(Aplicacion.t("confirmarCompra"))}</button>
                    </form>
                </section>
            </section>
        `);
    }

    function updateCheckoutModalTexts() {
        const modal = document.getElementById("modalCompraSimulada");
        if (!modal) return;

        modal.querySelectorAll("[data-i18n]").forEach(function (node) {
            node.textContent = Aplicacion.t(node.dataset.i18n);
        });
        const close = modal.querySelector("[data-accion='cerrar-compra-simulada'].modal-autenticacion__cerrar");
        if (close) close.setAttribute("aria-label", Aplicacion.t("closeCart"));
        renderCheckoutSummary();
    }

    function bindCheckoutModal() {
        document.addEventListener("click", function (event) {
            const actionElement = event.target.closest("[data-accion='cerrar-compra-simulada']");
            if (actionElement) closeCheckoutModal();
        });

        document.addEventListener("submit", async function (event) {
            if (!event.target || event.target.id !== "formularioCompraSimulada") return;
            event.preventDefault();
            await confirmarCompraSimulada(event.target);
        });
    }

    function openCheckoutModal() {
        renderCheckoutSummary();
        const modal = document.getElementById("modalCompraSimulada");
        if (!modal) return;
        modal.classList.add("esta-abierto");
        modal.setAttribute("aria-hidden", "false");
        if (Aplicacion.cart && Aplicacion.cart.toggle) Aplicacion.cart.toggle(false);
    }

    function closeCheckoutModal(force) {
        const modal = document.getElementById("modalCompraSimulada");
        if (!modal || (compraProcesando && !force)) return;
        modal.classList.remove("esta-abierto");
        modal.setAttribute("aria-hidden", "true");
    }

    function renderCheckoutSummary() {
        const node = document.getElementById("resumenCompraSimulada");
        if (!node) return;

        const items = Aplicacion.estado.itemsCarrito;
        const total = Aplicacion.cart ? Aplicacion.cart.total() : totalCarritoFallback();

        node.innerHTML = `
            <h3>${Aplicacion.escapeHTML(Aplicacion.t("resumenPedido"))}</h3>
            <ul>
                ${items.map(function (item) {
                    return `
                        <li>
                            <span>${Aplicacion.escapeHTML(item.nombre)} x ${Number(item.cantidad || 0)}</span>
                            <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(item.subtotal))}</strong>
                        </li>
                    `;
                }).join("")}
            </ul>
            <section class="resumen-compra__total">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("totalCarrito"))}</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(total))}</strong>
            </section>
        `;
    }

    async function confirmarCompraSimulada(form) {
        if (compraProcesando) return;

        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        if (!Aplicacion.estado.user) {
            closeCheckoutModal();
            Aplicacion.showToast(Aplicacion.t("finalizarCompraLoginRequired"));
            if (Aplicacion.auth) Aplicacion.auth.openModal("login");
            return;
        }

        if (!Aplicacion.estado.itemsCarrito.length) {
            closeCheckoutModal();
            Aplicacion.showToast(Aplicacion.t("finalizarCompraEmpty"));
            return;
        }

        compraProcesando = true;
        const submit = form.querySelector("button[type='submit']");
        if (submit) {
            submit.disabled = true;
            submit.textContent = Aplicacion.t("procesandoCompra");
        }

        const total = Aplicacion.cart ? Aplicacion.cart.total() : totalCarritoFallback();
        const user = Aplicacion.estado.user;

        try {
            const orderResult = await cliente
                .from("pedidos")
                .insert({
                    user_id: user.id,
                    email: user.email || "",
                    total,
                    estado: "pago_simulado"
                })
                .select("id_pedido,user_id,email,total,estado,created_at")
                .single();

            if (orderResult.error) throw orderResult.error;

            const order = orderResult.data;
            const details = Aplicacion.estado.itemsCarrito.map(function (item) {
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

            const detailResult = await cliente
                .from("detalle_pedidos")
                .insert(details);

            if (detailResult.error) throw detailResult.error;

            if (Aplicacion.cart && Aplicacion.cart.clear) {
                await Aplicacion.cart.clear({ silent: true });
                Aplicacion.cart.toggle(false);
            }

            await fetchUserOrders();
            closeCheckoutModal(true);
            form.reset();
            Aplicacion.showToast(Aplicacion.t("pedidoCreado"));
        } catch (error) {
            console.error("Error creando pedido:", error);
            Aplicacion.showToast(Aplicacion.t("errorPedido"));
        } finally {
            compraProcesando = false;
            if (submit) {
                submit.disabled = false;
                submit.textContent = Aplicacion.t("confirmarCompra");
            }
        }
    }

    async function fetchUserOrders() {
        const history = document.getElementById("historialPedidos");
        if (!history) return;

        const cliente = Aplicacion.requireClient();
        if (!cliente) {
            Aplicacion.estado.orders = [];
            renderOrders();
            return;
        }

        if (!Aplicacion.estado.user) {
            Aplicacion.estado.orders = [];
            renderOrders();
            return;
        }

        try {
            const result = await cliente
                .from("pedidos")
                .select("id_pedido,user_id,email,total,estado,created_at,detalle_pedidos(id_detalle,producto_id,tipo,nombre,precio,cantidad,subtotal)")
                .eq("user_id", Aplicacion.estado.user.id)
                .order("created_at", { ascending: false });

            if (result.error) throw result.error;
            Aplicacion.estado.orders = Array.isArray(result.data) ? result.data : [];
        } catch (error) {
            console.error("Error cargando pedidos:", error);
            Aplicacion.estado.orders = [];
        }

        renderOrders();
    }

    function renderOrders() {
        const node = document.getElementById("historialPedidos");
        if (!node) return;

        if (!Aplicacion.estado.user) {
            node.innerHTML = `<p class="estado-vacio">${Aplicacion.escapeHTML(Aplicacion.t("historialPedidosLogin"))}</p>`;
            return;
        }

        if (!Aplicacion.estado.orders.length) {
            node.innerHTML = `<p class="estado-vacio">${Aplicacion.escapeHTML(Aplicacion.t("historialPedidosEmpty"))}</p>`;
            return;
        }

        node.innerHTML = Aplicacion.estado.orders.map(function (order) {
            const items = Array.isArray(order.detalle_pedidos) ? order.detalle_pedidos : [];
            return `
                <article class="tarjeta-pedido">
                    <h3>#${Aplicacion.escapeHTML(order.id_pedido)}</h3>
                    <p>${Aplicacion.escapeHTML(new Date(order.created_at).toLocaleString(Aplicacion.estado.lang === "en" ? "en-US" : "es-CO"))}</p>
                    <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(order.total))}</strong>
                    <p>${Aplicacion.escapeHTML(orderStatusText(order.estado))}</p>
                    <ul>
                        ${items.map(function (item) {
                            return `<li>${Aplicacion.escapeHTML(item.nombre)} x ${Number(item.cantidad || 0)}</li>`;
                        }).join("")}
                    </ul>
                </article>
            `;
        }).join("");
    }

    function totalCarritoFallback() {
        return Aplicacion.estado.itemsCarrito.reduce(function (sum, item) {
            return sum + Number(item.subtotal || 0);
        }, 0);
    }

    function orderStatusText(status) {
        if (status === "pago_simulado" || status === "simulado") return Aplicacion.t("estadoPagoSimulado");
        return status || "";
    }
})();
