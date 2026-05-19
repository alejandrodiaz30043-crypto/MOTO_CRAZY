(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;
    let loadPromise = null;
    let accessoryPageBound = false;

    Aplicacion.accesorios = {
        load: loadAccessories,
        render: renderAccessoriesPage
    };

    Aplicacion.onReady(initAccessories);

    async function initAccessories() {
        if (["inicio", "accesorios", "admin"].includes(Aplicacion.estado.page)) {
            await loadAccessories();
        }

        if (Aplicacion.estado.page === "accesorios") {
            bindAccessoriesPage();
            renderAccessoriesPage();
            Aplicacion.onLanguageChange(renderAccessoriesPage);
        }
    }

    async function loadAccessories(force) {
        if (loadPromise && !force) return loadPromise;

        loadPromise = (async function () {
            const cliente = Aplicacion.requireClient();
            if (!cliente) {
                Aplicacion.estado.catalogs.accesorios = [];
                Aplicacion.setCatalogStatus("accesorios", "error");
                return [];
            }

            Aplicacion.setCatalogStatus("accesorios", "loading");

            try {
                const result = await cliente
                    .from("productos_accesorios")
                    .select("id_producto,nombre,descripcion,imagen_url,activo,id_categoria_accesorio,created_at,categorias_accesorios(nombre,imagen_url),variantes_accesorios(id_variante,id_producto,id_genero_accesorio,id_talla_accesorio,precio,stock,activo,created_at)")
                    .eq("activo", true)
                    .order("id_producto", { ascending: true });

                if (result.error) throw result.error;

                const rows = Array.isArray(result.data) ? result.data : [];
                Aplicacion.estado.catalogs.accesorios = rows.map(mapAccessory);
                Aplicacion.setCatalogStatus("accesorios", rows.length ? "loaded" : "empty");
                return Aplicacion.estado.catalogs.accesorios;
            } catch (error) {
                console.error("Error cargando accesorios desde Supabase:", error);
                Aplicacion.estado.catalogs.accesorios = [];
                Aplicacion.setCatalogStatus("accesorios", "error");
                return [];
            } finally {
                renderAccessoriesPage();
            }
        })();

        return loadPromise;
    }

    function mapAccessory(row) {
        const categoryName = Aplicacion.nestedName(row.categorias_accesorios) || "Accesorio";
        const variants = Array.isArray(row.variantes_accesorios)
            ? row.variantes_accesorios.filter(function (variant) {
                return variant.activo !== false;
            }).map(function (variant) {
                return {
                    id_variante: variant.id_variante,
                    id_genero_accesorio: variant.id_genero_accesorio,
                    id_talla_accesorio: variant.id_talla_accesorio,
                    precio: Number(variant.precio || 0),
                    stock: Number(variant.stock || 0)
                };
            })
            : [];
        const prices = variants.map(function (variant) {
            return Number(variant.precio || 0);
        }).filter(function (price) {
            return price > 0;
        });

        return {
            id: String(row.id_producto),
            idProducto: String(row.id_producto),
            type: "accesorio",
            catalogType: "accesorios",
            name: row.nombre || "Accesorio",
            marca: "MotoCrazy",
            category: Aplicacion.normalizeCategory(categoryName),
            categoryName,
            precio: prices.length ? Math.min.apply(null, prices) : null,
            prefijoPrecio: prices.length > 1,
            stock: variants.reduce(function (sum, variant) {
                return sum + Number(variant.stock || 0);
            }, 0),
            image: row.imagen_url || Aplicacion.config.fallbackImage,
            description: row.descripcion || "",
            variants
        };
    }

    function bindAccessoriesPage() {
        if (accessoryPageBound) return;
        accessoryPageBound = true;

        const entradaBusqueda = document.getElementById("entradaBusqueda");
        if (entradaBusqueda) {
            entradaBusqueda.addEventListener("input", function () {
                Aplicacion.estado.filters.accesorios.query = entradaBusqueda.value;
                renderAccessoriesPage();
            });
        }

        document.addEventListener("click", function (event) {
            const categoryButton = event.target.closest("[data-categoria-accesorio]");
            if (!categoryButton) return;

            Aplicacion.estado.filters.accesorios.category = categoryButton.dataset.categoriaAccesorio;
            renderAccessoriesPage();
        });
    }

    function renderAccessoriesPage() {
        if (Aplicacion.estado.page !== "accesorios") return;

        const status = document.getElementById("estadoCatalogo");
        const grid = document.getElementById("grillaProductos");
        if (!grid) return;

        renderCategoryFilters();

        if (status) status.textContent = Aplicacion.estadoCatalogoText("accesorios");

        const productos = filteredAccessories();
        if (!productos.length) {
            const message = Aplicacion.estado.estadoCatalogo.accesorios === "loading" ? Aplicacion.t("catalogoCargando") : Aplicacion.t("sinResultados");
            grid.innerHTML = `<p class="estado-vacio">${Aplicacion.escapeHTML(message)}</p>`;
            return;
        }

        grid.innerHTML = productos.map(function (producto) {
            return Aplicacion.tarjetaProducto(producto);
        }).join("");
    }

    function renderCategoryFilters() {
        const node = document.getElementById("filtrosCategorias");
        if (!node) return;

        const categories = Aplicacion.unique(Aplicacion.estado.catalogs.accesorios.map(function (producto) {
            return producto.category;
        }));
        const active = Aplicacion.estado.filters.accesorios.category;

        node.innerHTML = ["all"].concat(categories).map(function (category) {
            const label = category === "all" ? Aplicacion.t("all") : Aplicacion.etiquetaCategoria(category, "accesorios");
            return `
                <button type="button" data-categoria-accesorio="${Aplicacion.escapeAttribute(category)}" class="${category === active ? "esta-activo" : ""}">
                    ${Aplicacion.escapeHTML(label)}
                </button>
            `;
        }).join("");
    }

    function filteredAccessories() {
        const filters = Aplicacion.estado.filters.accesorios;
        const query = Aplicacion.normalizeText(filters.query);

        return Aplicacion.estado.catalogs.accesorios.filter(function (producto) {
            const variantText = (producto.variants || []).map(function (variant) {
                return [variant.id_variante, variant.id_genero_accesorio, variant.id_talla_accesorio].join(" ");
            }).join(" ");
            const matchesQuery = !query || Aplicacion.normalizeText([
                producto.name,
                producto.categoryName,
                producto.description,
                variantText
            ].join(" ")).includes(query);
            const matchesCategory = filters.category === "all" || producto.category === filters.category;
            return matchesQuery && matchesCategory;
        });
    }
})();
