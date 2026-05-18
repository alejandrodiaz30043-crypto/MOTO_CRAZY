(function () {
    "use strict";

    const App = window.MotoCrazy;
    let loadPromise = null;
    let accessoryPageBound = false;

    App.accesorios = {
        load: loadAccessories,
        render: renderAccessoriesPage
    };

    App.onReady(initAccessories);

    async function initAccessories() {
        if (["inicio", "accesorios", "admin"].includes(App.state.page)) {
            await loadAccessories();
        }

        if (App.state.page === "accesorios") {
            bindAccessoriesPage();
            renderAccessoriesPage();
            App.onLanguageChange(renderAccessoriesPage);
        }
    }

    async function loadAccessories(force) {
        if (loadPromise && !force) return loadPromise;

        loadPromise = (async function () {
            const client = App.requireClient();
            if (!client) {
                App.state.catalogs.accesorios = [];
                App.setCatalogStatus("accesorios", "error");
                return [];
            }

            App.setCatalogStatus("accesorios", "loading");

            try {
                const result = await client
                    .from("productos_accesorios")
                    .select("id_producto,nombre,descripcion,imagen_url,activo,id_categoria_accesorio,created_at,categorias_accesorios(nombre,imagen_url),variantes_accesorios(id_variante,id_producto,id_genero_accesorio,id_talla_accesorio,precio,stock,activo,created_at)")
                    .eq("activo", true)
                    .order("id_producto", { ascending: true });

                if (result.error) throw result.error;

                const rows = Array.isArray(result.data) ? result.data : [];
                App.state.catalogs.accesorios = rows.map(mapAccessory);
                App.setCatalogStatus("accesorios", rows.length ? "loaded" : "empty");
                return App.state.catalogs.accesorios;
            } catch (error) {
                console.error("Error cargando accesorios desde Supabase:", error);
                App.state.catalogs.accesorios = [];
                App.setCatalogStatus("accesorios", "error");
                return [];
            } finally {
                renderAccessoriesPage();
            }
        })();

        return loadPromise;
    }

    function mapAccessory(row) {
        const categoryName = App.nestedName(row.categorias_accesorios) || "Accesorio";
        const variants = Array.isArray(row.variantes_accesorios)
            ? row.variantes_accesorios.filter(function (variant) {
                return variant.activo !== false;
            }).map(function (variant) {
                return {
                    id_variante: variant.id_variante,
                    id_genero_accesorio: variant.id_genero_accesorio,
                    id_talla_accesorio: variant.id_talla_accesorio,
                    price: Number(variant.precio || 0),
                    stock: Number(variant.stock || 0)
                };
            })
            : [];
        const prices = variants.map(function (variant) {
            return Number(variant.price || 0);
        }).filter(function (price) {
            return price > 0;
        });

        return {
            id: String(row.id_producto),
            productId: String(row.id_producto),
            type: "accesorio",
            catalogType: "accesorios",
            name: row.nombre || "Accesorio",
            brand: "MotoCrazy",
            category: App.normalizeCategory(categoryName),
            categoryName,
            price: prices.length ? Math.min.apply(null, prices) : null,
            pricePrefix: prices.length > 1,
            stock: variants.reduce(function (sum, variant) {
                return sum + Number(variant.stock || 0);
            }, 0),
            image: row.imagen_url || App.config.fallbackImage,
            description: row.descripcion || "",
            variants
        };
    }

    function bindAccessoriesPage() {
        if (accessoryPageBound) return;
        accessoryPageBound = true;

        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                App.state.filters.accesorios.query = searchInput.value;
                renderAccessoriesPage();
            });
        }

        document.addEventListener("click", function (event) {
            const categoryButton = event.target.closest("[data-accessory-category]");
            if (!categoryButton) return;

            App.state.filters.accesorios.category = categoryButton.dataset.accessoryCategory;
            renderAccessoriesPage();
        });
    }

    function renderAccessoriesPage() {
        if (App.state.page !== "accesorios") return;

        const status = document.getElementById("catalogStatus");
        const grid = document.getElementById("productGrid");
        if (!grid) return;

        renderCategoryFilters();

        if (status) status.textContent = App.catalogStatusText("accesorios");

        const products = filteredAccessories();
        if (!products.length) {
            const message = App.state.catalogStatus.accesorios === "loading" ? App.t("catalogLoading") : App.t("noResults");
            grid.innerHTML = `<p class="empty-state">${App.escapeHTML(message)}</p>`;
            return;
        }

        grid.innerHTML = products.map(function (product) {
            return App.productCard(product);
        }).join("");
    }

    function renderCategoryFilters() {
        const node = document.getElementById("categoryFilters");
        if (!node) return;

        const categories = App.unique(App.state.catalogs.accesorios.map(function (product) {
            return product.category;
        }));
        const active = App.state.filters.accesorios.category;

        node.innerHTML = ["all"].concat(categories).map(function (category) {
            const label = category === "all" ? App.t("all") : App.categoryLabel(category, "accesorios");
            return `
                <button type="button" data-accessory-category="${App.escapeAttribute(category)}" class="${category === active ? "is-active" : ""}">
                    ${App.escapeHTML(label)}
                </button>
            `;
        }).join("");
    }

    function filteredAccessories() {
        const filters = App.state.filters.accesorios;
        const query = App.normalizeText(filters.query);

        return App.state.catalogs.accesorios.filter(function (product) {
            const variantText = (product.variants || []).map(function (variant) {
                return [variant.id_variante, variant.id_genero_accesorio, variant.id_talla_accesorio].join(" ");
            }).join(" ");
            const matchesQuery = !query || App.normalizeText([
                product.name,
                product.categoryName,
                product.description,
                variantText
            ].join(" ")).includes(query);
            const matchesCategory = filters.category === "all" || product.category === filters.category;
            return matchesQuery && matchesCategory;
        });
    }
})();
