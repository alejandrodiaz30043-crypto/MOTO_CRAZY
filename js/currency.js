(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;
    const URL_API_CAMBIO = "https://v6.exchangerate-api.com/v6/5e50e0e43cf12876da3baea1/latest/COP";

    let cacheTasa = null;
    let consultadoUnaVez = false;

    Aplicacion.moneda = {
        obtenerTasaCambio,
        convertirCOPaUSD,
        formatearMoneda,
        actualizarPreciosVisibles,
        obtenerMonedaActual,
        establecerMoneda
    };

    Aplicacion.onReady(iniciarMoneda);

    async function iniciarMoneda() {
        const guardada = localStorage.getItem("currency");
        if (guardada === "USD" || guardada === "COP") {
            Aplicacion.estado.currency = guardada;
        }

        renderizarSelectoresMoneda();
        vincularSelectorMoneda();

        await obtenerTasaCambio();

        if (Aplicacion.estado.currency === "USD" && !Aplicacion.estado.usdRate) {
            Aplicacion.estado.currency = "COP";
            localStorage.setItem("currency", "COP");
            actualizarBotonesMoneda();
        }

        actualizarPreciosVisibles();
    }

    async function obtenerTasaCambio() {
        if (Aplicacion.estado.usdRate) {
            cacheTasa = Aplicacion.estado.usdRate;
            consultadoUnaVez = true;
            return cacheTasa;
        }

        if (consultadoUnaVez) return cacheTasa;
        consultadoUnaVez = true;

        try {
            const respuesta = await fetch(URL_API_CAMBIO);
            if (!respuesta.ok) throw new Error("error-http-api-cambio");
            const datos = await respuesta.json();
            if (datos.result !== "success") throw new Error("error-resultado-api-cambio");

            const tasa = Number(datos.conversion_rates && datos.conversion_rates.USD) || 0;
            if (!tasa) throw new Error("error-tasa-cero");

            cacheTasa = tasa;
            Aplicacion.estado.usdRate = cacheTasa;
            return cacheTasa;
        } catch (error) {
            console.warn("No se pudo actualizar la tasa de cambio. Mostrando precios en COP.", error);
            cacheTasa = null;
            Aplicacion.estado.usdRate = null;
            mostrarErrorTasa();
            return null;
        }
    }

    function convertirCOPaUSD(montoCOP) {
        const tasa = Aplicacion.estado.usdRate;
        if (!tasa) return null;
        return Number(montoCOP) * tasa;
    }

    function formatearMoneda(montoCOP) {
        return Aplicacion.formatMoney(montoCOP);
    }

    function obtenerMonedaActual() {
        return Aplicacion.estado.currency || "COP";
    }

    function establecerMoneda(moneda) {
        if (moneda !== "COP" && moneda !== "USD") return;

        if (moneda === "USD" && !Aplicacion.estado.usdRate) {
            const mensaje = Aplicacion.estado.lang === "en"
                ? "Exchange rate not available. Keeping COP prices."
                : "No se pudo actualizar la tasa de cambio. Mostrando precios en COP.";
            if (Aplicacion.showToast) Aplicacion.showToast(mensaje);
            return;
        }

        Aplicacion.estado.currency = moneda;
        localStorage.setItem("currency", moneda);
        actualizarBotonesMoneda();
        actualizarPreciosVisibles();
    }

    function actualizarPreciosVisibles() {
        if (Aplicacion.cart && Aplicacion.cart.render) {
            Aplicacion.cart.render();
        }

        if (Aplicacion.renderFeaturedProducts) {
            Aplicacion.renderFeaturedProducts();
        }

        if (Aplicacion.estado.page === "motos" && Aplicacion.motos && Aplicacion.motos.render) {
            Aplicacion.motos.render();
        }

        if (Aplicacion.estado.page === "accesorios" && Aplicacion.accesorios && Aplicacion.accesorios.render) {
            Aplicacion.accesorios.render();
        }

        if (Aplicacion.finalizarCompra && Aplicacion.finalizarCompra.renderOrders) {
            Aplicacion.finalizarCompra.renderOrders();
        }
    }

    function renderizarSelectoresMoneda() {
        document.querySelectorAll(".acciones-encabezado").forEach(function (acciones) {
            if (acciones.querySelector(".selector-moneda")) return;

            const selector = document.createElement("section");
            selector.className = "selector-moneda";
            selector.setAttribute("role", "group");
            selector.setAttribute("aria-label", "Selector de moneda");
            selector.innerHTML = construirHTMLSelector();

            const botonCarrito = acciones.querySelector("[data-accion='alternar-carrito']");
            if (botonCarrito) {
                acciones.insertBefore(selector, botonCarrito);
            } else {
                acciones.appendChild(selector);
            }
        });
    }

    function construirHTMLSelector() {
        const actual = obtenerMonedaActual();
        return [
            construirHTMLBoton("COP", actual),
            construirHTMLBoton("USD", actual)
        ].join("");
    }

    function construirHTMLBoton(moneda, actual) {
        const estaActivo = moneda === actual;
        return `<button type="button" class="boton-moneda${estaActivo ? " boton-moneda--activo" : ""}" data-moneda="${moneda}" aria-pressed="${estaActivo}">${moneda}</button>`;
    }

    function actualizarBotonesMoneda() {
        const actual = obtenerMonedaActual();
        document.querySelectorAll("[data-moneda]").forEach(function (boton) {
            const estaActivo = boton.dataset.moneda === actual;
            boton.classList.toggle("boton-moneda--activo", estaActivo);
            boton.setAttribute("aria-pressed", String(estaActivo));
        });
    }

    function vincularSelectorMoneda() {
        document.addEventListener("click", function (evento) {
            const boton = evento.target.closest("[data-moneda]");
            if (!boton) return;
            establecerMoneda(boton.dataset.moneda);
        });
    }

    function mostrarErrorTasa() {
        if (Aplicacion.estado.currency === "USD") {
            Aplicacion.estado.currency = "COP";
            localStorage.setItem("currency", "COP");
            actualizarBotonesMoneda();
        }
        if (Aplicacion.showToast) {
            const mensaje = Aplicacion.estado.lang === "en"
                ? "Exchange rate unavailable. Showing prices in COP."
                : "No se pudo actualizar la tasa de cambio. Mostrando precios en COP.";
            Aplicacion.showToast(mensaje);
        }
    }
})();
