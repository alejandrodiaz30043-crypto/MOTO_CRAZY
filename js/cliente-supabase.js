(function () {
    "use strict";

    const CONFIGURACION = {
        url: "https://pttwrjcacgxgqezbgpqi.supabase.co",
        anonKey: "sb_publishable_mDam12TItAwnK4yOpoakJg_U2Gao65g",
        fallbackImage: "CSS/img_1.jpg"
    };

    const traducciones = {
        es: {
            navInicio: "Inicio",
            navMotos: "Motos",
            navAccesorios: "Accesorios",
            navAdministracion: "Admin",
            temaAClaro: "Claro",
            temaAOscuro: "Oscuro",
            textoBotonCarrito: "Carrito",
            lineaPortadaUno: "VIVE LA PASION",
            lineaPortadaDos: "SOBRE DOS",
            lineaPortadaTres: "RUEDAS",
            textoPortadaInicio: "Rendimiento, estilo y seguridad en cada curva.",
            verMotos: "VER MOTOS",
            verAccesorios: "VER ACCESORIOS",
            metricaCatalogo: "Referencias en catalogo",
            metricaIdiomas: "Idiomas disponibles",
            metricaCarrito: "Carrito guardado",
            cejaDestacados: "Seleccion destacada",
            tituloDestacados: "Productos listos para agregar",
            cejaClima: "API gratuita",
            tituloClima: "Clima para rodar en Bogota",
            climaCargando: "Consultando clima actual...",
            climaNoDisponible: "No fue posible consultar el clima ahora.",
            climaSeco: "Ruta seca",
            climaLluvia: "Lluvia reciente",
            climaTemperatura: "Temperatura",
            climaLluviaDato: "Lluvia",
            climaViento: "Viento",
            cejaBaseDatos: "Base de datos",
            tituloBaseDatos: "Catalogo sincronizable",
            baseDatosRevisando: "Revisando conexion con Supabase...",
            supabaseConDatos: "Supabase activo: catalogos y ecommerce conectados.",
            supabaseSinDatos: "Supabase respondio, pero no hay productos para mostrar.",
            supabaseError: "No se pudo consultar Supabase. Revisa URL, key, RLS o tablas.",
            supabaseClienteFaltante: "No se cargo Supabase JS v2.",
            cejaMotos: "Catalogo",
            tituloMotos: "Motos para cada estilo",
            introMotos: "Filtra por categoria, compara precios y agrega tus favoritas al carrito.",
            cejaAccesorios: "Equipamiento",
            tituloAccesorios: "Accesorios para piloto y moto",
            introAccesorios: "Completa tu ruta con proteccion, comodidad y repuestos esenciales.",
            etiquetaBusqueda: "Buscar",
            busquedaMotos: "Buscar moto...",
            busquedaAccesorios: "Buscar accesorio...",
            all: "Todo",
            agregarAlCarrito: "Agregar",
            stock: "Stock",
            sinResultados: "No hay productos que coincidan con la busqueda.",
            catalogoCargando: "Cargando datos desde Supabase...",
            catalogoSupabaseMotos: "Motos consultadas desde Supabase.",
            catalogoSupabaseAccesorios: "Accesorios consultados desde Supabase.",
            catalogoSupabaseVacio: "Supabase esta conectado, pero aun no hay productos.",
            catalogoSupabaseError: "No se pudo leer Supabase. No se usaran datos locales.",
            precioNoDisponible: "Consultar",
            precioDesde: "Desde",
            botonDetalle: "Detalle",
            botonComparar: "Comparar",
            comparacionAgregada: "Moto agregada al comparador.",
            comparacionQuitada: "Moto quitada del comparador.",
            botonCotizarCuotas: "Cotizar cuotas",
            tituloCuotas: "Cotiza tu moto por cuotas",
            introCuotas: "Calcula una cuota aproximada con IVA incluido e interes fijo anual del 10,1%.",
            motoCuotasTexto: "Moto",
            cuotaInicialTexto: "Cuota inicial",
            plazoCuotasTexto: "Plazo",
            interesMensualTexto: "Interes fijo anual",
            precioBaseTexto: "Precio base",
            ivaTexto: "IVA",
            precioConIvaTexto: "Precio con IVA",
            cuotaMensualTexto: "Cuota mensual estimada",
            valorFinanciadoTexto: "Valor financiado",
            costoTotalTexto: "Total estimado",
            cuotasSinMotos: "Carga el catalogo para cotizar una moto.",
            mesesCuotas: "meses",
            avisoCuotas: "Cotizacion informativa con IVA del 19% e interes fijo anual del 10,1%. La aprobacion final depende de la entidad financiera.",
            tituloComparador: "Comparador de motos",
            comparadorVacio: "Selecciona hasta 3 motos para comparar.",
            limpiarComparador: "Limpiar comparador",
            filtroMarcaTexto: "Marca",
            filtroCilindradaTexto: "Cilindrada",
            todasLasMarcas: "Todas las marcas",
            todasLasCilindradas: "Todas las cilindradas",
            unidadCc: "cc",
            etiquetaMotor: "Motor",
            etiquetaPotencia: "Potencia",
            etiquetaCategoria: "Categoria",
            etiquetaMarca: "Marca",
            descripcionNoDisponible: "Sin descripcion disponible.",
            etiquetaVariantes: "Variantes",
            etiquetaVariante: "Variante",
            tituloAdministracion: "Panel administrativo",
            introAdministracion: "Gestiona motos y accesorios conectados a Supabase.",
            pistaAdministracion: "Inicia sesion para crear, editar o eliminar registros.",
            formularioAdminMotos: "CRUD motos",
            formularioAdminAccesorios: "CRUD accesorios",
            adminNombre: "Nombre",
            adminIdMarca: "ID marca",
            adminIdCategoria: "ID categoria",
            adminImagen: "URL imagen",
            adminPrecio: "Precio",
            adminInventario: "Stock",
            adminDescripcion: "Descripcion",
            adminGuardar: "Guardar",
            eliminarAdmin: "Eliminar",
            adminGuardado: "Registro guardado.",
            adminEliminado: "Registro eliminado.",
            adminErrorTexto: "No fue posible completar el CRUD. Revisa sesion, RLS y columnas.",
            adminAccesoDenegado: "Solo los administradores pueden entrar al panel.",
            tituloMenuAutenticacion: "Escoja una opcion para entrar",
            sesionActiva: "Sesion activa",
            botonRegistro: "REGISTRARME COMO USUARIO",
            botonIniciarSesion: "INICIAR SESION",
            botonCerrarSesion: "CERRAR SESION",
            botonRecuperar: "Recuperar contrasena",
            botonGoogle: "ENTRAR CON GOOGLE",
            botonFacebook: "ENTRAR CON FACEBOOK",
            botonApple: "ENTRAR CON APPLE",
            tituloRegistro: "Crear cuenta",
            pistaRegistro: "Registra tu usuario con Supabase Auth.",
            enviarRegistro: "REGISTRARME",
            tituloInicioSesion: "Iniciar sesion",
            pistaInicioSesion: "Entra con el correo y la contrasena que registraste.",
            enviarInicioSesion: "INICIAR SESION",
            tituloRecuperacion: "Recuperar contrasena",
            pistaRecuperacion: "Te enviaremos un enlace de recuperacion al correo.",
            enviarRecuperacion: "ENVIAR ENLACE",
            correoAutenticacionLabel: "Correo electronico",
            contrasenaAutenticacionLabel: "Contrasena",
            etiquetaCerrarAutenticacion: "Cerrar",
            usuarioConectado: "Usuario conectado",
            autenticacionProcesando: "PROCESANDO...",
            contrasenaAutenticacionTooShort: "La contrasena debe tener al menos 6 caracteres.",
            registroExitoso: "Registro completado.",
            registroConfirmacion: "Registro creado. Revisa tu correo si Supabase pide confirmacion.",
            inicioSesionExitoso: "Sesion iniciada.",
            recuperacionEnviada: "Enlace de recuperacion enviado si el correo existe.",
            errorAutenticacion: "No fue posible completar la autenticacion.",
            configAutenticacionFaltante: "No se pudo inicializar Supabase.",
            cierreSesionExitoso: "Sesion cerrada.",
            autenticacionRequerida: "Inicia sesion para usar esta funcion.",
            tituloCarrito: "Carrito",
            closeCart: "Cerrar",
            eliminar: "Eliminar",
            clearCart: "Vaciar carrito",
            finalizarCompra: "Finalizar compra",
            carritoVacio: "Tu carrito esta vacio.",
            carritoSesionRequerida: "Inicia sesion para cargar tu carrito de Supabase.",
            totalCarrito: "Total",
            itemAgregado: "Producto agregado al carrito.",
            itemEliminado: "Producto eliminado.",
            carritoVaciado: "Carrito vaciado.",
            errorCargaCarrito: "No se pudo cargar el carrito.",
            errorEscrituraCarrito: "No se pudo actualizar el carrito.",
            finalizarCompraEmpty: "Tu carrito esta vacio.",
            finalizarCompraLoginRequired: "Inicia sesion para finalizar la compra.",
            historialPedidosTitle: "Historial de pedidos",
            historialPedidosEmpty: "Aun no hay pedidos.",
            historialPedidosLogin: "Inicia sesion para ver tu historial.",
            resumenPedido: "Resumen de compra",
            pagoSimuladoCeja: "Pago simulado",
            pagoSimuladoTitulo: "Confirmar compra",
            pagoSimuladoIntro: "Revisa los productos del carrito y completa los datos para simular el pago.",
            metodoPagoTexto: "Metodo de pago",
            metodoTarjeta: "Tarjeta simulada",
            metodoPse: "PSE simulado",
            metodoContraentrega: "Contraentrega",
            nombrePagoTexto: "Nombre del comprador",
            referenciaPagoTexto: "Referencia de pago",
            confirmarCompra: "Confirmar compra",
            procesandoCompra: "Procesando...",
            estadoPagoSimulado: "Pago simulado",
            pedidoCreado: "Compra simulada creada en Supabase.",
            errorPedido: "No se pudo crear el pedido.",
            etiquetaCambio: "Valor aproximado en USD",
            textoPie: "MotoCrazy MC - Proyecto web con HTML, CSS, JavaScript, Supabase y API gratuita."
        },
        en: {
            navInicio: "Home",
            navMotos: "Motorcycles",
            navAccesorios: "Accessories",
            navAdministracion: "Admin",
            temaAClaro: "Light",
            temaAOscuro: "Dark",
            textoBotonCarrito: "Cart",
            lineaPortadaUno: "LIVE THE PASSION",
            lineaPortadaDos: "ON TWO",
            lineaPortadaTres: "WHEELS",
            textoPortadaInicio: "Performance, style and safety in every curve.",
            verMotos: "SEE BIKES",
            verAccesorios: "SEE GEAR",
            metricaCatalogo: "Catalog items",
            metricaIdiomas: "Available languages",
            metricaCarrito: "Saved cart",
            cejaDestacados: "Featured selection",
            tituloDestacados: "Ready to add",
            cejaClima: "Free API",
            tituloClima: "Riding weather in Bogota",
            climaCargando: "Checking current weather...",
            climaNoDisponible: "Weather data is unavailable right now.",
            climaSeco: "Dry route",
            climaLluvia: "Recent rain",
            climaTemperatura: "Temperature",
            climaLluviaDato: "Rain",
            climaViento: "Wind",
            cejaBaseDatos: "Database",
            tituloBaseDatos: "Synchronized catalog",
            baseDatosRevisando: "Checking Supabase connection...",
            supabaseConDatos: "Supabase active: catalogs and ecommerce connected.",
            supabaseSinDatos: "Supabase responded, but there are no products yet.",
            supabaseError: "Supabase could not be queried. Check URL, key, RLS or tables.",
            supabaseClienteFaltante: "Supabase JS v2 was not loaded.",
            cejaMotos: "Catalog",
            tituloMotos: "Motorcycles for every style",
            introMotos: "Filter by category, compare prices and add favorites to the cart.",
            cejaAccesorios: "Gear",
            tituloAccesorios: "Accessories for rider and bike",
            introAccesorios: "Complete your ride with protection, comfort and essential parts.",
            etiquetaBusqueda: "Search",
            busquedaMotos: "Search bike...",
            busquedaAccesorios: "Search accessory...",
            all: "All",
            agregarAlCarrito: "Add",
            stock: "Stock",
            sinResultados: "No products match your search.",
            catalogoCargando: "Loading data from Supabase...",
            catalogoSupabaseMotos: "Motorcycles loaded from Supabase.",
            catalogoSupabaseAccesorios: "Accessories loaded from Supabase.",
            catalogoSupabaseVacio: "Supabase is connected, but there are no products yet.",
            catalogoSupabaseError: "Supabase could not be read. No local data will be used.",
            precioNoDisponible: "Ask price",
            precioDesde: "From",
            botonDetalle: "Details",
            botonComparar: "Compare",
            comparacionAgregada: "Motorcycle added to comparison.",
            comparacionQuitada: "Motorcycle removed from comparison.",
            botonCotizarCuotas: "Quote payments",
            tituloCuotas: "Quote your motorcycle in installments",
            introCuotas: "Estimate a monthly payment with VAT included and a fixed 10.1% annual interest.",
            motoCuotasTexto: "Motorcycle",
            cuotaInicialTexto: "Down payment",
            plazoCuotasTexto: "Term",
            interesMensualTexto: "Fixed annual interest",
            precioBaseTexto: "Base price",
            ivaTexto: "VAT",
            precioConIvaTexto: "Price with VAT",
            cuotaMensualTexto: "Estimated monthly payment",
            valorFinanciadoTexto: "Financed amount",
            costoTotalTexto: "Estimated total",
            cuotasSinMotos: "Load the catalog to quote a motorcycle.",
            mesesCuotas: "months",
            avisoCuotas: "Informational quote with 19% VAT and fixed 10.1% annual interest. Final approval depends on the financing provider.",
            tituloComparador: "Motorcycle comparison",
            comparadorVacio: "Select up to 3 motorcycles to compare.",
            limpiarComparador: "Clear comparison",
            filtroMarcaTexto: "Brand",
            filtroCilindradaTexto: "Displacement",
            todasLasMarcas: "All brands",
            todasLasCilindradas: "All displacements",
            unidadCc: "cc",
            etiquetaMotor: "Engine",
            etiquetaPotencia: "Power",
            etiquetaCategoria: "Category",
            etiquetaMarca: "Brand",
            descripcionNoDisponible: "No description available.",
            etiquetaVariantes: "Variants",
            etiquetaVariante: "Variant",
            tituloAdministracion: "Admin panel",
            introAdministracion: "Manage motorcycles and accessories connected to Supabase.",
            pistaAdministracion: "Sign in to create, edit or delete records.",
            formularioAdminMotos: "Motorcycle CRUD",
            formularioAdminAccesorios: "Accessory CRUD",
            adminNombre: "Name",
            adminIdMarca: "Brand ID",
            adminIdCategoria: "Category ID",
            adminImagen: "Image URL",
            adminPrecio: "Price",
            adminInventario: "Stock",
            adminDescripcion: "Description",
            adminGuardar: "Save",
            eliminarAdmin: "Delete",
            adminGuardado: "Record saved.",
            adminEliminado: "Record deleted.",
            adminErrorTexto: "CRUD could not be completed. Check session, RLS and columns.",
            adminAccesoDenegado: "Only administrators can enter the panel.",
            tituloMenuAutenticacion: "Choose an option to continue",
            sesionActiva: "Active session",
            botonRegistro: "CREATE ACCOUNT",
            botonIniciarSesion: "SIGN IN",
            botonCerrarSesion: "SIGN OUT",
            botonRecuperar: "Recover password",
            botonGoogle: "SIGN IN WITH GOOGLE",
            botonFacebook: "SIGN IN WITH FACEBOOK",
            botonApple: "SIGN IN WITH APPLE",
            tituloRegistro: "Create account",
            pistaRegistro: "Create your user with Supabase Auth.",
            enviarRegistro: "CREATE ACCOUNT",
            tituloInicioSesion: "Sign in",
            pistaInicioSesion: "Use the email and password you registered.",
            enviarInicioSesion: "SIGN IN",
            tituloRecuperacion: "Recover password",
            pistaRecuperacion: "We will send a recovery link to your email.",
            enviarRecuperacion: "SEND LINK",
            correoAutenticacionLabel: "Email address",
            contrasenaAutenticacionLabel: "Password",
            etiquetaCerrarAutenticacion: "Close",
            usuarioConectado: "Connected user",
            autenticacionProcesando: "PROCESSING...",
            contrasenaAutenticacionTooShort: "Password must be at least 6 characters.",
            registroExitoso: "Registration complete.",
            registroConfirmacion: "Account created. Check your email if Supabase requires confirmation.",
            inicioSesionExitoso: "Signed in.",
            recuperacionEnviada: "Recovery link sent if the email exists.",
            errorAutenticacion: "Authentication could not be completed.",
            configAutenticacionFaltante: "Supabase could not be initialized.",
            cierreSesionExitoso: "Signed out.",
            autenticacionRequerida: "Sign in to use this feature.",
            tituloCarrito: "Cart",
            closeCart: "Close",
            eliminar: "Remove",
            clearCart: "Clear cart",
            finalizarCompra: "Checkout",
            carritoVacio: "Your cart is empty.",
            carritoSesionRequerida: "Sign in to load your Supabase cart.",
            totalCarrito: "Total",
            itemAgregado: "Product added to cart.",
            itemEliminado: "Product removed.",
            carritoVaciado: "Cart cleared.",
            errorCargaCarrito: "Cart could not be loaded.",
            errorEscrituraCarrito: "Cart could not be updated.",
            finalizarCompraEmpty: "Your cart is empty.",
            finalizarCompraLoginRequired: "Sign in to finish checkout.",
            historialPedidosTitle: "Order history",
            historialPedidosEmpty: "No orders yet.",
            historialPedidosLogin: "Sign in to view your order history.",
            resumenPedido: "Purchase summary",
            pagoSimuladoCeja: "Simulated payment",
            pagoSimuladoTitulo: "Confirm purchase",
            pagoSimuladoIntro: "Review the cart items and complete the fields to simulate payment.",
            metodoPagoTexto: "Payment method",
            metodoTarjeta: "Simulated card",
            metodoPse: "Simulated PSE",
            metodoContraentrega: "Cash on delivery",
            nombrePagoTexto: "Buyer name",
            referenciaPagoTexto: "Payment reference",
            confirmarCompra: "Confirm purchase",
            procesandoCompra: "Processing...",
            estadoPagoSimulado: "Simulated payment",
            pedidoCreado: "Simulated purchase created in Supabase.",
            errorPedido: "The order could not be created.",
            etiquetaCambio: "Approximate USD value",
            textoPie: "MotoCrazy MC - Web project with HTML, CSS, JavaScript, Supabase and a free API."
        }
    };

    const readyCallbacks = [];
    const languageListeners = [];

    const estado = {
        page: document.body ? document.body.dataset.pagina || "inicio" : "inicio",
        lang: initialLanguage(),
        tema: temaInicial(),
        user: null,
        profile: null,
        isAdmin: false,
        catalogs: {
            motos: [],
            accesorios: []
        },
        estadoCatalogo: {
            motos: "idle",
            accesorios: "idle"
        },
        filters: {
            motos: {
                query: "",
                category: "all",
                marca: "all",
                displacement: "all"
            },
            accesorios: {
                query: "",
                category: "all"
            }
        },
        comparacion: [],
        cart: null,
        itemsCarrito: [],
        orders: [],
        usdRate: null
    };

    let started = false;
    let cliente = null;

    if (window.supabase && typeof window.supabase.createClient === "function") {
        cliente = window.supabase.createClient(CONFIGURACION.url, CONFIGURACION.anonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }

    const Aplicacion = {
        config: CONFIGURACION,
        cliente,
        estado,
        onReady,
        onLanguageChange,
        t,
        escapeHTML,
        escapeAttribute,
        formatMoney,
        formatUsd,
        slugify,
        normalizeText,
        normalizeCategory,
        nestedName,
        unique,
        descriptionFor,
        etiquetaCategoria,
        formatPrice,
        tarjetaProducto,
        findProduct,
        openProductDetail,
        closeProductDetail,
        showToast,
        applyLanguage,
        setCatalogStatus,
        renderFeaturedProducts,
        updateDatabaseStatus,
        loadExchangeRate,
        requireClient,
        start
    };

    window.MotoCrazy = Aplicacion;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        window.setTimeout(start, 0);
    }

    function onReady(callback) {
        readyCallbacks.push(callback);
    }

    function onLanguageChange(callback) {
        languageListeners.push(callback);
    }

    async function start() {
        if (started) return;
        started = true;

        initShell();
        for (const callback of readyCallbacks) {
            await callback();
        }
        updateDatabaseStatus();
    }

    function initShell() {
        createToast();
        createProductDetailModal();
        applyTheme();
        applyLanguage();
        updateActiveNav();
        updateControlLabels();
        bindShellEvents();
        loadWeather();
        loadExchangeRate();
        renderFeaturedProducts();
        updateDatabaseStatus();
    }

    function bindShellEvents() {
        document.addEventListener("click", function (event) {
            const actionElement = event.target.closest("[data-accion]");
            if (!actionElement) return;

            const action = actionElement.dataset.accion;
            if (action === "alternar-tema") {
                estado.tema = estado.tema === "oscuro" ? "claro" : "oscuro";
                updateCurrentPageParams();
                applyTheme();
                updateControlLabels();
                return;
            }

            if (action === "alternar-idioma") {
                estado.lang = estado.lang === "es" ? "en" : "es";
                updateCurrentPageParams();
                applyLanguage();
                updateControlLabels();
                languageListeners.forEach(function (listener) {
                    listener();
                });
                return;
            }

            if (action === "mostrar-detalle") {
                openProductDetail(actionElement.dataset.tipoProducto, actionElement.dataset.idProducto);
                return;
            }

            if (action === "cerrar-detalle") {
                closeProductDetail();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeProductDetail();
            }
        });

        document.addEventListener("error", function (event) {
            const target = event.target;
            if (target && target.tagName === "IMG" && target.getAttribute("src") !== CONFIGURACION.fallbackImage) {
                target.setAttribute("src", CONFIGURACION.fallbackImage);
            }
        }, true);

        window.addEventListener("motocrazy:catalog-changed", function () {
            renderFeaturedProducts();
            updateDatabaseStatus();
        });
    }

    function requireClient() {
        if (!cliente) {
            showToast(t("configAutenticacionFaltante"));
            return null;
        }
        return cliente;
    }

    function applyTheme() {
        document.documentElement.dataset.tema = estado.tema;
        syncInternalPageLinks();
    }

    function applyLanguage() {
        document.documentElement.lang = estado.lang;

        document.querySelectorAll("[data-i18n]").forEach(function (node) {
            const key = node.dataset.i18n;
            node.textContent = t(key);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
            const key = node.dataset.i18nPlaceholder;
            node.setAttribute("placeholder", t(key));
        });

        syncInternalPageLinks();
    }

    function updateControlLabels() {
        document.querySelectorAll("[data-accion='alternar-tema']").forEach(function (button) {
            button.textContent = estado.tema === "oscuro" ? t("temaAClaro") : t("temaAOscuro");
        });
        document.querySelectorAll("[data-accion='alternar-idioma']").forEach(function (button) {
            button.textContent = estado.lang === "es" ? "EN" : "ES";
        });
    }

    function updateActiveNav() {
        document.querySelectorAll("[data-navegacion]").forEach(function (link) {
            link.classList.toggle("esta-activo", link.dataset.navegacion === estado.page);
        });
    }

    function initialLanguage() {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get("lang");
        return lang === "en" ? "en" : "es";
    }

    function temaInicial() {
        const params = new URLSearchParams(window.location.search);
        const tema = params.get("tema");
        return tema === "claro" ? "claro" : "oscuro";
    }

    function updateCurrentPageParams() {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", estado.lang);
        url.searchParams.set("tema", estado.tema);
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }

    function syncInternalPageLinks() {
        document.querySelectorAll("a[href]").forEach(function (link) {
            const href = link.getAttribute("href");
            const nextHref = withPageStateParams(href);
            if (nextHref) link.setAttribute("href", nextHref);
        });
    }

    function withPageStateParams(href) {
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
            return "";
        }

        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return "";

        const fileName = url.pathname.split("/").pop();
        const isPageLink = fileName.endsWith(".html") || fileName === "";
        if (!isPageLink) return "";

        url.searchParams.set("lang", estado.lang);
        url.searchParams.set("tema", estado.tema);
        return `${fileName || "index.html"}${url.search}${url.hash}`;
    }

    function setCatalogStatus(type, status) {
        estado.estadoCatalogo[type] = status;
        updateDatabaseStatus();
        window.dispatchEvent(new CustomEvent("motocrazy:catalog-changed", {
            detail: { type, status }
        }));
    }

    function renderFeaturedProducts() {
        const grid = document.getElementById("grillaDestacados");
        if (!grid) return;

        const productos = estado.catalogs.motos.concat(estado.catalogs.accesorios).slice(0, 3);
        if (productos.length) {
            grid.innerHTML = productos.map(function (producto) {
                return tarjetaProducto(producto);
            }).join("");
            return;
        }

        const statuses = Object.values(estado.estadoCatalogo);
        if (statuses.includes("loading") || statuses.includes("idle")) {
            grid.innerHTML = `<p class="estado-vacio">${escapeHTML(t("catalogoCargando"))}</p>`;
        } else {
            grid.innerHTML = `<p class="estado-vacio">${escapeHTML(t("catalogoSupabaseVacio"))}</p>`;
        }
    }

    function updateDatabaseStatus() {
        const nodoBaseDatos = document.getElementById("estadoBaseDatos");
        if (!nodoBaseDatos) return;

        if (!cliente) {
            nodoBaseDatos.textContent = t("supabaseClienteFaltante");
            return;
        }

        const statuses = Object.values(estado.estadoCatalogo);
        const hasData = estado.catalogs.motos.length || estado.catalogs.accesorios.length;
        if (hasData) {
            nodoBaseDatos.textContent = t("supabaseConDatos");
        } else if (statuses.includes("loading") || statuses.includes("idle")) {
            nodoBaseDatos.textContent = t("baseDatosRevisando");
        } else if (statuses.includes("error")) {
            nodoBaseDatos.textContent = t("supabaseError");
        } else {
            nodoBaseDatos.textContent = t("supabaseSinDatos");
        }
    }

    function estadoCatalogoText(type) {
        const status = estado.estadoCatalogo[type];
        if (status === "loading" || status === "idle") return t("catalogoCargando");
        if (status === "loaded") return type === "motos" ? t("catalogoSupabaseMotos") : t("catalogoSupabaseAccesorios");
        if (status === "empty") return t("catalogoSupabaseVacio");
        return t("catalogoSupabaseError");
    }

    Aplicacion.estadoCatalogoText = estadoCatalogoText;

    function tarjetaProducto(producto, options) {
        const ajustes = options || {};
        const comparacion = ajustes.comparacion ? `
            <button class="boton boton--secondary tarjeta-producto__detalle" type="button" data-accion="alternar-comparacion" data-id-producto="${escapeAttribute(producto.id)}">
                ${escapeHTML(t("botonComparar"))}
            </button>
        ` : "";
        const cotizadorCuotas = ajustes.cuotas && producto.type === "moto" ? `
            <button class="boton boton--secondary tarjeta-producto__detalle" type="button" data-accion="cotizar-cuotas" data-id-producto="${escapeAttribute(producto.id)}">
                ${escapeHTML(t("botonCotizarCuotas"))}
            </button>
        ` : "";
        const variantBadges = producto.variants && producto.variants.length ? `
            <section class="tarjeta-producto__meta">
                ${producto.variants.slice(0, 3).map(function (variant) {
                    return `<span class="insignia">${escapeHTML(variantTitle(variant))}</span>`;
                }).join("")}
            </section>
        ` : "";

        return `
            <article class="tarjeta-producto">
                <section class="tarjeta-producto__medio">
                    <img src="${escapeAttribute(producto.image || CONFIGURACION.fallbackImage)}" alt="${escapeAttribute(producto.name)}" loading="lazy">
                </section>
                <section class="tarjeta-producto__cuerpo">
                    <section class="tarjeta-producto__meta">
                        <span class="insignia">${escapeHTML(producto.marca || etiquetaCategoria(producto.category, producto.catalogType))}</span>
                        <span class="insignia">${escapeHTML(etiquetaCategoria(producto.category, producto.catalogType))}</span>
                        <span class="insignia">${escapeHTML(t("stock"))}: ${Number(producto.stock || 0)}</span>
                        ${producto.type === "moto" ? `<span class="insignia">${escapeHTML(t("filtroCilindradaTexto"))}: ${escapeHTML(producto.cilindrada || "-")}</span>` : ""}
                        ${producto.type === "moto" ? `<span class="insignia">${escapeHTML(t("etiquetaPotencia"))}: ${escapeHTML(producto.potencia || "-")}</span>` : ""}
                    </section>
                    <h3>${escapeHTML(producto.name)}</h3>
                    <p class="tarjeta-producto__descripcion">${escapeHTML(descriptionFor(producto))}</p>
                    ${variantBadges}
                </section>
                <section class="tarjeta-producto__pie">
                    <strong class="precio">${escapeHTML(formatPrice(producto))}</strong>
                    <button class="boton boton--secondary tarjeta-producto__detalle" type="button" data-accion="mostrar-detalle" data-tipo-producto="${escapeAttribute(producto.type)}" data-id-producto="${escapeAttribute(producto.id)}">
                        ${escapeHTML(t("botonDetalle"))}
                    </button>
                    ${comparacion}
                    ${cotizadorCuotas}
                    <button class="tarjeta-producto__boton" type="button" data-accion="agregar-carrito" data-tipo-producto="${escapeAttribute(producto.type)}" data-id-producto="${escapeAttribute(producto.id)}">
                        ${escapeHTML(t("agregarAlCarrito"))}
                    </button>
                </section>
            </article>
        `;
    }

    function createProductDetailModal() {
        if (document.getElementById("detalleProducto")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <section id="detalleProducto" class="modal-autenticacion detalle-producto" aria-hidden="true">
                <section class="modal-autenticacion__fondo" data-accion="cerrar-detalle"></section>
                <section class="modal-autenticacion__panel detalle-producto__panel" role="dialog" aria-modal="true">
                    <button class="boton-icono modal-autenticacion__cerrar" type="button" data-accion="cerrar-detalle" aria-label="${escapeAttribute(t("closeCart"))}">X</button>
                    <section id="cuerpoDetalleProducto"></section>
                </section>
            </section>
        `);
    }

    function openProductDetail(type, id) {
        const producto = findProduct(type, id);
        const modal = document.getElementById("detalleProducto");
        const body = document.getElementById("cuerpoDetalleProducto");
        if (!producto || !modal || !body) return;

        const specs = producto.type === "moto" ? `
            <section><dt>${escapeHTML(t("etiquetaMarca"))}</dt><dd>${escapeHTML(producto.marca || "-")}</dd></section>
            <section><dt>${escapeHTML(t("etiquetaCategoria"))}</dt><dd>${escapeHTML(etiquetaCategoria(producto.category, producto.catalogType))}</dd></section>
            <section><dt>${escapeHTML(t("filtroCilindradaTexto"))}</dt><dd>${escapeHTML(producto.cilindrada || "-")}</dd></section>
            <section><dt>${escapeHTML(t("etiquetaMotor"))}</dt><dd>${escapeHTML(producto.motor || "-")}</dd></section>
            <section><dt>${escapeHTML(t("etiquetaPotencia"))}</dt><dd>${escapeHTML(producto.potencia || "-")}</dd></section>
        ` : `
            <section><dt>${escapeHTML(t("etiquetaCategoria"))}</dt><dd>${escapeHTML(etiquetaCategoria(producto.category, producto.catalogType))}</dd></section>
            <section><dt>${escapeHTML(t("etiquetaVariantes"))}</dt><dd>${escapeHTML(variantSummary(producto))}</dd></section>
        `;

        body.innerHTML = `
            <h2>${escapeHTML(producto.name)}</h2>
            <section class="detalle-producto__cuerpo">
                <img src="${escapeAttribute(producto.image || CONFIGURACION.fallbackImage)}" alt="${escapeAttribute(producto.name)}">
                <section>
                    <p>${escapeHTML(descriptionFor(producto))}</p>
                    <dl class="especificaciones-detalle">
                        ${specs}
                        <section><dt>${escapeHTML(t("stock"))}</dt><dd>${Number(producto.stock || 0)}</dd></section>
                        <section class="especificaciones-detalle__precio"><dt>${escapeHTML(t("totalCarrito"))}</dt><dd>${escapeHTML(formatPrice(producto))}</dd></section>
                    </dl>
                </section>
            </section>
        `;

        modal.classList.add("esta-abierto");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeProductDetail() {
        const modal = document.getElementById("detalleProducto");
        if (!modal) return;
        modal.classList.remove("esta-abierto");
        modal.setAttribute("aria-hidden", "true");
    }

    function findProduct(type, id) {
        const catalogType = type === "moto" ? "motos" : "accesorios";
        const productos = estado.catalogs[catalogType] || [];
        return productos.find(function (producto) {
            return String(producto.id) === String(id);
        });
    }

    function descriptionFor(producto) {
        if (!producto || !producto.description) return t("descripcionNoDisponible");
        return String(producto.description);
    }

    function etiquetaCategoria(category, type) {
        const productos = estado.catalogs[type] || [];
        const producto = productos.find(function (item) {
            return item.category === category;
        });
        if (producto && producto.categoryName) return producto.categoryName;
        return titleFromSlug(category);
    }

    function formatPrice(producto) {
        const rawPrice = producto ? producto.precio : null;
        const price = Number(rawPrice);
        if (rawPrice === null || rawPrice === undefined || Number.isNaN(price)) return t("precioNoDisponible");
        const money = formatMoney(price);
        return producto.prefijoPrecio ? `${t("precioDesde")} ${money}` : money;
    }

    function variantTitle(variant) {
        const parts = [];
        if (variant.id_variante) parts.push(`#${variant.id_variante}`);
        if (variant.id_talla_accesorio) parts.push(`Talla ${variant.id_talla_accesorio}`);
        if (variant.stock !== undefined) parts.push(`${t("stock")} ${Number(variant.stock || 0)}`);
        return parts.join(" / ") || t("etiquetaVariante");
    }

    function variantSummary(producto) {
        if (!producto.variants || !producto.variants.length) return "-";
        return producto.variants.map(function (variant) {
            return `${variantTitle(variant)} - ${formatMoney(variant.precio || 0)}`;
        }).join(", ");
    }

    function formatMoney(value) {
        return new Intl.NumberFormat(estado.lang === "en" ? "en-US" : "es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }).format(Number(value) || 0);
    }

    function formatUsd(value) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2
        }).format(Number(value) || 0);
    }

    async function loadExchangeRate() {
        try {
            const response = await fetch("https://open.er-api.com/v6/latest/COP");
            if (!response.ok) throw new Error("exchange");
            const data = await response.json();
            estado.usdRate = Number(data && data.rates && data.rates.USD ? data.rates.USD : 0) || null;
            if (Aplicacion.cart && Aplicacion.cart.render) Aplicacion.cart.render();
        } catch (error) {
            estado.usdRate = null;
        }
    }

    async function loadWeather() {
        const widget = document.getElementById("widgetClima");
        if (!widget) return;

        widget.innerHTML = `<p>${escapeHTML(t("climaCargando"))}</p>`;
        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=4.7110&longitude=-74.0721&current=temperature_2m,precipitation,wind_speed_10m&timezone=America%2FBogota";
            const response = await fetch(url);
            if (!response.ok) throw new Error("weather");
            const data = await response.json();
            const current = data.current || {};
            const units = data.current_units || {};
            const hasRain = Number(current.precipitation || 0) > 0;

            widget.innerHTML = `
                <p class="insignia">${escapeHTML(hasRain ? t("climaLluvia") : t("climaSeco"))}</p>
                <section class="datos-clima">
                    <p><span>${escapeHTML(t("climaTemperatura"))}</span><strong>${escapeHTML(current.temperature_2m)} ${escapeHTML(units.temperature_2m || "C")}</strong></p>
                    <p><span>${escapeHTML(t("climaLluviaDato"))}</span><strong>${escapeHTML(current.precipitation)} ${escapeHTML(units.precipitation || "mm")}</strong></p>
                    <p><span>${escapeHTML(t("climaViento"))}</span><strong>${escapeHTML(current.wind_speed_10m)} ${escapeHTML(units.wind_speed_10m || "km/h")}</strong></p>
                </section>
            `;
        } catch (error) {
            widget.innerHTML = `<p>${escapeHTML(t("climaNoDisponible"))}</p>`;
        }
    }

    function createToast() {
        if (document.getElementById("toast")) return;
        document.body.insertAdjacentHTML("beforeend", `<section id="toast" class="aviso" role="status" aria-live="polite"></section>`);
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("esta-visible");
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toast.classList.remove("esta-visible");
        }, 2200);
    }

    function t(key) {
        return (traducciones[estado.lang] && traducciones[estado.lang][key]) || traducciones.es[key] || key;
    }

    function unique(values) {
        return Array.from(new Set(values.filter(function (value) {
            return value !== undefined && value !== null && value !== "";
        })));
    }

    function slugify(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function normalizeCategory(value) {
        return slugify(value) || "categoria";
    }

    function nestedName(value) {
        if (!value) return "";
        if (Array.isArray(value)) return value.length ? nestedName(value[0]) : "";
        if (typeof value === "string") return value;
        return value.nombre || value.name || "";
    }

    function titleFromSlug(value) {
        return String(value || "")
            .split("-")
            .filter(Boolean)
            .map(function (part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            })
            .join(" ");
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttribute(value) {
        return escapeHTML(value);
    }
})();
