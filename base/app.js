(function () {
    "use strict";

    const STORAGE_KEYS = {
        cart: "motocrazy_cart_v2",
        oldCart: "carrito",
        theme: "motocrazy_theme",
        lang: "motocrazy_lang"
    };

    const FALLBACK_IMAGE = "CSS/img_1.jpg";
    const page = document.body.dataset.page || "inicio";

    const translations = {
        es: {
            navHome: "Inicio",
            navMotos: "Motos",
            navAccessories: "Accesorios",
            themeToLight: "Claro",
            themeToDark: "Oscuro",
            cartButton: "Carrito",
            heroEyebrow: "Tienda para ruta urbana y aventura",
            heroTitle: "MotoCrazy MC",
            heroText: "Motos, accesorios y datos utiles para salir a rodar con mas seguridad.",
            seeMotos: "Ver motos",
            seeAccessories: "Ver accesorios",
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
            dbSupabaseData: "Supabase activo: productos cargados desde la base de datos.",
            dbSupabaseEmpty: "Supabase conectado sin registros: catalogo local activo.",
            dbSupabaseError: "Supabase no respondio: catalogo local activo.",
            dbLocalOnly: "Catalogo local activo. Configura Supabase para sincronizar productos.",
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
            categoryNaked: "Naked",
            categorySport: "Deportivas",
            categoryTouring: "Touring",
            categoryRider: "Conductor",
            categoryMotorcycle: "Moto",
            addToCart: "Agregar",
            stock: "Stock",
            noResults: "No hay productos que coincidan con la busqueda.",
            cartTitle: "Carrito",
            closeCart: "Cerrar",
            remove: "Eliminar",
            clearCart: "Vaciar carrito",
            checkout: "Finalizar compra",
            cartEmpty: "Tu carrito esta vacio.",
            cartTotal: "Total",
            itemAdded: "Producto agregado al carrito.",
            itemRemoved: "Producto eliminado.",
            cartCleared: "Carrito vaciado.",
            checkoutMessage: "Compra simulada lista. Total guardado en el carrito.",
            catalogLocal: "Catalogo local listo.",
            catalogSupabase: "Accesorios consultados desde Supabase.",
            catalogSupabaseEmpty: "Supabase esta conectado, pero aun no tiene productos. Se muestran datos locales.",
            catalogSupabaseError: "No se pudo leer Supabase. Se muestran datos locales.",
            footerText: "MotoCrazy MC - Proyecto web con HTML, CSS, JavaScript, Supabase y API gratuita."
        },
        en: {
            navHome: "Home",
            navMotos: "Motorcycles",
            navAccessories: "Accessories",
            themeToLight: "Light",
            themeToDark: "Dark",
            cartButton: "Cart",
            heroEyebrow: "Urban and adventure riding store",
            heroTitle: "MotoCrazy MC",
            heroText: "Motorcycles, gear and useful data for safer rides.",
            seeMotos: "See bikes",
            seeAccessories: "See gear",
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
            databaseTitle: "Sync-ready catalog",
            databaseChecking: "Checking Supabase connection...",
            dbSupabaseData: "Supabase active: products loaded from the database.",
            dbSupabaseEmpty: "Supabase connected with no records: local catalog active.",
            dbSupabaseError: "Supabase did not respond: local catalog active.",
            dbLocalOnly: "Local catalog active. Configure Supabase to sync products.",
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
            categoryNaked: "Naked",
            categorySport: "Sport",
            categoryTouring: "Touring",
            categoryRider: "Rider",
            categoryMotorcycle: "Bike",
            addToCart: "Add",
            stock: "Stock",
            noResults: "No products match your search.",
            cartTitle: "Cart",
            closeCart: "Close",
            remove: "Remove",
            clearCart: "Clear cart",
            checkout: "Checkout",
            cartEmpty: "Your cart is empty.",
            cartTotal: "Total",
            itemAdded: "Product added to cart.",
            itemRemoved: "Product removed.",
            cartCleared: "Cart cleared.",
            checkoutMessage: "Demo checkout ready. Total saved in the cart.",
            catalogLocal: "Local catalog ready.",
            catalogSupabase: "Accessories loaded from Supabase.",
            catalogSupabaseEmpty: "Supabase is connected, but has no products yet. Local data is shown.",
            catalogSupabaseError: "Supabase could not be read. Local data is shown.",
            footerText: "MotoCrazy MC - Web project with HTML, CSS, JavaScript, Supabase and a free API."
        }
    };

    const categoryKeys = {
        all: "all",
        naked: "categoryNaked",
        sport: "categorySport",
        touring: "categoryTouring",
        rider: "categoryRider",
        motorcycle: "categoryMotorcycle"
    };

    const localProducts = {
        motos: [
            {
                id: "pulsar-ns125",
                type: "motos",
                name: "Pulsar NS125",
                brand: "Bajaj",
                category: "naked",
                price: 8799000,
                stock: 9,
                image: "imgs/Motocicletas/Pulsar/PULSAR NS125.webp",
                description: {
                    es: "Naked liviana para ciudad, bajo consumo y manejo agil.",
                    en: "Light naked bike for the city, efficient and easy to handle."
                }
            },
            {
                id: "pulsar-ns160",
                type: "motos",
                name: "Pulsar NS160",
                brand: "Bajaj",
                category: "naked",
                price: 11199000,
                stock: 7,
                image: "imgs/Motocicletas/Pulsar/PULSAR NS160.webp",
                description: {
                    es: "Respuesta equilibrada para uso diario y salidas cortas.",
                    en: "Balanced response for daily use and short rides."
                }
            },
            {
                id: "pulsar-ns200",
                type: "motos",
                name: "Pulsar NS200",
                brand: "Bajaj",
                category: "naked",
                price: 13199000,
                stock: 6,
                image: "imgs/Motocicletas/Pulsar/PULSAR NS200.webp",
                description: {
                    es: "Potencia deportiva en formato naked y precio competitivo.",
                    en: "Sporty power in a naked format with a competitive price."
                }
            },
            {
                id: "pulsar-n250",
                type: "motos",
                name: "Pulsar N250",
                brand: "Bajaj",
                category: "naked",
                price: 13799000,
                stock: 5,
                image: "imgs/Motocicletas/Pulsar/PULSAR N250.png",
                description: {
                    es: "Motor con buen torque y posicion comoda para viajar.",
                    en: "Torquey engine and comfortable riding position for travel."
                }
            },
            {
                id: "pulsar-rs200",
                type: "motos",
                name: "Pulsar RS200",
                brand: "Bajaj",
                category: "sport",
                price: 15999000,
                stock: 4,
                image: "imgs/Motocicletas/Pulsar/PULSAR RS200.webp",
                description: {
                    es: "Carenada, rapida y lista para rutas de fin de semana.",
                    en: "Faired, quick and ready for weekend routes."
                }
            },
            {
                id: "pulsar-ns400z",
                type: "motos",
                name: "Pulsar NS400Z",
                brand: "Bajaj",
                category: "sport",
                price: 18299000,
                stock: 3,
                image: "imgs/Motocicletas/Pulsar/PULSAR NS400Z.webp",
                description: {
                    es: "Mayor cilindrada para quienes quieren subir de nivel.",
                    en: "Higher displacement for riders ready to step up."
                }
            },
            {
                id: "bmw-g310r",
                type: "motos",
                name: "BMW G310R",
                brand: "BMW",
                category: "naked",
                price: 30990000,
                stock: 4,
                image: "imgs/Motocicletas/BMW/BMW310.png",
                description: {
                    es: "Naked premium compacta con acabados BMW.",
                    en: "Compact premium naked bike with BMW finishing."
                }
            },
            {
                id: "bmw-f800r",
                type: "motos",
                name: "BMW F800R",
                brand: "BMW",
                category: "naked",
                price: 45990000,
                stock: 2,
                image: "imgs/Motocicletas/BMW/F800R.png",
                description: {
                    es: "Bicilindrica versatil con respuesta firme en carretera.",
                    en: "Versatile twin-cylinder bike with confident road response."
                }
            },
            {
                id: "bmw-f900r",
                type: "motos",
                name: "BMW F900R",
                brand: "BMW",
                category: "naked",
                price: 51990000,
                stock: 2,
                image: "imgs/Motocicletas/BMW/BMWF900R.png",
                description: {
                    es: "Tecnologia moderna y postura agresiva para ciudad y ruta.",
                    en: "Modern tech and aggressive stance for city and road."
                }
            },
            {
                id: "bmw-s1000r",
                type: "motos",
                name: "BMW S1000R",
                brand: "BMW",
                category: "sport",
                price: 94990000,
                stock: 1,
                image: "imgs/Motocicletas/BMW/S1000R.png",
                description: {
                    es: "Alto rendimiento, electronica avanzada y ADN de pista.",
                    en: "High performance, advanced electronics and track DNA."
                }
            },
            {
                id: "bmw-r1250r",
                type: "motos",
                name: "BMW R 1250R",
                brand: "BMW",
                category: "touring",
                price: 89990000,
                stock: 1,
                image: "imgs/Motocicletas/BMW/R1250.png",
                description: {
                    es: "Torque abundante y comodidad para trayectos largos.",
                    en: "Strong torque and comfort for long-distance riding."
                }
            }
        ],
        accesorios: [
            {
                id: "casco-integral-agv",
                type: "accesorios",
                name: "Casco integral AGV",
                brand: "AGV",
                category: "rider",
                price: 1200000,
                stock: 12,
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Motorcycle_helmet.png",
                description: {
                    es: "Proteccion integral con visor amplio y ajuste seguro.",
                    en: "Full-face protection with a wide visor and secure fit."
                }
            },
            {
                id: "guantes-racing",
                type: "accesorios",
                name: "Guantes racing",
                brand: "Rider Pro",
                category: "rider",
                price: 250000,
                stock: 18,
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Metal_Motorcycle_Gloves.jpg",
                description: {
                    es: "Agarre firme, refuerzo en nudillos y palma ventilada.",
                    en: "Firm grip, knuckle reinforcement and ventilated palm."
                }
            },
            {
                id: "botas-touring",
                type: "accesorios",
                name: "Botas touring",
                brand: "Alpinestars",
                category: "rider",
                price: 600000,
                stock: 8,
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alpinestars_S-MX_Motorcycle_boots.jpg",
                description: {
                    es: "Soporte para tobillo y suela firme para rutas largas.",
                    en: "Ankle support and firm sole for long rides."
                }
            },
            {
                id: "sliders-proteccion",
                type: "accesorios",
                name: "Sliders de proteccion",
                brand: "MotoCrazy",
                category: "motorcycle",
                price: 220000,
                stock: 16,
                image: "imgs/Motocicletas/BMW/F800R.png",
                description: {
                    es: "Ayudan a proteger laterales y motor en caidas leves.",
                    en: "Help protect side panels and engine in light falls."
                }
            },
            {
                id: "escape-deportivo",
                type: "accesorios",
                name: "Escape deportivo",
                brand: "Akra",
                category: "motorcycle",
                price: 1800000,
                stock: 5,
                image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_Multistrada_1200S_dual_low-profile_exhaust.jpg",
                description: {
                    es: "Mejora sonido, estilo y respuesta del motor.",
                    en: "Improves sound, style and engine response."
                }
            },
            {
                id: "espejos-aluminio",
                type: "accesorios",
                name: "Espejos de aluminio",
                brand: "MotoCrazy",
                category: "motorcycle",
                price: 180000,
                stock: 20,
                image: "imgs/Motocicletas/Pulsar/PULSAR N250.png",
                description: {
                    es: "Par de espejos resistentes con acabado deportivo.",
                    en: "Durable mirror pair with a sporty finish."
                }
            }
        ]
    };

    const state = {
        lang: readStorage(STORAGE_KEYS.lang, "es"),
        theme: readStorage(STORAGE_KEYS.theme, "dark"),
        cart: loadCart(),
        catalogs: {
            motos: localProducts.motos.slice(),
            accesorios: localProducts.accesorios.slice()
        },
        activeCategory: "all",
        search: "",
        databaseStatus: "checking",
        accessoriesSource: "local"
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        createCartDrawer();
        applyTheme();
        applyLanguage();
        bindEvents();
        renderPage();
        renderCart();
        loadWeather();
        loadSupabaseAccessories();
    }

    function bindEvents() {
        document.addEventListener("click", function (event) {
            const filter = event.target.closest("[data-category]");
            if (filter) {
                state.activeCategory = filter.dataset.category || "all";
                renderPage();
                return;
            }

            const actionElement = event.target.closest("[data-action]");
            if (!actionElement) return;

            const action = actionElement.dataset.action;

            if (action === "toggle-theme") {
                state.theme = state.theme === "dark" ? "light" : "dark";
                writeStorage(STORAGE_KEYS.theme, state.theme);
                applyTheme();
                return;
            }

            if (action === "toggle-lang") {
                state.lang = state.lang === "es" ? "en" : "es";
                writeStorage(STORAGE_KEYS.lang, state.lang);
                applyLanguage();
                renderPage();
                renderCart();
                loadWeather();
                return;
            }

            if (action === "toggle-cart") {
                toggleCart(true);
                return;
            }

            if (action === "close-cart") {
                toggleCart(false);
                return;
            }

            if (action === "add-to-cart") {
                addToCart(actionElement.dataset.productType, actionElement.dataset.productId);
                return;
            }

            if (action === "increase") {
                changeQuantity(actionElement.dataset.cartId, 1);
                return;
            }

            if (action === "decrease") {
                changeQuantity(actionElement.dataset.cartId, -1);
                return;
            }

            if (action === "remove") {
                removeFromCart(actionElement.dataset.cartId);
                return;
            }

            if (action === "clear-cart") {
                clearCart();
                return;
            }

            if (action === "checkout") {
                showToast(t("checkoutMessage"));
            }
        });

        document.addEventListener("input", function (event) {
            if (event.target.id === "searchInput") {
                state.search = event.target.value.trim().toLowerCase();
                renderProductCatalog(getCurrentCatalogType());
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                toggleCart(false);
            }
        });

        document.addEventListener("error", function (event) {
            if (event.target && event.target.tagName === "IMG" && !event.target.dataset.fallback) {
                event.target.dataset.fallback = "true";
                event.target.src = FALLBACK_IMAGE;
            }
        }, true);
    }

    function applyTheme() {
        document.documentElement.dataset.theme = state.theme;
        updateControlLabels();
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

        updateControlLabels();
        updateActiveNav();
        updateStatusText();
    }

    function updateControlLabels() {
        const themeButton = document.querySelector("[data-action='toggle-theme']");
        if (themeButton) {
            themeButton.textContent = state.theme === "dark" ? t("themeToLight") : t("themeToDark");
            themeButton.setAttribute("aria-label", themeButton.textContent);
        }

        const langButton = document.querySelector("[data-action='toggle-lang']");
        if (langButton) {
            langButton.textContent = state.lang === "es" ? "EN" : "ES";
            langButton.setAttribute("aria-label", state.lang === "es" ? "Cambiar a ingles" : "Switch to Spanish");
        }
    }

    function updateActiveNav() {
        document.querySelectorAll("[data-nav]").forEach(function (link) {
            link.classList.toggle("is-active", link.dataset.nav === page);
        });
    }

    function renderPage() {
        updateActiveNav();
        updateStatusText();

        if (page === "inicio") {
            renderFeaturedProducts();
            return;
        }

        renderFilters(getCurrentCatalogType());
        renderProductCatalog(getCurrentCatalogType());
    }

    function getCurrentCatalogType() {
        if (page === "motos") return "motos";
        if (page === "accesorios") return "accesorios";
        return "";
    }

    function renderFeaturedProducts() {
        const grid = document.getElementById("featuredGrid");
        if (!grid) return;

        const products = [
            ...state.catalogs.motos.slice(0, 3),
            ...state.catalogs.accesorios.slice(0, 3)
        ];

        grid.innerHTML = products.map(productCard).join("");
    }

    function renderFilters(type) {
        const filters = document.getElementById("categoryFilters");
        if (!filters || !type) return;

        const categories = unique(state.catalogs[type].map(function (product) {
            return product.category;
        }));

        if (state.activeCategory !== "all" && !categories.includes(state.activeCategory)) {
            state.activeCategory = "all";
        }

        const buttons = ["all"].concat(categories).map(function (category) {
            return `
                <button type="button" data-category="${escapeAttribute(category)}" class="${category === state.activeCategory ? "is-active" : ""}">
                    ${escapeHTML(categoryLabel(category))}
                </button>
            `;
        });

        filters.innerHTML = buttons.join("");
    }

    function renderProductCatalog(type) {
        const grid = document.getElementById("productGrid");
        if (!grid || !type) return;

        const products = filteredProducts(type);

        if (!products.length) {
            grid.innerHTML = `<p class="empty-state">${escapeHTML(t("noResults"))}</p>`;
            return;
        }

        grid.innerHTML = products.map(productCard).join("");
    }

    function filteredProducts(type) {
        const query = state.search;
        return state.catalogs[type].filter(function (product) {
            const matchesCategory = state.activeCategory === "all" || product.category === state.activeCategory;
            const searchable = [
                product.name,
                product.brand,
                categoryLabel(product.category),
                descriptionFor(product)
            ].join(" ").toLowerCase();

            return matchesCategory && (!query || searchable.includes(query));
        });
    }

    function productCard(product) {
        return `
            <article class="product-card" data-product="${escapeAttribute(product.id)}">
                <div class="product-card__media">
                    <img src="${escapeAttribute(product.image || FALLBACK_IMAGE)}" alt="${escapeAttribute(product.name)}" loading="lazy">
                </div>
                <div class="product-card__body">
                    <div class="product-card__meta">
                        <span class="badge">${escapeHTML(product.brand || "MotoCrazy")}</span>
                        <span class="badge">${escapeHTML(categoryLabel(product.category))}</span>
                    </div>
                    <h3>${escapeHTML(product.name)}</h3>
                    <p class="product-card__description">${escapeHTML(descriptionFor(product))}</p>
                    <p class="badge">${escapeHTML(t("stock"))}: ${Number(product.stock || 0)}</p>
                </div>
                <div class="product-card__footer">
                    <span class="price">${formatMoney(product.price)}</span>
                    <button class="product-card__button" type="button" data-action="add-to-cart" data-product-type="${escapeAttribute(product.type)}" data-product-id="${escapeAttribute(product.id)}">
                        ${escapeHTML(t("addToCart"))}
                    </button>
                </div>
            </article>
        `;
    }

    function createCartDrawer() {
        if (!document.getElementById("cartDrawer")) {
            document.body.insertAdjacentHTML("beforeend", `
                <div id="cartOverlay" class="cart-overlay" data-action="close-cart"></div>
                <aside id="cartDrawer" class="cart-drawer" aria-hidden="true" aria-labelledby="cartTitle">
                    <header class="cart-drawer__header">
                        <h2 id="cartTitle">${escapeHTML(t("cartTitle"))}</h2>
                        <button class="icon-button" type="button" data-action="close-cart" aria-label="${escapeAttribute(t("closeCart"))}">X</button>
                    </header>
                    <ul id="cartList" class="cart-list"></ul>
                    <footer class="cart-drawer__footer">
                        <div class="cart-total-row">
                            <span>${escapeHTML(t("cartTotal"))}</span>
                            <strong id="cartTotal">${formatMoney(0)}</strong>
                        </div>
                        <button class="checkout-button" type="button" data-action="checkout">${escapeHTML(t("checkout"))}</button>
                        <button class="button button--secondary" type="button" data-action="clear-cart">${escapeHTML(t("clearCart"))}</button>
                    </footer>
                </aside>
                <div id="toast" class="toast" aria-live="polite"></div>
            `);
        }
    }

    function renderCart() {
        const countNode = document.getElementById("cartCount");
        const list = document.getElementById("cartList");
        const totalNode = document.getElementById("cartTotal");
        const title = document.getElementById("cartTitle");
        const checkout = document.querySelector("[data-action='checkout']");
        const clear = document.querySelector("[data-action='clear-cart']");
        const close = document.querySelector("[data-action='close-cart'].icon-button");

        const itemCount = state.cart.reduce(function (sum, item) {
            return sum + item.quantity;
        }, 0);

        const total = state.cart.reduce(function (sum, item) {
            return sum + item.price * item.quantity;
        }, 0);

        if (countNode) countNode.textContent = String(itemCount);
        if (totalNode) totalNode.textContent = formatMoney(total);
        if (title) title.textContent = t("cartTitle");
        if (checkout) checkout.textContent = t("checkout");
        if (clear) clear.textContent = t("clearCart");
        if (close) close.setAttribute("aria-label", t("closeCart"));

        if (!list) return;

        if (!state.cart.length) {
            list.innerHTML = `<li class="empty-state">${escapeHTML(t("cartEmpty"))}</li>`;
            return;
        }

        list.innerHTML = state.cart.map(function (item) {
            return `
                <li class="cart-item">
                    <img src="${escapeAttribute(item.image || FALLBACK_IMAGE)}" alt="${escapeAttribute(item.name)}" loading="lazy">
                    <div>
                        <h3>${escapeHTML(item.name)}</h3>
                        <p>${formatMoney(item.price)} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item__controls">
                        <button class="qty-button" type="button" data-action="decrease" data-cart-id="${escapeAttribute(item.id)}" aria-label="-">-</button>
                        <strong>${item.quantity}</strong>
                        <button class="qty-button" type="button" data-action="increase" data-cart-id="${escapeAttribute(item.id)}" aria-label="+">+</button>
                        <button class="icon-button" type="button" data-action="remove" data-cart-id="${escapeAttribute(item.id)}" aria-label="${escapeAttribute(t("remove"))}">X</button>
                    </div>
                </li>
            `;
        }).join("");
    }

    function addToCart(type, id) {
        const product = findProduct(type, id);
        if (!product) return;

        const existing = state.cart.find(function (item) {
            return item.id === product.id;
        });

        if (existing) {
            existing.quantity += 1;
        } else {
            state.cart.push({
                id: product.id,
                type: product.type,
                name: product.name,
                price: Number(product.price) || 0,
                image: product.image || FALLBACK_IMAGE,
                quantity: 1
            });
        }

        persistCart();
        renderCart();
        showToast(t("itemAdded"));
    }

    function changeQuantity(id, amount) {
        const item = state.cart.find(function (cartItem) {
            return cartItem.id === id;
        });

        if (!item) return;
        item.quantity += amount;

        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }

        persistCart();
        renderCart();
    }

    function removeFromCart(id) {
        state.cart = state.cart.filter(function (item) {
            return item.id !== id;
        });
        persistCart();
        renderCart();
        showToast(t("itemRemoved"));
    }

    function clearCart() {
        if (!state.cart.length) return;
        state.cart = [];
        persistCart();
        renderCart();
        showToast(t("cartCleared"));
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

    async function loadSupabaseAccessories() {
        const config = window.MOTO_CRAZY_SUPABASE;
        if (!config || !config.url || !config.anonKey) {
            state.databaseStatus = "localOnly";
            updateStatusText();
            return;
        }

        try {
            const table = config.tables && config.tables.accessories ? config.tables.accessories : "productos_accesorios";
            const endpoint = `${config.url.replace(/\/$/, "")}/rest/v1/${table}?select=id_producto,nombre,descripcion,imagen_url,categorias_accesorios(nombre),variantes_accesorios(precio,stock)&order=id_producto.asc`;
            const response = await fetch(endpoint, {
                headers: {
                    apikey: config.anonKey,
                    Authorization: `Bearer ${config.anonKey}`
                }
            });

            if (!response.ok) {
                throw new Error(`Supabase ${response.status}`);
            }

            const rows = await response.json();

            if (Array.isArray(rows) && rows.length) {
                state.catalogs.accesorios = rows.map(mapSupabaseAccessory);
                state.databaseStatus = "supabaseData";
                state.accessoriesSource = "supabase";
            } else {
                state.databaseStatus = "supabaseEmpty";
                state.accessoriesSource = "local-empty";
            }
        } catch (error) {
            console.warn("No se pudo leer Supabase:", error);
            state.databaseStatus = "supabaseError";
            state.accessoriesSource = "local-error";
        }

        updateStatusText();

        if (page === "inicio") {
            renderFeaturedProducts();
        }

        if (page === "accesorios") {
            renderFilters("accesorios");
            renderProductCatalog("accesorios");
        }
    }

    function mapSupabaseAccessory(row) {
        const variant = Array.isArray(row.variantes_accesorios) ? row.variantes_accesorios[0] : null;
        const rawCategory = row.categorias_accesorios && row.categorias_accesorios.nombre ? row.categorias_accesorios.nombre : "Moto";

        return {
            id: `supabase-${row.id_producto}`,
            type: "accesorios",
            name: row.nombre || "Accesorio",
            brand: "MotoCrazy",
            category: normalizeCategory(rawCategory),
            price: Number(variant && variant.precio ? variant.precio : 0),
            stock: Number(variant && variant.stock ? variant.stock : 0),
            image: row.imagen_url || FALLBACK_IMAGE,
            description: {
                es: row.descripcion || "Producto sincronizado desde Supabase.",
                en: row.descripcion || "Product synced from Supabase."
            }
        };
    }

    async function loadWeather() {
        const widget = document.getElementById("weatherWidget");
        if (!widget) return;

        widget.innerHTML = `<p>${escapeHTML(t("weatherLoading"))}</p>`;

        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=4.7110&longitude=-74.0721&current=temperature_2m,precipitation,wind_speed_10m&timezone=America%2FBogota";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Weather ${response.status}`);
            }

            const data = await response.json();
            const current = data.current;
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
            console.warn("No se pudo consultar Open-Meteo:", error);
            widget.innerHTML = `<p>${escapeHTML(t("weatherUnavailable"))}</p>`;
        }
    }

    function updateStatusText() {
        const databaseNode = document.getElementById("databaseStatus");
        if (databaseNode) {
            const key = {
                checking: "databaseChecking",
                supabaseData: "dbSupabaseData",
                supabaseEmpty: "dbSupabaseEmpty",
                supabaseError: "dbSupabaseError",
                localOnly: "dbLocalOnly"
            }[state.databaseStatus] || "databaseChecking";
            databaseNode.textContent = t(key);
        }

        const catalogStatus = document.getElementById("catalogStatus");
        if (!catalogStatus) return;

        if (page === "motos") {
            catalogStatus.textContent = t("catalogLocal");
            return;
        }

        const key = {
            supabase: "catalogSupabase",
            "local-empty": "catalogSupabaseEmpty",
            "local-error": "catalogSupabaseError",
            local: "catalogLocal"
        }[state.accessoriesSource] || "catalogLocal";
        catalogStatus.textContent = t(key);
    }

    function findProduct(type, id) {
        const catalog = state.catalogs[type] || [];
        return catalog.find(function (product) {
            return product.id === id;
        });
    }

    function descriptionFor(product) {
        if (!product.description) return "";
        if (typeof product.description === "string") return product.description;
        return product.description[state.lang] || product.description.es || product.description.en || "";
    }

    function categoryLabel(category) {
        return t(categoryKeys[category] || categoryKeys.motorcycle);
    }

    function normalizeCategory(value) {
        const normalized = String(value || "").toLowerCase();
        if (normalized.includes("conductor") || normalized.includes("piloto") || normalized.includes("rider")) return "rider";
        if (normalized.includes("naked")) return "naked";
        if (normalized.includes("sport") || normalized.includes("deport")) return "sport";
        if (normalized.includes("tour")) return "touring";
        return "motorcycle";
    }

    function formatMoney(value) {
        return new Intl.NumberFormat(state.lang === "en" ? "en-US" : "es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }).format(Number(value) || 0);
    }

    function loadCart() {
        const stored = readStorage(STORAGE_KEYS.cart, null) || readStorage(STORAGE_KEYS.oldCart, []);
        if (!Array.isArray(stored)) return [];

        return stored.map(function (item) {
            return {
                id: item.id || slugify(item.nombre || item.name || "producto"),
                type: item.type || "accesorios",
                name: item.name || item.nombre || "Producto",
                price: Number(item.price || item.precio || 0),
                image: item.image || item.img || FALLBACK_IMAGE,
                quantity: Math.max(1, Number(item.quantity || 1))
            };
        }).filter(function (item) {
            return item.id && item.name;
        });
    }

    function persistCart() {
        writeStorage(STORAGE_KEYS.cart, state.cart);
    }

    function readStorage(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch (error) {
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn("No se pudo guardar en localStorage:", error);
        }
    }

    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("is-visible");
        window.clearTimeout(showToast.timer);
        showToast.timer = window.setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 1800);
    }

    function t(key) {
        return (translations[state.lang] && translations[state.lang][key]) || translations.es[key] || key;
    }

    function unique(values) {
        return Array.from(new Set(values.filter(Boolean)));
    }

    function slugify(value) {
        return String(value)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
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
