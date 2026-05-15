(function () {
    "use strict";

    const STORAGE_KEYS = {
        cart: "motocrazy_cart_v2",
        oldCart: "carrito",
        theme: "motocrazy_theme",
        lang: "motocrazy_lang",
        auth: "motocrazy_auth_session",
        orders: "motocrazy_orders_v1"
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
            heroLineOne: "VIVE LA PASION",
            heroLineTwo: "SOBRE DOS",
            heroLineThree: "RUEDAS",
            heroText: "Motos, accesorios y datos utiles para salir a rodar con mas seguridad.",
            homeHeroText: "Rendimiento, estilo y seguridad en cada curva.",
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
            orderHistoryTitle: "Historial de pedidos",
            orderHistoryEmpty: "Aun no hay pedidos simulados.",
            orderSummary: "Resumen de compra",
            orderCreated: "Compra simulada y guardada en historial.",
            exchangeLabel: "Valor aproximado en USD",
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
            adminNav: "Admin",
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
            adminError: "No fue posible completar el CRUD. Revisa sesion, RLS y columnas en Supabase.",
            catalogLocal: "Catalogo local listo.",
            catalogSupabase: "Catalogo consultado desde Supabase.",
            catalogSupabaseMotos: "Motos consultadas desde Supabase.",
            catalogSupabaseAccessories: "Accesorios consultados desde Supabase.",
            catalogSupabaseEmpty: "Supabase esta conectado, pero aun no tiene productos. Se muestran datos locales.",
            catalogSupabaseError: "No se pudo leer Supabase. Se muestran datos locales.",
            priceUnavailable: "Consultar",
            fromPrice: "Desde",
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
            authMissingConfig: "Configura Supabase para usar autenticacion.",
            authLogoutSuccess: "Sesion cerrada.",
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
            heroLineOne: "LIVE THE PASSION",
            heroLineTwo: "ON TWO",
            heroLineThree: "WHEELS",
            heroText: "Motorcycles, gear and useful data for safer rides.",
            homeHeroText: "Performance, style and safety in every curve.",
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
            orderHistoryTitle: "Order history",
            orderHistoryEmpty: "No simulated orders yet.",
            orderSummary: "Purchase summary",
            orderCreated: "Demo purchase saved to history.",
            exchangeLabel: "Approximate USD value",
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
            adminNav: "Admin",
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
            adminError: "CRUD could not be completed. Check session, RLS and Supabase columns.",
            catalogLocal: "Local catalog ready.",
            catalogSupabase: "Catalog loaded from Supabase.",
            catalogSupabaseMotos: "Motorcycles loaded from Supabase.",
            catalogSupabaseAccessories: "Accessories loaded from Supabase.",
            catalogSupabaseEmpty: "Supabase is connected, but has no products yet. Local data is shown.",
            catalogSupabaseError: "Supabase could not be read. Local data is shown.",
            priceUnavailable: "Ask price",
            fromPrice: "From",
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
            authMissingConfig: "Configure Supabase to use authentication.",
            authLogoutSuccess: "Signed out.",
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

    const dynamicContentTranslations = {
        en: {
            "casco": "Helmet",
            "guante": "Gloves",
            "bota": "Boots",
            "botas": "Boots",
            "chaqueta": "Jacket",
            "impermeable": "Rain gear",
            "maletero": "Top case",
            "intercomunicador": "Intercom",
            "chaqueta no reflectiva": "Non-reflective jacket",
            "casco hawk evo": "Hawk Evo Helmet",
            "guantes street pro": "Street Pro Gloves",
            "chaqueta rider tech": "Rider Tech Jacket",
            "botas adventure mx": "Adventure MX Boots",
            "impermeable storm rider": "Storm Rider Rain Suit",
            "maletero touring box": "Touring Box Top Case",
            "intercom xtalk": "XTalk Intercom",
            "casco integral con visor ahumado y ventilacion frontal.": "Full-face helmet with a tinted visor and front ventilation.",
            "guantes de proteccion para uso urbano y touring.": "Protective gloves for urban and touring use.",
            "chaqueta impermeable con protecciones certificadas.": "Waterproof jacket with certified protection.",
            "botas resistentes para rutas largas y off-road.": "Durable boots for long routes and off-road riding.",
            "traje impermeable reflectivo para motociclistas.": "Reflective rain suit for motorcyclists.",
            "maletero rigido de alta capacidad para viajes.": "High-capacity rigid top case for trips.",
            "intercomunicador bluetooth para casco.": "Bluetooth helmet intercom.",
            "producto sincronizado desde supabase.": "Product synced from Supabase.",
            "accesorio": "Accessory"
        }
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
        activeBrand: "all",
        activeDisplacement: "all",
        search: "",
        compare: [],
        orders: loadOrders(),
        usdRate: null,
        databaseStatus: "checking",
        sources: {
            motos: "local",
            accesorios: "local"
        },
        accessoriesSource: "local",
        authSession: loadAuthSession(),
        authUser: null
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        captureAuthRedirect();
        createUserMenus();
        createCartDrawer();
        createAuthModal();
        applyTheme();
        applyLanguage();
        bindEvents();
        renderPage();
        renderCart();
        updateAuthUI();
        verifyStoredSession();
        loadWeather();
        loadExchangeRate();
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

            if (action === "open-auth-register") {
                openAuthModal("register");
                return;
            }

            if (action === "open-auth-login") {
                openAuthModal("login");
                return;
            }

            if (action === "open-auth-recover") {
                openAuthModal("recover");
                return;
            }

            if (action === "close-auth-modal") {
                closeAuthModal();
                return;
            }

            if (action === "auth-logout") {
                logoutUser();
                return;
            }

            if (action === "auth-oauth") {
                startOAuth(actionElement.dataset.provider);
                return;
            }

            if (action === "close-cart") {
                toggleCart(false);
                return;
            }

            if (action === "close-detail") {
                closeProductDetail();
                return;
            }

            if (action === "add-to-cart") {
                addToCart(actionElement.dataset.productType, actionElement.dataset.productId);
                return;
            }

            if (action === "show-detail") {
                openProductDetail(actionElement.dataset.productType, actionElement.dataset.productId);
                return;
            }

            if (action === "toggle-compare") {
                toggleCompare(actionElement.dataset.productId);
                return;
            }

            if (action === "clear-compare") {
                state.compare = [];
                renderCompare();
                renderProductCatalog("motos");
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
                checkoutCart();
                return;
            }
        });

        document.addEventListener("submit", function (event) {
            if (event.target && event.target.id === "authForm") {
                event.preventDefault();
                submitAuthForm(event.target);
            }

            if (event.target && event.target.matches("[data-admin-form]")) {
                event.preventDefault();
                event.target.dataset.deleteIntent = event.submitter && event.submitter.dataset.adminDelete === "true" ? "true" : "false";
                saveAdminRecord(event.target);
            }
        });

        document.addEventListener("input", function (event) {
            if (event.target.id === "searchInput") {
                state.search = normalizeText(event.target.value);
                renderProductCatalog(getCurrentCatalogType());
            }
        });

        document.addEventListener("change", function (event) {
            if (event.target.id === "brandFilter") {
                state.activeBrand = event.target.value || "all";
                renderProductCatalog("motos");
                return;
            }

            if (event.target.id === "displacementFilter") {
                state.activeDisplacement = event.target.value || "all";
                renderProductCatalog("motos");
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                toggleCart(false);
                closeAuthModal();
                closeProductDetail();
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
        updateAuthUI();
        updateOpenAuthModal();
        renderCompare();
        renderOrders();
        renderAdminPanel();
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

    function createUserMenus() {
        document.querySelectorAll(".user-menu-container").forEach(function (menu) {
            menu.remove();
        });

        document.querySelectorAll(".header-actions").forEach(function (actions) {
            actions.insertAdjacentHTML("afterbegin", `
                <div class="user-menu-container">
                    <button class="user-icon-btn" type="button" aria-label="Abrir opciones de usuario" aria-haspopup="true">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M20 21a8 8 0 0 0-16 0"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </button>
                    <div class="user-dropdown" role="menu">
                        <p class="dropdown-title" data-auth-label>${escapeHTML(t("authMenuTitle"))}</p>
                        <div class="auth-guest-actions">
                            <button class="btn-primary" type="button" data-action="open-auth-register" data-auth-text="authRegisterButton">${escapeHTML(t("authRegisterButton"))}</button>
                            <button class="btn-primary" type="button" data-action="open-auth-login" data-auth-text="authLoginButton">${escapeHTML(t("authLoginButton"))}</button>
                            <button class="btn-link" type="button" data-action="open-auth-recover" data-auth-text="authRecoverButton">${escapeHTML(t("authRecoverButton"))}</button>
                            <hr>
                            <button class="btn-social" type="button" data-action="auth-oauth" data-provider="google">${socialIcon("google")} <span data-auth-text="authGoogleButton">${escapeHTML(t("authGoogleButton"))}</span></button>
                            <button class="btn-social" type="button" data-action="auth-oauth" data-provider="facebook">${socialIcon("facebook")} <span data-auth-text="authFacebookButton">${escapeHTML(t("authFacebookButton"))}</span></button>
                            <button class="btn-social" type="button" data-action="auth-oauth" data-provider="apple">${socialIcon("apple")} <span data-auth-text="authAppleButton">${escapeHTML(t("authAppleButton"))}</span></button>
                        </div>
                        <div class="auth-user-actions" hidden>
                            <p class="auth-user-email" data-auth-email></p>
                            <button class="btn-secondary" type="button" data-action="auth-logout" data-auth-text="authLogoutButton">${escapeHTML(t("authLogoutButton"))}</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    function socialIcon(provider) {
        const icons = {
            google: `
                <span class="social-icon social-icon--google" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#fbbc05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                        <path fill="#ea4335" d="M12 5.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.37 12 5.37z"/>
                    </svg>
                </span>`,
            facebook: `
                <span class="social-icon social-icon--facebook" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="#1877f2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>
                    </svg>
                </span>`,
            apple: `
                <span class="social-icon social-icon--apple" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="currentColor" d="M16.37 1.43c0 1.14-.42 2.13-1.25 2.96-.91.91-1.95 1.43-3.06 1.34-.13-1.09.39-2.22 1.16-3.02.83-.86 2.2-1.5 3.15-1.28zM20.87 17.35c-.56 1.28-.83 1.86-1.55 2.99-1 1.55-2.41 3.48-4.15 3.5-1.55.02-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1-1.74-.02-3.07-1.76-4.07-3.31-2.79-4.33-3.08-9.41-1.36-12.1 1.22-1.91 3.15-3.03 4.96-3.03 1.84 0 3 1.01 4.52 1.01 1.48 0 2.38-1.01 4.52-1.01 1.61 0 3.32.88 4.54 2.39-3.99 2.19-3.34 7.89.73 9.56z"/>
                    </svg>
                </span>`
        };

        return icons[provider] || "";
    }

    function createAuthModal() {
        if (document.getElementById("authModal")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <div id="authModal" class="auth-modal" aria-hidden="true">
                <div class="auth-modal__backdrop" data-action="close-auth-modal"></div>
                <section class="auth-modal__panel" role="dialog" aria-modal="true" aria-labelledby="authTitle">
                    <button class="icon-button auth-modal__close" type="button" data-action="close-auth-modal" aria-label="${escapeAttribute(t("authCloseLabel"))}">X</button>
                    <h2 id="authTitle">${escapeHTML(t("authRegisterTitle"))}</h2>
                    <p id="authHint" class="auth-modal__hint">${escapeHTML(t("authRegisterHint"))}</p>
                    <form id="authForm" class="auth-form" data-auth-mode="register">
                        <label>
                            <span data-auth-email-label>${escapeHTML(t("authEmailLabel"))}</span>
                            <input id="authEmail" type="email" name="email" autocomplete="email" required>
                        </label>
                        <label id="authPasswordGroup">
                            <span data-auth-password-label>${escapeHTML(t("authPasswordLabel"))}</span>
                            <input id="authPassword" type="password" name="password" autocomplete="current-password" minlength="6">
                        </label>
                        <button id="authSubmit" class="btn-primary" type="submit">${escapeHTML(t("authRegisterSubmit"))}</button>
                        <p id="authMessage" class="auth-message" aria-live="polite"></p>
                    </form>
                </section>
            </div>
        `);
    }

    function openAuthModal(mode) {
        const modal = document.getElementById("authModal");
        const form = document.getElementById("authForm");
        const title = document.getElementById("authTitle");
        const hint = document.getElementById("authHint");
        const submit = document.getElementById("authSubmit");
        const passwordGroup = document.getElementById("authPasswordGroup");
        const password = document.getElementById("authPassword");
        const message = document.getElementById("authMessage");
        if (!modal || !form || !title || !hint || !submit || !passwordGroup || !password) return;

        const copy = {
            register: {
                title: t("authRegisterTitle"),
                hint: t("authRegisterHint"),
                submit: t("authRegisterSubmit")
            },
            login: {
                title: t("authLoginTitle"),
                hint: t("authLoginHint"),
                submit: t("authLoginSubmit")
            },
            recover: {
                title: t("authRecoverTitle"),
                hint: t("authRecoverHint"),
                submit: t("authRecoverSubmit")
            }
        }[mode] || {};

        form.dataset.authMode = mode;
        title.textContent = copy.title;
        hint.textContent = copy.hint;
        submit.textContent = copy.submit;
        passwordGroup.hidden = mode === "recover";
        password.required = mode !== "recover";
        if (message) message.textContent = "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.getElementById("authEmail").focus();
    }

    function updateOpenAuthModal() {
        const modal = document.getElementById("authModal");
        const form = document.getElementById("authForm");
        if (!modal || !form) return;

        const emailLabel = modal.querySelector("[data-auth-email-label]");
        const passwordLabel = modal.querySelector("[data-auth-password-label]");
        const close = modal.querySelector("[data-action='close-auth-modal']");

        if (emailLabel) emailLabel.textContent = t("authEmailLabel");
        if (passwordLabel) passwordLabel.textContent = t("authPasswordLabel");
        if (close) close.setAttribute("aria-label", t("authCloseLabel"));
        if (modal.classList.contains("is-open")) {
            openAuthModal(form.dataset.authMode || "register");
        }
    }

    function closeAuthModal() {
        const modal = document.getElementById("authModal");
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    }

    async function submitAuthForm(form) {
        const mode = form.dataset.authMode || "login";
        const email = String(form.email.value || "").trim();
        const password = String(form.password ? form.password.value : "");
        const submit = document.getElementById("authSubmit");
        const message = document.getElementById("authMessage");
        const originalText = submit ? submit.textContent : "";

        if (!email) return;
        if (mode !== "recover" && password.length < 6) {
            setAuthMessage(t("authPasswordTooShort"), true);
            return;
        }

        if (submit) {
            submit.disabled = true;
            submit.textContent = t("authProcessing");
        }
        setAuthMessage("");

        try {
            if (mode === "register") {
                const data = await requestSupabaseAuth("/auth/v1/signup", {
                    email,
                    password
                });

                if (data.session || data.access_token) {
                    saveAuthSession(data.session || data);
                    await verifyStoredSession();
                    closeAuthModal();
                    showToast(t("authRegisterSuccess"));
                } else {
                    setAuthMessage(t("authRegisterConfirm"), false);
                }
                return;
            }

            if (mode === "login") {
                const data = await requestSupabaseAuth("/auth/v1/token?grant_type=password", {
                    email,
                    password
                });
                saveAuthSession(data);
                await verifyStoredSession();
                closeAuthModal();
                showToast(t("authLoginSuccess"));
                return;
            }

            await requestSupabaseAuth("/auth/v1/recover", {
                email,
                redirect_to: window.location.href.split("#")[0]
            });
            setAuthMessage(t("authRecoverSent"), false);
        } catch (error) {
            setAuthMessage(error.message || t("authGenericError"), true);
        } finally {
            if (submit) {
                submit.disabled = false;
                submit.textContent = originalText;
            }
            if (message && message.textContent) message.hidden = false;
        }
    }

    async function logoutUser() {
        try {
            if (state.authSession && state.authSession.access_token) {
                await requestSupabaseAuth("/auth/v1/logout", {}, {
                    token: state.authSession.access_token
                });
            }
        } catch (error) {
            console.warn("No se pudo cerrar sesion en Supabase:", error);
        }

        clearAuthSession();
        updateAuthUI();
        showToast(t("authLogoutSuccess"));
    }

    function startOAuth(provider) {
        const config = getSupabaseConfig();
        if (!config || !provider) {
            showToast(t("authMissingConfig"));
            return;
        }

        const redirect = encodeURIComponent(window.location.href.split("#")[0]);
        window.location.href = `${config.baseUrl}/auth/v1/authorize?provider=${encodeURIComponent(provider)}&redirect_to=${redirect}`;
    }

    async function verifyStoredSession() {
        if (!state.authSession || !state.authSession.access_token) {
            updateAuthUI();
            return;
        }

        if (state.authSession.expires_at && Date.now() > Number(state.authSession.expires_at) * 1000) {
            clearAuthSession();
            updateAuthUI();
            return;
        }

        try {
            const user = await requestSupabaseAuth("/auth/v1/user", null, {
                method: "GET",
                token: state.authSession.access_token
            });
            state.authUser = user;
        } catch (error) {
            clearAuthSession();
        }

        updateAuthUI();
    }

    function updateAuthUI() {
        const email = state.authUser && state.authUser.email
            ? state.authUser.email
            : state.authSession && state.authSession.user && state.authSession.user.email
                ? state.authSession.user.email
                : "";

        document.querySelectorAll(".user-dropdown").forEach(function (dropdown) {
            const label = dropdown.querySelector("[data-auth-label]");
            const guestActions = dropdown.querySelector(".auth-guest-actions");
            const userActions = dropdown.querySelector(".auth-user-actions");
            const emailNode = dropdown.querySelector("[data-auth-email]");
            const isAuthenticated = Boolean(state.authSession && state.authSession.access_token);

            dropdown.querySelectorAll("[data-auth-text]").forEach(function (node) {
                node.textContent = t(node.dataset.authText);
            });

            if (label) label.textContent = isAuthenticated ? t("authActiveSession") : t("authMenuTitle");
            if (guestActions) guestActions.hidden = isAuthenticated;
            if (userActions) userActions.hidden = !isAuthenticated;
            if (emailNode) emailNode.textContent = email || t("authConnectedUser");
        });
    }

    function captureAuthRedirect() {
        if (!window.location.hash || !window.location.hash.includes("access_token")) return;

        const params = new URLSearchParams(window.location.hash.slice(1));
        if (params.get("access_token")) {
            saveAuthSession({
                access_token: params.get("access_token"),
                refresh_token: params.get("refresh_token"),
                token_type: params.get("token_type") || "bearer",
                expires_in: Number(params.get("expires_in") || 3600)
            });
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    }

    async function requestSupabaseAuth(path, body, options) {
        const config = getSupabaseConfig();
        if (!config) {
            throw new Error(t("authMissingConfig"));
        }

        const settings = options || {};
        const headers = {
            apikey: config.anonKey,
            Accept: "application/json"
        };

        if (settings.token) {
            headers.Authorization = `Bearer ${settings.token}`;
        }

        const fetchOptions = {
            method: settings.method || "POST",
            headers
        };

        if (body !== null) {
            headers["Content-Type"] = "application/json";
            fetchOptions.body = JSON.stringify(body || {});
        }

        const response = await fetch(`${config.baseUrl}${path}`, fetchOptions);
        const data = await response.json().catch(function () {
            return {};
        });

        if (!response.ok) {
            throw new Error(data.msg || data.message || data.error_description || t("authGenericError"));
        }

        return data;
    }

    function getSupabaseConfig() {
        const config = window.MOTO_CRAZY_SUPABASE;
        if (!config || !config.url || !config.anonKey) return null;
        return {
            baseUrl: config.url.replace(/\/$/, ""),
            anonKey: config.anonKey
        };
    }

    function saveAuthSession(session) {
        if (!session || !session.access_token) return;

        const expiresIn = Number(session.expires_in || 3600);
        state.authSession = Object.assign({}, session, {
            expires_at: session.expires_at || Math.floor(Date.now() / 1000) + expiresIn
        });
        writeStorage(STORAGE_KEYS.auth, state.authSession);
    }

    function clearAuthSession() {
        state.authSession = null;
        state.authUser = null;
        writeStorage(STORAGE_KEYS.auth, null);
    }

    function loadAuthSession() {
        const session = readStorage(STORAGE_KEYS.auth, null);
        if (!session || !session.access_token) return null;
        return session;
    }

    function setAuthMessage(message, isError) {
        const node = document.getElementById("authMessage");
        if (!node) return;
        node.textContent = message || "";
        node.classList.toggle("is-error", Boolean(isError));
        node.hidden = !message;
    }

    function renderPage() {
        updateActiveNav();
        updateStatusText();

        if (page === "inicio") {
            renderFeaturedProducts();
            renderOrders();
            return;
        }

        renderFilters(getCurrentCatalogType());
        renderAdvancedFilters(getCurrentCatalogType());
        renderProductCatalog(getCurrentCatalogType());
        renderCompare();
        renderAdminPanel();
    }

    function renderAdminPanel() {
        const panel = document.getElementById("adminPanel");
        if (!panel) return;

        panel.innerHTML = `
            <article class="admin-card">
                <h2>${escapeHTML(t("adminMotoForm"))}</h2>
                <form data-admin-form data-admin-type="motos">
                    <label>ID<input name="id" type="number" min="1" placeholder="Opcional para editar/eliminar"></label>
                    <label>${escapeHTML(t("adminName"))}<input name="nombre" required></label>
                    <label>${escapeHTML(t("adminBrandId"))}<input name="id_marca" type="number" min="1" required></label>
                    <label>${escapeHTML(t("adminCategoryId"))}<input name="id_categoria" type="number" min="1" required></label>
                    <label>${escapeHTML(t("adminImage"))}<input name="imagen_url" type="url"></label>
                    <label>${escapeHTML(t("adminDescription"))}<textarea name="descripcion"></textarea></label>
                    <label>${escapeHTML(t("filterDisplacement"))}<input name="cilindrada" type="number" min="0"></label>
                    <label>${escapeHTML(t("motorLabel"))}<input name="motor"></label>
                    <label>${escapeHTML(t("powerLabel"))}<input name="potencia"></label>
                    <label>${escapeHTML(t("adminPrice"))}<input name="precio" type="number" min="0"></label>
                    <label>${escapeHTML(t("adminStock"))}<input name="stock" type="number" min="0"></label>
                    <button class="btn-primary" type="submit">${escapeHTML(t("adminSave"))}</button>
                    <button class="btn-secondary" type="submit" data-admin-delete="true">${escapeHTML(t("adminDelete"))}</button>
                </form>
            </article>
            <article class="admin-card">
                <h2>${escapeHTML(t("adminAccessoryForm"))}</h2>
                <form data-admin-form data-admin-type="accesorios">
                    <label>ID<input name="id" type="number" min="1" placeholder="Opcional para editar/eliminar"></label>
                    <label>${escapeHTML(t("adminName"))}<input name="nombre" required></label>
                    <label>${escapeHTML(t("adminCategoryId"))}<input name="id_categoria_accesorio" type="number" min="1" required></label>
                    <label>${escapeHTML(t("adminImage"))}<input name="imagen_url" type="url"></label>
                    <label>${escapeHTML(t("adminDescription"))}<textarea name="descripcion"></textarea></label>
                    <button class="btn-primary" type="submit">${escapeHTML(t("adminSave"))}</button>
                    <button class="btn-secondary" type="submit" data-admin-delete="true">${escapeHTML(t("adminDelete"))}</button>
                </form>
            </article>
        `;
    }

    async function saveAdminRecord(form) {
        const type = form.dataset.adminType;
        const table = type === "motos" ? "modelos" : "productos_accesorios";
        const data = Object.fromEntries(new FormData(form).entries());
        const id = data.id;
        const shouldDelete = form.dataset.deleteIntent === "true";
        delete data.id;

        Object.keys(data).forEach(function (key) {
            if (data[key] === "") delete data[key];
            if (["id_marca", "id_categoria", "id_categoria_accesorio", "cilindrada", "stock"].includes(key) && data[key]) {
                data[key] = Number(data[key]);
            }
            if (key === "precio" && data[key]) data[key] = Number(data[key]);
        });

        try {
            await supabaseWrite(table, id, data, shouldDelete);
            showToast(shouldDelete ? t("adminDeleted") : t("adminSaved"));
            form.reset();
            loadSupabaseAccessories();
        } catch (error) {
            console.error(error);
            showToast(t("adminError"));
        }
    }

    async function supabaseWrite(table, id, data, shouldDelete) {
        const config = getSupabaseConfig();
        if (!config || !state.authSession || !state.authSession.access_token) {
            throw new Error("auth");
        }
        if (shouldDelete && !id) throw new Error("missing id");
        const pk = table === "modelos" ? "id_modelo" : "id_producto";
        const url = `${config.baseUrl}/rest/v1/${table}${id ? `?${pk}=eq.${encodeURIComponent(id)}` : ""}`;
        const response = await fetch(url, {
            method: shouldDelete ? "DELETE" : id ? "PATCH" : "POST",
            headers: {
                apikey: config.anonKey,
                Authorization: `Bearer ${state.authSession.access_token}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal"
            },
            body: shouldDelete ? undefined : JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`crud ${response.status}`);
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
                    ${escapeHTML(categoryLabel(category, type))}
                </button>
            `;
        });

        filters.innerHTML = buttons.join("");
    }

    function renderAdvancedFilters(type) {
        const filters = document.getElementById("advancedFilters");
        if (!filters) return;

        if (type !== "motos") {
            filters.innerHTML = "";
            return;
        }

        const brands = unique(state.catalogs.motos.map(function (product) {
            return product.brand;
        })).sort();

        const displacements = unique(state.catalogs.motos.map(function (product) {
            return String(displacementFor(product) || "");
        })).sort(function (a, b) {
            return Number(a) - Number(b);
        });

        filters.innerHTML = `
            <label>
                <span>${escapeHTML(t("filterBrand"))}</span>
                <select id="brandFilter">
                    <option value="all">${escapeHTML(t("allBrands"))}</option>
                    ${brands.map(function (brand) {
                        return `<option value="${escapeAttribute(brand)}" ${brand === state.activeBrand ? "selected" : ""}>${escapeHTML(brand)}</option>`;
                    }).join("")}
                </select>
            </label>
            <label>
                <span>${escapeHTML(t("filterDisplacement"))}</span>
                <select id="displacementFilter">
                    <option value="all">${escapeHTML(t("allDisplacements"))}</option>
                    ${displacements.map(function (cc) {
                        return `<option value="${escapeAttribute(cc)}" ${cc === state.activeDisplacement ? "selected" : ""}>${escapeHTML(cc)} ${escapeHTML(t("ccUnit"))}</option>`;
                    }).join("")}
                </select>
            </label>
        `;
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
            const matchesBrand = type !== "motos" || state.activeBrand === "all" || product.brand === state.activeBrand;
            const matchesDisplacement = type !== "motos" || state.activeDisplacement === "all" || String(displacementFor(product)) === state.activeDisplacement;
            const searchable = normalizeText([
                product.name,
                productNameFor(product),
                product.brand,
                product.categoryName,
                categoryLabel(product.category, type),
                displacementFor(product),
                descriptionFor(product),
                product.price
            ].join(" "));

            return matchesCategory && matchesBrand && matchesDisplacement && (!query || searchable.includes(query));
        });
    }

    function productNameFor(product) {
        return translateDynamicText(product.name);
    }

    function productCard(product) {
        const productName = productNameFor(product);

        return `
            <article class="product-card" data-product="${escapeAttribute(product.id)}">
                <div class="product-card__media">
                    <img src="${escapeAttribute(product.image || FALLBACK_IMAGE)}" alt="${escapeAttribute(productName)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
                </div>
                <div class="product-card__body">
                    <div class="product-card__meta">
                        <span class="badge">${escapeHTML(product.brand || "MotoCrazy")}</span>
                        <span class="badge">${escapeHTML(categoryLabel(product.category, product.type))}</span>
                    </div>
                    <h3>${escapeHTML(productName)}</h3>
                    <p class="product-card__description">${escapeHTML(descriptionFor(product))}</p>
                    <p class="badge">${escapeHTML(t("stock"))}: ${Number(product.stock || 0)}</p>
                </div>
                <div class="product-card__footer">
                    <span class="price">${formatPrice(product)}</span>
                    <button class="button button--secondary product-card__detail" type="button" data-action="show-detail" data-product-type="${escapeAttribute(product.type)}" data-product-id="${escapeAttribute(product.id)}">
                        ${escapeHTML(t("detailButton"))}
                    </button>
                    ${product.type === "motos" ? `
                        <button class="button button--secondary product-card__detail" type="button" data-action="toggle-compare" data-product-id="${escapeAttribute(product.id)}">
                            ${escapeHTML(t("compareButton"))}
                        </button>
                    ` : ""}
                    <button class="product-card__button" type="button" data-action="add-to-cart" data-product-type="${escapeAttribute(product.type)}" data-product-id="${escapeAttribute(product.id)}">
                        ${escapeHTML(t("addToCart"))}
                    </button>
                </div>
            </article>
        `;
    }

    function openProductDetail(type, id) {
        const product = findProduct(type, id);
        if (!product) return;

        const detail = document.getElementById("productDetail") || createProductDetailModal();
        const specs = specsFor(product);
        const name = productNameFor(product);
        const usd = state.usdRate && product.price ? ` / ${formatUsd(Number(product.price) * state.usdRate)}` : "";

        detail.querySelector("[data-detail-title]").textContent = name;
        detail.querySelector("[data-detail-body]").innerHTML = `
            <img src="${escapeAttribute(product.image || FALLBACK_IMAGE)}" alt="${escapeAttribute(name)}">
            <div>
                <p>${escapeHTML(descriptionFor(product))}</p>
                <dl class="detail-specs">
                    <div><dt>${escapeHTML(t("filterBrand"))}</dt><dd>${escapeHTML(product.brand || "MotoCrazy")}</dd></div>
                    <div><dt>${escapeHTML(t("cartTotal"))}</dt><dd>${escapeHTML(formatPrice(product))}${escapeHTML(usd)}</dd></div>
                    <div><dt>${escapeHTML(t("stock"))}</dt><dd>${Number(product.stock || 0)}</dd></div>
                    ${product.type === "motos" ? `
                        <div><dt>${escapeHTML(t("filterDisplacement"))}</dt><dd>${escapeHTML(specs.cilindrada)} ${escapeHTML(t("ccUnit"))}</dd></div>
                        <div><dt>${escapeHTML(t("motorLabel"))}</dt><dd>${escapeHTML(specs.motor)}</dd></div>
                        <div><dt>${escapeHTML(t("powerLabel"))}</dt><dd>${escapeHTML(specs.potencia)}</dd></div>
                    ` : ""}
                </dl>
            </div>
        `;
        detail.classList.add("is-open");
        detail.setAttribute("aria-hidden", "false");
    }

    function createProductDetailModal() {
        document.body.insertAdjacentHTML("beforeend", `
            <div id="productDetail" class="auth-modal product-detail" aria-hidden="true">
                <div class="auth-modal__backdrop" data-action="close-detail"></div>
                <section class="auth-modal__panel product-detail__panel" role="dialog" aria-modal="true">
                    <button class="icon-button auth-modal__close" type="button" data-action="close-detail" aria-label="${escapeAttribute(t("closeCart"))}">X</button>
                    <h2 data-detail-title></h2>
                    <div class="product-detail__body" data-detail-body></div>
                </section>
            </div>
        `);
        return document.getElementById("productDetail");
    }

    function closeProductDetail() {
        const detail = document.getElementById("productDetail");
        if (!detail) return;
        detail.classList.remove("is-open");
        detail.setAttribute("aria-hidden", "true");
    }

    function toggleCompare(id) {
        if (!id) return;
        if (state.compare.includes(id)) {
            state.compare = state.compare.filter(function (item) {
                return item !== id;
            });
        } else {
            state.compare = state.compare.concat(id).slice(-3);
        }
        renderCompare();
        renderProductCatalog("motos");
    }

    function renderCompare() {
        const node = document.getElementById("comparePanel");
        if (!node) return;

        const products = state.compare.map(function (id) {
            return findProduct("motos", id);
        }).filter(Boolean);

        if (!products.length) {
            node.innerHTML = `
                <h2>${escapeHTML(t("compareTitle"))}</h2>
                <p class="empty-state">${escapeHTML(t("compareEmpty"))}</p>
            `;
            return;
        }

        node.innerHTML = `
            <div class="section-heading">
                <h2>${escapeHTML(t("compareTitle"))}</h2>
                <button class="button button--secondary" type="button" data-action="clear-compare">${escapeHTML(t("compareClear"))}</button>
            </div>
            <div class="compare-table-wrap">
                <table class="compare-table">
                    <thead>
                        <tr>${products.map(function (product) {
                            return `<th>${escapeHTML(productNameFor(product))}</th>`;
                        }).join("")}</tr>
                    </thead>
                    <tbody>
                        ${["brand", "cilindrada", "motor", "potencia", "price"].map(function (field) {
                            return `<tr>${products.map(function (product) {
                                const specs = specsFor(product);
                                const value = field === "brand" ? product.brand
                                    : field === "cilindrada" ? `${specs.cilindrada} ${t("ccUnit")}`
                                        : field === "motor" ? specs.motor
                                            : field === "potencia" ? specs.potencia
                                                : formatPrice(product);
                                return `<td><span>${escapeHTML(compareLabel(field))}</span>${escapeHTML(value)}</td>`;
                            }).join("")}</tr>`;
                        }).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    function compareLabel(field) {
        const labels = {
            brand: t("filterBrand"),
            cilindrada: t("filterDisplacement"),
            motor: t("motorLabel"),
            potencia: t("powerLabel"),
            price: t("cartTotal")
        };
        return labels[field] || field;
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
                        <p id="cartExchange" class="cart-exchange"></p>
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
        const exchangeNode = document.getElementById("cartExchange");
        if (exchangeNode) {
            exchangeNode.textContent = state.usdRate && total
                ? `${t("exchangeLabel")}: ${formatUsd(total * state.usdRate)}`
                : "";
        }
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
            const itemName = translateDynamicText(item.name);

            return `
                <li class="cart-item">
                    <img src="${escapeAttribute(item.image || FALLBACK_IMAGE)}" alt="${escapeAttribute(itemName)}" loading="lazy">
                    <div>
                        <h3>${escapeHTML(itemName)}</h3>
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

    async function checkoutCart() {
        if (!state.cart.length) return;

        const total = state.cart.reduce(function (sum, item) {
            return sum + item.price * item.quantity;
        }, 0);
        const order = {
            id: `ORD-${Date.now()}`,
            createdAt: new Date().toISOString(),
            total,
            usdTotal: state.usdRate ? total * state.usdRate : 0,
            status: "simulado",
            items: state.cart.map(function (item) {
                return Object.assign({}, item, {
                    subtotal: item.price * item.quantity
                });
            })
        };

        state.orders = [order].concat(state.orders).slice(0, 12);
        writeStorage(STORAGE_KEYS.orders, state.orders);
        state.cart = [];
        persistCart();
        renderCart();
        renderOrders();
        showToast(t("orderCreated"));
        syncOrderToSupabase(order);
    }

    async function syncOrderToSupabase(order) {
        try {
            const config = getSupabaseConfig();
            const user = state.authUser || (state.authSession && state.authSession.user);
            if (!config || !state.authSession || !state.authSession.access_token || !user || !user.id) return;

            const orderResponse = await fetch(`${config.baseUrl}/rest/v1/pedidos`, {
                method: "POST",
                headers: {
                    apikey: config.anonKey,
                    Authorization: `Bearer ${state.authSession.access_token}`,
                    "Content-Type": "application/json",
                    Prefer: "return=representation"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    email: user.email || "",
                    total: order.total,
                    estado: order.status
                })
            });
            if (!orderResponse.ok) return;
            const rows = await orderResponse.json();
            const saved = Array.isArray(rows) ? rows[0] : null;
            if (!saved || !saved.id_pedido) return;

            await fetch(`${config.baseUrl}/rest/v1/detalle_pedidos`, {
                method: "POST",
                headers: {
                    apikey: config.anonKey,
                    Authorization: `Bearer ${state.authSession.access_token}`,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal"
                },
                body: JSON.stringify(order.items.map(function (item) {
                    return {
                        id_pedido: saved.id_pedido,
                        producto_id: item.id,
                        tipo: item.type,
                        nombre: item.name,
                        precio: item.price,
                        cantidad: item.quantity,
                        subtotal: item.subtotal
                    };
                }))
            });
        } catch (error) {
            console.warn("No se pudo sincronizar el pedido:", error);
        }
    }

    function renderOrders() {
        const node = document.getElementById("orderHistory");
        if (!node) return;

        if (!state.orders.length) {
            node.innerHTML = `<p class="empty-state">${escapeHTML(t("orderHistoryEmpty"))}</p>`;
            return;
        }

        node.innerHTML = state.orders.map(function (order) {
            return `
                <article class="order-card">
                    <h3>${escapeHTML(order.id)}</h3>
                    <p>${escapeHTML(new Date(order.createdAt).toLocaleString(state.lang === "en" ? "en-US" : "es-CO"))}</p>
                    <strong>${escapeHTML(formatMoney(order.total))}${order.usdTotal ? ` / ${escapeHTML(formatUsd(order.usdTotal))}` : ""}</strong>
                    <ul>
                        ${order.items.map(function (item) {
                            return `<li>${escapeHTML(translateDynamicText(item.name))} x ${Number(item.quantity || 0)}</li>`;
                        }).join("")}
                    </ul>
                </article>
            `;
        }).join("");
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
            state.sources.motos = "local";
            state.sources.accesorios = "local";
            state.accessoriesSource = "local";
            updateStatusText();
            return;
        }

        const baseUrl = config.url.replace(/\/$/, "");
        const headers = {
            apikey: config.anonKey,
            Authorization: `Bearer ${config.anonKey}`,
            Accept: "application/json"
        };

        const [motosResult, accesoriosResult] = await Promise.all([
            fetchSupabaseRows(
                `${baseUrl}/rest/v1/modelos?select=*,marcas(nombre),categorias_motos(nombre,descripcion)&order=id_modelo.asc`,
                headers,
                "modelos"
            ),
            fetchSupabaseRows(
                `${baseUrl}/rest/v1/productos_accesorios?select=id_producto,nombre,descripcion,imagen_url,activo,categorias_accesorios(nombre),variantes_accesorios(precio,stock,activo)&order=id_producto.asc`,
                headers,
                "productos_accesorios"
            )
        ]);

        if (motosResult.ok && motosResult.rows.length) {
            state.catalogs.motos = motosResult.rows.map(mapSupabaseMoto);
            state.sources.motos = "supabase";
        } else if (motosResult.ok) {
            state.sources.motos = "local-empty";
        } else {
            state.sources.motos = "local-error";
        }

        if (accesoriosResult.ok && accesoriosResult.rows.length) {
            state.catalogs.accesorios = accesoriosResult.rows
                .filter(function (row) {
                    return row.activo !== false;
                })
                .map(mapSupabaseAccessory);
            state.sources.accesorios = state.catalogs.accesorios.length ? "supabase" : "local-empty";
        } else if (accesoriosResult.ok) {
            state.sources.accesorios = "local-empty";
        } else {
            state.sources.accesorios = "local-error";
        }

        state.accessoriesSource = state.sources.accesorios;
        state.databaseStatus = databaseStatusFromSources();
        updateStatusText();
        renderPage();
    }

    async function fetchSupabaseRows(url, headers, tableName) {
        try {
            const response = await fetch(url, { headers });

            if (!response.ok) {
                throw new Error(`${tableName}: ${response.status}`);
            }

            const rows = await response.json();
            return {
                ok: true,
                rows: Array.isArray(rows) ? rows : []
            };
        } catch (error) {
            console.error("Supabase error:", error);
            return {
                ok: false,
                rows: []
            };
        }
    }

    function databaseStatusFromSources() {
        const sources = Object.values(state.sources);
        if (sources.includes("supabase")) return "supabaseData";
        if (sources.includes("local-error")) return "supabaseError";
        if (sources.includes("local-empty")) return "supabaseEmpty";
        return "localOnly";
    }

    function mapSupabaseMoto(row) {
        const rawCategory = nestedName(row.categorias_motos) || "Moto";
        const localReference = findLocalReference("motos", row.nombre);

        return {
            id: `moto-${row.id_modelo || slugify(row.nombre || "moto")}`,
            type: "motos",
            name: row.nombre || "Moto",
            brand: nestedName(row.marcas) || (localReference && localReference.brand) || "MotoCrazy",
            category: normalizeCategory(rawCategory),
            categoryName: rawCategory,
            price: Number(row.precio || row.price || (localReference && localReference.price) || 0),
            stock: Number(row.stock || 1),
            image: row.imagen_url || (localReference && localReference.image) || FALLBACK_IMAGE,
            cilindrada: Number(row.cilindrada || (localReference && localReference.cilindrada) || 0),
            motor: row.motor || (localReference && localReference.motor) || "",
            potencia: row.potencia || (localReference && localReference.potencia) || "",
            description: {
                es: row.descripcion || `Modelo ${rawCategory} cargado desde Supabase.`,
                en: row.descripcion || `${rawCategory} model loaded from Supabase.`
            }
        };
    }

    function mapSupabaseAccessory(row) {
        const variants = Array.isArray(row.variantes_accesorios) ? row.variantes_accesorios.filter(function (variant) {
            return variant.activo !== false;
        }) : [];

        const prices = variants.map(function (variant) {
            return Number(variant.precio || 0);
        }).filter(function (price) {
            return price > 0;
        });

        const rawCategory = nestedName(row.categorias_accesorios) || "Accesorio";

        return {
            id: `acc-${row.id_producto || slugify(row.nombre || "accesorio")}`,
            type: "accesorios",
            name: row.nombre || "Accesorio",
            brand: "MotoCrazy",
            category: slugify(rawCategory) || "accesorio",
            categoryName: rawCategory,
            price: prices.length ? Math.min.apply(null, prices) : Number(row.precio || 0),
            pricePrefix: prices.length > 1,
            stock: variants.reduce(function (sum, variant) {
                return sum + Number(variant.stock || 0);
            }, Number(row.stock || 0)),
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

        const source = state.sources[page] || state.accessoriesSource || "local";
        const sourceKeys = {
            supabase: page === "motos" ? "catalogSupabaseMotos" : "catalogSupabaseAccessories",
            "local-empty": "catalogSupabaseEmpty",
            "local-error": "catalogSupabaseError",
            local: "catalogLocal"
        };
        const key = sourceKeys[source] || "catalogLocal";
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
        if (typeof product.description === "string") return translateDynamicText(product.description);
        const description = product.description[state.lang] || product.description.es || product.description.en || "";
        return translateDynamicText(description);
    }

    function categoryLabel(category, type) {
        if (categoryKeys[category]) {
            return t(categoryKeys[category]);
        }

        const product = findProductByCategory(type, category);
        if (product && product.categoryName) {
            return translateDynamicText(product.categoryName);
        }

        return titleFromSlug(category);
    }

    function normalizeCategory(value) {
        const normalized = String(value || "").toLowerCase();
        if (normalized.includes("conductor") || normalized.includes("piloto") || normalized.includes("rider")) return "rider";
        if (normalized.includes("naked")) return "naked";
        if (normalized.includes("sport") || normalized.includes("deport")) return "sport";
        if (normalized.includes("tour")) return "touring";
        return slugify(value) || "motorcycle";
    }

    function findProductByCategory(type, category) {
        const products = state.catalogs[type] || [];
        return products.find(function (product) {
            return product.category === category;
        });
    }

    function findLocalReference(type, name) {
        const normalizedName = normalizeText(name);
        return (localProducts[type] || []).find(function (product) {
            return normalizeText(product.name) === normalizedName;
        });
    }

    function nestedName(value) {
        if (!value) return "";
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
            .join(" ") || t("categoryMotorcycle");
    }

    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function displacementFor(product) {
        if (!product) return 0;
        if (product.cilindrada) return Number(product.cilindrada);
        const match = String(product.name || "").match(/(\d{3,4})/);
        return match ? Number(match[1]) : 0;
    }

    function specsFor(product) {
        const cc = displacementFor(product);
        return {
            cilindrada: cc || "-",
            motor: product.motor || (cc ? `${cc} cc` : "N/D"),
            potencia: product.potencia || (cc ? `${Math.max(10, Math.round(cc * 0.08))} hp aprox.` : "N/D")
        };
    }

    function translateDynamicText(value) {
        const text = String(value || "");
        if (state.lang === "es" || !text) return text;

        const dictionary = dynamicContentTranslations[state.lang] || {};
        return dictionary[normalizeText(text)] || text;
    }

    function formatPrice(product) {
        const price = Number(product && product.price ? product.price : 0);
        if (price <= 0) {
            return t("priceUnavailable");
        }

        const money = formatMoney(price);
        return product.pricePrefix ? `${t("fromPrice")} ${money}` : money;
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
            renderCart();
        } catch (error) {
            state.usdRate = null;
        }
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

    function loadOrders() {
        const stored = readStorage(STORAGE_KEYS.orders, []);
        return Array.isArray(stored) ? stored : [];
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
