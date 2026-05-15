(function () {
    "use strict";

    const CONFIG = {
        url: "https://pttwrjcacgxgqezbgpqi.supabase.co",
        anonKey: "sb_publishable_mDam12TItAwnK4yOpoakJg_U2Gao65g",
        fallbackImage: "CSS/img_1.jpg"
    };

    const translations = {
        es: {
            navHome: "Inicio",
            navMotos: "Motos",
            navAccessories: "Accesorios",
            adminNav: "Admin",
            themeToLight: "Claro",
            themeToDark: "Oscuro",
            cartButton: "Carrito",
            heroLineOne: "VIVE LA PASION",
            heroLineTwo: "SOBRE DOS",
            heroLineThree: "RUEDAS",
            homeHeroText: "Rendimiento, estilo y seguridad en cada curva.",
            seeMotos: "VER MOTOS",
            seeAccessories: "VER ACCESORIOS",
            metricCatalog: "Referencias en catalogo",
            metricLanguages: "Idiomas disponibles",
            metricCart: "Carrito guardado",
            featuredEyebrow: "Seleccion destacada",
            featuredTitle: "Productos listos para agregar",
            weatherEyebrow: "API gratuita",
            weatherTitle: "Clima para rodar en Bogota",
            weatherLoading: "Consultando clima actual...",
            weatherUnavailable: "No fue posible consultar el clima ahora.",
            weatherDry: "Ruta seca",
            weatherWet: "Lluvia reciente",
            weatherTemp: "Temperatura",
            weatherRain: "Lluvia",
            weatherWind: "Viento",
            databaseEyebrow: "Base de datos",
            databaseTitle: "Catalogo sincronizable",
            databaseChecking: "Revisando conexion con Supabase...",
            dbSupabaseData: "Supabase activo: catalogos y ecommerce conectados.",
            dbSupabaseEmpty: "Supabase respondio, pero no hay productos para mostrar.",
            dbSupabaseError: "No se pudo consultar Supabase. Revisa URL, key, RLS o tablas.",
            dbMissingClient: "No se cargo Supabase JS v2.",
            motosEyebrow: "Catalogo",
            motosTitle: "Motos para cada estilo",
            motosIntro: "Filtra por categoria, compara precios y agrega tus favoritas al carrito.",
            accessoriesEyebrow: "Equipamiento",
            accessoriesTitle: "Accesorios para piloto y moto",
            accessoriesIntro: "Completa tu ruta con proteccion, comodidad y repuestos esenciales.",
            searchLabel: "Buscar",
            searchMotos: "Buscar moto...",
            searchAccessories: "Buscar accesorio...",
            all: "Todo",
            addToCart: "Agregar",
            stock: "Stock",
            noResults: "No hay productos que coincidan con la busqueda.",
            catalogLoading: "Cargando datos desde Supabase...",
            catalogSupabaseMotos: "Motos consultadas desde Supabase.",
            catalogSupabaseAccessories: "Accesorios consultados desde Supabase.",
            catalogSupabaseEmpty: "Supabase esta conectado, pero aun no hay productos.",
            catalogSupabaseError: "No se pudo leer Supabase. No se usaran datos locales.",
            priceUnavailable: "Consultar",
            fromPrice: "Desde",
            detailButton: "Detalle",
            compareButton: "Comparar",
            compareTitle: "Comparador de motos",
            compareEmpty: "Selecciona hasta 3 motos para comparar.",
            compareClear: "Limpiar comparador",
            filterBrand: "Marca",
            filterDisplacement: "Cilindrada",
            allBrands: "Todas las marcas",
            allDisplacements: "Todas las cilindradas",
            ccUnit: "cc",
            motorLabel: "Motor",
            powerLabel: "Potencia",
            categoryLabel: "Categoria",
            brandLabel: "Marca",
            descriptionUnavailable: "Sin descripcion disponible.",
            variantsLabel: "Variantes",
            variantLabel: "Variante",
            adminTitle: "Panel administrativo",
            adminIntro: "Gestiona motos y accesorios conectados a Supabase.",
            adminAuthHint: "Inicia sesion para crear, editar o eliminar registros.",
            adminMotoForm: "CRUD motos",
            adminAccessoryForm: "CRUD accesorios",
            adminName: "Nombre",
            adminBrandId: "ID marca",
            adminCategoryId: "ID categoria",
            adminImage: "URL imagen",
            adminPrice: "Precio",
            adminStock: "Stock",
            adminDescription: "Descripcion",
            adminSave: "Guardar",
            adminDelete: "Eliminar",
            adminSaved: "Registro guardado.",
            adminDeleted: "Registro eliminado.",
            adminError: "No fue posible completar el CRUD. Revisa sesion, RLS y columnas.",
            authMenuTitle: "Escoja una opcion para entrar",
            authActiveSession: "Sesion activa",
            authRegisterButton: "REGISTRARME COMO USUARIO",
            authLoginButton: "INICIAR SESION",
            authLogoutButton: "CERRAR SESION",
            authRecoverButton: "Recuperar contrasena",
            authGoogleButton: "ENTRAR CON GOOGLE",
            authFacebookButton: "ENTRAR CON FACEBOOK",
            authAppleButton: "ENTRAR CON APPLE",
            authRegisterTitle: "Crear cuenta",
            authRegisterHint: "Registra tu usuario con Supabase Auth.",
            authRegisterSubmit: "REGISTRARME",
            authLoginTitle: "Iniciar sesion",
            authLoginHint: "Entra con el correo y la contrasena que registraste.",
            authLoginSubmit: "INICIAR SESION",
            authRecoverTitle: "Recuperar contrasena",
            authRecoverHint: "Te enviaremos un enlace de recuperacion al correo.",
            authRecoverSubmit: "ENVIAR ENLACE",
            authEmailLabel: "Correo electronico",
            authPasswordLabel: "Contrasena",
            authCloseLabel: "Cerrar",
            authConnectedUser: "Usuario conectado",
            authProcessing: "PROCESANDO...",
            authPasswordTooShort: "La contrasena debe tener al menos 6 caracteres.",
            authRegisterSuccess: "Registro completado.",
            authRegisterConfirm: "Registro creado. Revisa tu correo si Supabase pide confirmacion.",
            authLoginSuccess: "Sesion iniciada.",
            authRecoverSent: "Enlace de recuperacion enviado si el correo existe.",
            authGenericError: "No fue posible completar la autenticacion.",
            authMissingConfig: "No se pudo inicializar Supabase.",
            authLogoutSuccess: "Sesion cerrada.",
            authRequired: "Inicia sesion para usar esta funcion.",
            cartTitle: "Carrito",
            closeCart: "Cerrar",
            remove: "Eliminar",
            clearCart: "Vaciar carrito",
            checkout: "Finalizar compra",
            cartEmpty: "Tu carrito esta vacio.",
            cartLoginRequired: "Inicia sesion para cargar tu carrito de Supabase.",
            cartTotal: "Total",
            itemAdded: "Producto agregado al carrito.",
            itemRemoved: "Producto eliminado.",
            cartCleared: "Carrito vaciado.",
            cartLoadError: "No se pudo cargar el carrito.",
            cartWriteError: "No se pudo actualizar el carrito.",
            checkoutEmpty: "Tu carrito esta vacio.",
            checkoutLoginRequired: "Inicia sesion para finalizar la compra.",
            orderHistoryTitle: "Historial de pedidos",
            orderHistoryEmpty: "Aun no hay pedidos.",
            orderHistoryLogin: "Inicia sesion para ver tu historial.",
            orderSummary: "Resumen de compra",
            orderCreated: "Pedido creado en Supabase.",
            orderError: "No se pudo crear el pedido.",
            exchangeLabel: "Valor aproximado en USD",
            footerText: "MotoCrazy MC - Proyecto web con HTML, CSS, JavaScript, Supabase y API gratuita."
        },
        en: {
            navHome: "Home",
            navMotos: "Motorcycles",
            navAccessories: "Accessories",
            adminNav: "Admin",
            themeToLight: "Light",
            themeToDark: "Dark",
            cartButton: "Cart",
            heroLineOne: "LIVE THE PASSION",
            heroLineTwo: "ON TWO",
            heroLineThree: "WHEELS",
            homeHeroText: "Performance, style and safety in every curve.",
            seeMotos: "SEE BIKES",
            seeAccessories: "SEE GEAR",
            metricCatalog: "Catalog items",
            metricLanguages: "Available languages",
            metricCart: "Saved cart",
            featuredEyebrow: "Featured selection",
            featuredTitle: "Ready to add",
            weatherEyebrow: "Free API",
            weatherTitle: "Riding weather in Bogota",
            weatherLoading: "Checking current weather...",
            weatherUnavailable: "Weather data is unavailable right now.",
            weatherDry: "Dry route",
            weatherWet: "Recent rain",
            weatherTemp: "Temperature",
            weatherRain: "Rain",
            weatherWind: "Wind",
            databaseEyebrow: "Database",
            databaseTitle: "Synchronized catalog",
            databaseChecking: "Checking Supabase connection...",
            dbSupabaseData: "Supabase active: catalogs and ecommerce connected.",
            dbSupabaseEmpty: "Supabase responded, but there are no products yet.",
            dbSupabaseError: "Supabase could not be queried. Check URL, key, RLS or tables.",
            dbMissingClient: "Supabase JS v2 was not loaded.",
            motosEyebrow: "Catalog",
            motosTitle: "Motorcycles for every style",
            motosIntro: "Filter by category, compare prices and add favorites to the cart.",
            accessoriesEyebrow: "Gear",
            accessoriesTitle: "Accessories for rider and bike",
            accessoriesIntro: "Complete your ride with protection, comfort and essential parts.",
            searchLabel: "Search",
            searchMotos: "Search bike...",
            searchAccessories: "Search accessory...",
            all: "All",
            addToCart: "Add",
            stock: "Stock",
            noResults: "No products match your search.",
            catalogLoading: "Loading data from Supabase...",
            catalogSupabaseMotos: "Motorcycles loaded from Supabase.",
            catalogSupabaseAccessories: "Accessories loaded from Supabase.",
            catalogSupabaseEmpty: "Supabase is connected, but there are no products yet.",
            catalogSupabaseError: "Supabase could not be read. No local data will be used.",
            priceUnavailable: "Ask price",
            fromPrice: "From",
            detailButton: "Details",
            compareButton: "Compare",
            compareTitle: "Motorcycle comparison",
            compareEmpty: "Select up to 3 motorcycles to compare.",
            compareClear: "Clear comparison",
            filterBrand: "Brand",
            filterDisplacement: "Displacement",
            allBrands: "All brands",
            allDisplacements: "All displacements",
            ccUnit: "cc",
            motorLabel: "Engine",
            powerLabel: "Power",
            categoryLabel: "Category",
            brandLabel: "Brand",
            descriptionUnavailable: "No description available.",
            variantsLabel: "Variants",
            variantLabel: "Variant",
            adminTitle: "Admin panel",
            adminIntro: "Manage motorcycles and accessories connected to Supabase.",
            adminAuthHint: "Sign in to create, edit or delete records.",
            adminMotoForm: "Motorcycle CRUD",
            adminAccessoryForm: "Accessory CRUD",
            adminName: "Name",
            adminBrandId: "Brand ID",
            adminCategoryId: "Category ID",
            adminImage: "Image URL",
            adminPrice: "Price",
            adminStock: "Stock",
            adminDescription: "Description",
            adminSave: "Save",
            adminDelete: "Delete",
            adminSaved: "Record saved.",
            adminDeleted: "Record deleted.",
            adminError: "CRUD could not be completed. Check session, RLS and columns.",
            authMenuTitle: "Choose an option to continue",
            authActiveSession: "Active session",
            authRegisterButton: "CREATE ACCOUNT",
            authLoginButton: "SIGN IN",
            authLogoutButton: "SIGN OUT",
            authRecoverButton: "Recover password",
            authGoogleButton: "SIGN IN WITH GOOGLE",
            authFacebookButton: "SIGN IN WITH FACEBOOK",
            authAppleButton: "SIGN IN WITH APPLE",
            authRegisterTitle: "Create account",
            authRegisterHint: "Create your user with Supabase Auth.",
            authRegisterSubmit: "CREATE ACCOUNT",
            authLoginTitle: "Sign in",
            authLoginHint: "Use the email and password you registered.",
            authLoginSubmit: "SIGN IN",
            authRecoverTitle: "Recover password",
            authRecoverHint: "We will send a recovery link to your email.",
            authRecoverSubmit: "SEND LINK",
            authEmailLabel: "Email address",
            authPasswordLabel: "Password",
            authCloseLabel: "Close",
            authConnectedUser: "Connected user",
            authProcessing: "PROCESSING...",
            authPasswordTooShort: "Password must be at least 6 characters.",
            authRegisterSuccess: "Registration complete.",
            authRegisterConfirm: "Account created. Check your email if Supabase requires confirmation.",
            authLoginSuccess: "Signed in.",
            authRecoverSent: "Recovery link sent if the email exists.",
            authGenericError: "Authentication could not be completed.",
            authMissingConfig: "Supabase could not be initialized.",
            authLogoutSuccess: "Signed out.",
            authRequired: "Sign in to use this feature.",
            cartTitle: "Cart",
            closeCart: "Close",
            remove: "Remove",
            clearCart: "Clear cart",
            checkout: "Checkout",
            cartEmpty: "Your cart is empty.",
            cartLoginRequired: "Sign in to load your Supabase cart.",
            cartTotal: "Total",
            itemAdded: "Product added to cart.",
            itemRemoved: "Product removed.",
            cartCleared: "Cart cleared.",
            cartLoadError: "Cart could not be loaded.",
            cartWriteError: "Cart could not be updated.",
            checkoutEmpty: "Your cart is empty.",
            checkoutLoginRequired: "Sign in to finish checkout.",
            orderHistoryTitle: "Order history",
            orderHistoryEmpty: "No orders yet.",
            orderHistoryLogin: "Sign in to view your order history.",
            orderSummary: "Purchase summary",
            orderCreated: "Order created in Supabase.",
            orderError: "The order could not be created.",
            exchangeLabel: "Approximate USD value",
            footerText: "MotoCrazy MC - Web project with HTML, CSS, JavaScript, Supabase and a free API."
        }
    };

    const readyCallbacks = [];
    const languageListeners = [];

    const state = {
        page: document.body ? document.body.dataset.page || "inicio" : "inicio",
        lang: initialLanguage(),
        theme: document.documentElement.dataset.theme || "dark",
        user: null,
        catalogs: {
            motos: [],
            accesorios: []
        },
        catalogStatus: {
            motos: "idle",
            accesorios: "idle"
        },
        filters: {
            motos: {
                query: "",
                category: "all",
                brand: "all",
                displacement: "all"
            },
            accesorios: {
                query: "",
                category: "all"
            }
        },
        compare: [],
        cart: null,
        cartItems: [],
        orders: [],
        usdRate: null
    };

    let started = false;
    let client = null;

    if (window.supabase && typeof window.supabase.createClient === "function") {
        client = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        });
    }

    const App = {
        config: CONFIG,
        client,
        state,
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
        categoryLabel,
        formatPrice,
        productCard,
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

    window.MotoCrazy = App;

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
            const actionElement = event.target.closest("[data-action]");
            if (!actionElement) return;

            const action = actionElement.dataset.action;
            if (action === "toggle-theme") {
                state.theme = state.theme === "dark" ? "light" : "dark";
                applyTheme();
                updateControlLabels();
                return;
            }

            if (action === "toggle-lang") {
                state.lang = state.lang === "es" ? "en" : "es";
                updateCurrentLanguageParam();
                applyLanguage();
                updateControlLabels();
                languageListeners.forEach(function (listener) {
                    listener();
                });
                return;
            }

            if (action === "show-detail") {
                openProductDetail(actionElement.dataset.productType, actionElement.dataset.productId);
                return;
            }

            if (action === "close-detail") {
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
            if (target && target.tagName === "IMG" && target.getAttribute("src") !== CONFIG.fallbackImage) {
                target.setAttribute("src", CONFIG.fallbackImage);
            }
        }, true);

        window.addEventListener("motocrazy:catalog-changed", function () {
            renderFeaturedProducts();
            updateDatabaseStatus();
        });
    }

    function requireClient() {
        if (!client) {
            showToast(t("authMissingConfig"));
            return null;
        }
        return client;
    }

    function applyTheme() {
        document.documentElement.dataset.theme = state.theme;
    }

    function applyLanguage() {
        document.documentElement.lang = state.lang;

        document.querySelectorAll("[data-i18n]").forEach(function (node) {
            const key = node.dataset.i18n;
            node.textContent = t(key);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
            const key = node.dataset.i18nPlaceholder;
            node.setAttribute("placeholder", t(key));
        });

        syncInternalLanguageLinks();
    }

    function updateControlLabels() {
        document.querySelectorAll("[data-action='toggle-theme']").forEach(function (button) {
            button.textContent = state.theme === "dark" ? t("themeToLight") : t("themeToDark");
        });
        document.querySelectorAll("[data-action='toggle-lang']").forEach(function (button) {
            button.textContent = state.lang === "es" ? "EN" : "ES";
        });
    }

    function updateActiveNav() {
        document.querySelectorAll("[data-nav]").forEach(function (link) {
            link.classList.toggle("is-active", link.dataset.nav === state.page);
        });
    }

    function initialLanguage() {
        const params = new URLSearchParams(window.location.search);
        const lang = params.get("lang");
        return lang === "en" ? "en" : "es";
    }

    function updateCurrentLanguageParam() {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", state.lang);
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }

    function syncInternalLanguageLinks() {
        document.querySelectorAll("a[href]").forEach(function (link) {
            const href = link.getAttribute("href");
            const nextHref = withLanguageParam(href);
            if (nextHref) link.setAttribute("href", nextHref);
        });
    }

    function withLanguageParam(href) {
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
            return "";
        }

        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return "";

        const fileName = url.pathname.split("/").pop();
        const isPageLink = fileName.endsWith(".html") || fileName === "";
        if (!isPageLink) return "";

        url.searchParams.set("lang", state.lang);
        return `${fileName || "index.html"}${url.search}${url.hash}`;
    }

    function setCatalogStatus(type, status) {
        state.catalogStatus[type] = status;
        updateDatabaseStatus();
        window.dispatchEvent(new CustomEvent("motocrazy:catalog-changed", {
            detail: { type, status }
        }));
    }

    function renderFeaturedProducts() {
        const grid = document.getElementById("featuredGrid");
        if (!grid) return;

        const products = state.catalogs.motos.concat(state.catalogs.accesorios).slice(0, 3);
        if (products.length) {
            grid.innerHTML = products.map(function (product) {
                return productCard(product);
            }).join("");
            return;
        }

        const statuses = Object.values(state.catalogStatus);
        if (statuses.includes("loading") || statuses.includes("idle")) {
            grid.innerHTML = `<p class="empty-state">${escapeHTML(t("catalogLoading"))}</p>`;
        } else {
            grid.innerHTML = `<p class="empty-state">${escapeHTML(t("catalogSupabaseEmpty"))}</p>`;
        }
    }

    function updateDatabaseStatus() {
        const databaseNode = document.getElementById("databaseStatus");
        if (!databaseNode) return;

        if (!client) {
            databaseNode.textContent = t("dbMissingClient");
            return;
        }

        const statuses = Object.values(state.catalogStatus);
        const hasData = state.catalogs.motos.length || state.catalogs.accesorios.length;
        if (hasData) {
            databaseNode.textContent = t("dbSupabaseData");
        } else if (statuses.includes("loading") || statuses.includes("idle")) {
            databaseNode.textContent = t("databaseChecking");
        } else if (statuses.includes("error")) {
            databaseNode.textContent = t("dbSupabaseError");
        } else {
            databaseNode.textContent = t("dbSupabaseEmpty");
        }
    }

    function catalogStatusText(type) {
        const status = state.catalogStatus[type];
        if (status === "loading" || status === "idle") return t("catalogLoading");
        if (status === "loaded") return type === "motos" ? t("catalogSupabaseMotos") : t("catalogSupabaseAccessories");
        if (status === "empty") return t("catalogSupabaseEmpty");
        return t("catalogSupabaseError");
    }

    App.catalogStatusText = catalogStatusText;

    function productCard(product, options) {
        const settings = options || {};
        const compare = settings.compare ? `
            <button class="button button--secondary product-card__detail" type="button" data-action="toggle-compare" data-product-id="${escapeAttribute(product.id)}">
                ${escapeHTML(t("compareButton"))}
            </button>
        ` : "";
        const variantBadges = product.variants && product.variants.length ? `
            <div class="product-card__meta">
                ${product.variants.slice(0, 3).map(function (variant) {
                    return `<span class="badge">${escapeHTML(variantTitle(variant))}</span>`;
                }).join("")}
            </div>
        ` : "";

        return `
            <article class="product-card">
                <div class="product-card__media">
                    <img src="${escapeAttribute(product.image || CONFIG.fallbackImage)}" alt="${escapeAttribute(product.name)}" loading="lazy">
                </div>
                <div class="product-card__body">
                    <div class="product-card__meta">
                        <span class="badge">${escapeHTML(product.brand || categoryLabel(product.category, product.catalogType))}</span>
                        <span class="badge">${escapeHTML(categoryLabel(product.category, product.catalogType))}</span>
                        <span class="badge">${escapeHTML(t("stock"))}: ${Number(product.stock || 0)}</span>
                        ${product.type === "moto" ? `<span class="badge">${escapeHTML(t("filterDisplacement"))}: ${escapeHTML(product.cilindrada || "-")}</span>` : ""}
                        ${product.type === "moto" ? `<span class="badge">${escapeHTML(t("powerLabel"))}: ${escapeHTML(product.potencia || "-")}</span>` : ""}
                    </div>
                    <h3>${escapeHTML(product.name)}</h3>
                    <p class="product-card__description">${escapeHTML(descriptionFor(product))}</p>
                    ${variantBadges}
                </div>
                <div class="product-card__footer">
                    <strong class="price">${escapeHTML(formatPrice(product))}</strong>
                    <button class="button button--secondary product-card__detail" type="button" data-action="show-detail" data-product-type="${escapeAttribute(product.type)}" data-product-id="${escapeAttribute(product.id)}">
                        ${escapeHTML(t("detailButton"))}
                    </button>
                    ${compare}
                    <button class="product-card__button" type="button" data-action="add-to-cart" data-product-type="${escapeAttribute(product.type)}" data-product-id="${escapeAttribute(product.id)}">
                        ${escapeHTML(t("addToCart"))}
                    </button>
                </div>
            </article>
        `;
    }

    function createProductDetailModal() {
        if (document.getElementById("productDetail")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <div id="productDetail" class="auth-modal product-detail" aria-hidden="true">
                <div class="auth-modal__backdrop" data-action="close-detail"></div>
                <section class="auth-modal__panel product-detail__panel" role="dialog" aria-modal="true">
                    <button class="icon-button auth-modal__close" type="button" data-action="close-detail" aria-label="${escapeAttribute(t("closeCart"))}">X</button>
                    <div id="productDetailBody"></div>
                </section>
            </div>
        `);
    }

    function openProductDetail(type, id) {
        const product = findProduct(type, id);
        const modal = document.getElementById("productDetail");
        const body = document.getElementById("productDetailBody");
        if (!product || !modal || !body) return;

        const specs = product.type === "moto" ? `
            <div><dt>${escapeHTML(t("brandLabel"))}</dt><dd>${escapeHTML(product.brand || "-")}</dd></div>
            <div><dt>${escapeHTML(t("categoryLabel"))}</dt><dd>${escapeHTML(categoryLabel(product.category, product.catalogType))}</dd></div>
            <div><dt>${escapeHTML(t("filterDisplacement"))}</dt><dd>${escapeHTML(product.cilindrada || "-")}</dd></div>
            <div><dt>${escapeHTML(t("motorLabel"))}</dt><dd>${escapeHTML(product.motor || "-")}</dd></div>
            <div><dt>${escapeHTML(t("powerLabel"))}</dt><dd>${escapeHTML(product.potencia || "-")}</dd></div>
        ` : `
            <div><dt>${escapeHTML(t("categoryLabel"))}</dt><dd>${escapeHTML(categoryLabel(product.category, product.catalogType))}</dd></div>
            <div><dt>${escapeHTML(t("variantsLabel"))}</dt><dd>${escapeHTML(variantSummary(product))}</dd></div>
        `;

        body.innerHTML = `
            <h2>${escapeHTML(product.name)}</h2>
            <div class="product-detail__body">
                <img src="${escapeAttribute(product.image || CONFIG.fallbackImage)}" alt="${escapeAttribute(product.name)}">
                <div>
                    <p>${escapeHTML(descriptionFor(product))}</p>
                    <dl class="detail-specs">
                        ${specs}
                        <div><dt>${escapeHTML(t("stock"))}</dt><dd>${Number(product.stock || 0)}</dd></div>
                        <div><dt>${escapeHTML(t("cartTotal"))}</dt><dd>${escapeHTML(formatPrice(product))}</dd></div>
                    </dl>
                </div>
            </div>
        `;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeProductDetail() {
        const modal = document.getElementById("productDetail");
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    }

    function findProduct(type, id) {
        const catalogType = type === "moto" ? "motos" : "accesorios";
        const products = state.catalogs[catalogType] || [];
        return products.find(function (product) {
            return String(product.id) === String(id);
        });
    }

    function descriptionFor(product) {
        if (!product || !product.description) return t("descriptionUnavailable");
        return String(product.description);
    }

    function categoryLabel(category, type) {
        const products = state.catalogs[type] || [];
        const product = products.find(function (item) {
            return item.category === category;
        });
        if (product && product.categoryName) return product.categoryName;
        return titleFromSlug(category);
    }

    function formatPrice(product) {
        const rawPrice = product ? product.price : null;
        const price = Number(rawPrice);
        if (rawPrice === null || rawPrice === undefined || Number.isNaN(price)) return t("priceUnavailable");
        const money = formatMoney(price);
        return product.pricePrefix ? `${t("fromPrice")} ${money}` : money;
    }

    function variantTitle(variant) {
        const parts = [];
        if (variant.id_variante) parts.push(`#${variant.id_variante}`);
        if (variant.id_talla_accesorio) parts.push(`Talla ${variant.id_talla_accesorio}`);
        if (variant.stock !== undefined) parts.push(`${t("stock")} ${Number(variant.stock || 0)}`);
        return parts.join(" / ") || t("variantLabel");
    }

    function variantSummary(product) {
        if (!product.variants || !product.variants.length) return "-";
        return product.variants.map(function (variant) {
            return `${variantTitle(variant)} - ${formatMoney(variant.price || 0)}`;
        }).join(", ");
    }

    function formatMoney(value) {
        return new Intl.NumberFormat(state.lang === "en" ? "en-US" : "es-CO", {
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
            state.usdRate = Number(data && data.rates && data.rates.USD ? data.rates.USD : 0) || null;
            if (App.cart && App.cart.render) App.cart.render();
        } catch (error) {
            state.usdRate = null;
        }
    }

    async function loadWeather() {
        const widget = document.getElementById("weatherWidget");
        if (!widget) return;

        widget.innerHTML = `<p>${escapeHTML(t("weatherLoading"))}</p>`;
        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=4.7110&longitude=-74.0721&current=temperature_2m,precipitation,wind_speed_10m&timezone=America%2FBogota";
            const response = await fetch(url);
            if (!response.ok) throw new Error("weather");
            const data = await response.json();
            const current = data.current || {};
            const units = data.current_units || {};
            const hasRain = Number(current.precipitation || 0) > 0;

            widget.innerHTML = `
                <p class="badge">${escapeHTML(hasRain ? t("weatherWet") : t("weatherDry"))}</p>
                <div class="weather-data">
                    <p><span>${escapeHTML(t("weatherTemp"))}</span><strong>${escapeHTML(current.temperature_2m)} ${escapeHTML(units.temperature_2m || "C")}</strong></p>
                    <p><span>${escapeHTML(t("weatherRain"))}</span><strong>${escapeHTML(current.precipitation)} ${escapeHTML(units.precipitation || "mm")}</strong></p>
                    <p><span>${escapeHTML(t("weatherWind"))}</span><strong>${escapeHTML(current.wind_speed_10m)} ${escapeHTML(units.wind_speed_10m || "km/h")}</strong></p>
                </div>
            `;
        } catch (error) {
            widget.innerHTML = `<p>${escapeHTML(t("weatherUnavailable"))}</p>`;
        }
    }

    function createToast() {
        if (document.getElementById("toast")) return;
        document.body.insertAdjacentHTML("beforeend", `<div id="toast" class="toast" role="status" aria-live="polite"></div>`);
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("is-visible");
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 2200);
    }

    function t(key) {
        return (translations[state.lang] && translations[state.lang][key]) || translations.es[key] || key;
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
