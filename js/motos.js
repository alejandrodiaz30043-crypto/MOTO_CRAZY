(function () {
    "use strict";

    const App = window.MotoCrazy;
    let loadPromise = null;
    let motoPageBound = false;
    let adminBound = false;

    App.motos = {
        load: loadMotos,
        render: renderMotosPage
    };

    App.onReady(initMotos);

    async function initMotos() {
        if (["inicio", "motos", "admin"].includes(App.state.page)) {
            await loadMotos();
        }

        if (App.state.page === "motos") {
            bindMotosPage();
            renderMotosPage();
            App.onLanguageChange(renderMotosPage);
        }

        if (App.state.page === "admin") {
            renderAdminPanel();
            bindAdminPanel();
            App.onLanguageChange(renderAdminPanel);
        }
    }

    async function loadMotos(force) {
        if (loadPromise && !force) return loadPromise;

        loadPromise = (async function () {
            const client = App.requireClient();
            if (!client) {
                App.state.catalogs.motos = [];
                App.setCatalogStatus("motos", "error");
                return [];
            }

            App.setCatalogStatus("motos", "loading");

            try {
                const result = await client
                    .from("modelos")
                    .select("id_modelo,nombre,descripcion,precio,stock,cilindrada,motor,potencia,imagen_url,id_marca,id_categoria,marcas(nombre),categorias_motos(nombre,descripcion)")
                    .order("id_modelo", { ascending: true });

                if (result.error) throw result.error;

                const rows = Array.isArray(result.data) ? result.data : [];
                App.state.catalogs.motos = rows.map(mapMoto);
                App.setCatalogStatus("motos", rows.length ? "loaded" : "empty");
                return App.state.catalogs.motos;
            } catch (error) {
                console.error("Error cargando motos desde Supabase:", error);
                App.state.catalogs.motos = [];
                App.setCatalogStatus("motos", "error");
                return [];
            } finally {
                renderMotosPage();
            }
        })();

        return loadPromise;
    }

    function mapMoto(row) {
        const categoryName = App.nestedName(row.categorias_motos) || "Moto";
        return {
            id: String(row.id_modelo),
            productId: String(row.id_modelo),
            type: "moto",
            catalogType: "motos",
            name: row.nombre || "Moto",
            brand: App.nestedName(row.marcas) || "",
            category: App.normalizeCategory(categoryName),
            categoryName,
            price: Number(row.precio || 0),
            stock: Number(row.stock || 0),
            image: row.imagen_url || App.config.fallbackImage,
            description: row.descripcion || "",
            cilindrada: row.cilindrada ? Number(row.cilindrada) : "",
            motor: row.motor || "",
            potencia: row.potencia || ""
        };
    }

    function bindMotosPage() {
        if (motoPageBound) return;
        motoPageBound = true;

        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                App.state.filters.motos.query = searchInput.value;
                renderMotosPage();
            });
        }

        document.addEventListener("click", function (event) {
            const categoryButton = event.target.closest("[data-moto-category]");
            if (categoryButton) {
                App.state.filters.motos.category = categoryButton.dataset.motoCategory;
                renderMotosPage();
                return;
            }

            const actionElement = event.target.closest("[data-action='toggle-compare']");
            if (actionElement) {
                toggleCompare(actionElement.dataset.productId);
            }
        });

        document.addEventListener("change", function (event) {
            if (event.target && event.target.id === "brandFilter") {
                App.state.filters.motos.brand = event.target.value;
                renderMotosPage();
            }

            if (event.target && event.target.id === "displacementFilter") {
                App.state.filters.motos.displacement = event.target.value;
                renderMotosPage();
            }
        });
    }

    function renderMotosPage() {
        if (App.state.page !== "motos") return;

        const status = document.getElementById("catalogStatus");
        const grid = document.getElementById("productGrid");
        if (!grid) return;

        renderAdvancedFilters();
        renderCategoryFilters();
        renderCompare();

        if (status) status.textContent = App.catalogStatusText("motos");

        const products = filteredMotos();
        if (!products.length) {
            const message = App.state.catalogStatus.motos === "loading" ? App.t("catalogLoading") : App.t("noResults");
            grid.innerHTML = `<p class="empty-state">${App.escapeHTML(message)}</p>`;
            return;
        }

        grid.innerHTML = products.map(function (product) {
            return App.productCard(product, { compare: true });
        }).join("");
    }

    function renderCategoryFilters() {
        const node = document.getElementById("categoryFilters");
        if (!node) return;

        const categories = App.unique(App.state.catalogs.motos.map(function (product) {
            return product.category;
        }));
        const active = App.state.filters.motos.category;

        node.innerHTML = ["all"].concat(categories).map(function (category) {
            const label = category === "all" ? App.t("all") : App.categoryLabel(category, "motos");
            return `
                <button type="button" data-moto-category="${App.escapeAttribute(category)}" class="${category === active ? "is-active" : ""}">
                    ${App.escapeHTML(label)}
                </button>
            `;
        }).join("");
    }

    function renderAdvancedFilters() {
        const node = document.getElementById("advancedFilters");
        if (!node) return;

        const filters = App.state.filters.motos;
        const brands = App.unique(App.state.catalogs.motos.map(function (product) {
            return product.brand;
        })).sort();
        const displacements = App.unique(App.state.catalogs.motos.map(function (product) {
            return product.cilindrada;
        })).sort(function (a, b) {
            return Number(a) - Number(b);
        });

        node.innerHTML = `
            <label>
                ${App.escapeHTML(App.t("filterBrand"))}
                <select id="brandFilter">
                    <option value="all">${App.escapeHTML(App.t("allBrands"))}</option>
                    ${brands.map(function (brand) {
                        return `<option value="${App.escapeAttribute(brand)}" ${brand === filters.brand ? "selected" : ""}>${App.escapeHTML(brand)}</option>`;
                    }).join("")}
                </select>
            </label>
            <label>
                ${App.escapeHTML(App.t("filterDisplacement"))}
                <select id="displacementFilter">
                    <option value="all">${App.escapeHTML(App.t("allDisplacements"))}</option>
                    ${displacements.map(function (cc) {
                        const value = String(cc);
                        return `<option value="${App.escapeAttribute(value)}" ${value === String(filters.displacement) ? "selected" : ""}>${App.escapeHTML(value)} ${App.escapeHTML(App.t("ccUnit"))}</option>`;
                    }).join("")}
                </select>
            </label>
        `;
    }

    function filteredMotos() {
        const filters = App.state.filters.motos;
        const query = App.normalizeText(filters.query);

        return App.state.catalogs.motos.filter(function (product) {
            const matchesQuery = !query || App.normalizeText([
                product.name,
                product.brand,
                product.categoryName,
                product.description,
                product.motor,
                product.potencia
            ].join(" ")).includes(query);
            const matchesCategory = filters.category === "all" || product.category === filters.category;
            const matchesBrand = filters.brand === "all" || product.brand === filters.brand;
            const matchesDisplacement = filters.displacement === "all" || String(product.cilindrada) === String(filters.displacement);
            return matchesQuery && matchesCategory && matchesBrand && matchesDisplacement;
        });
    }

    function toggleCompare(id) {
        const compare = App.state.compare;
        if (compare.includes(id)) {
            App.state.compare = compare.filter(function (item) {
                return item !== id;
            });
        } else {
            App.state.compare = compare.concat(id).slice(-3);
        }
        renderCompare();
    }

    function renderCompare() {
        const panel = document.getElementById("comparePanel");
        if (!panel) return;

        const products = App.state.compare.map(function (id) {
            return App.state.catalogs.motos.find(function (product) {
                return String(product.id) === String(id);
            });
        }).filter(Boolean);

        if (!products.length) {
            panel.innerHTML = `
                <h2>${App.escapeHTML(App.t("compareTitle"))}</h2>
                <p class="empty-state">${App.escapeHTML(App.t("compareEmpty"))}</p>
            `;
            return;
        }

        const rows = [
            ["brandLabel", "brand"],
            ["categoryLabel", "categoryName"],
            ["ccUnit", "cilindrada"],
            ["motorLabel", "motor"],
            ["powerLabel", "potencia"],
            ["cartTotal", "price"]
        ];

        panel.innerHTML = `
            <h2>${App.escapeHTML(App.t("compareTitle"))}</h2>
            <div class="compare-table-wrap">
                <table class="compare-table">
                    <thead>
                        <tr>${products.map(function (product) {
                            return `<th>${App.escapeHTML(product.name)}</th>`;
                        }).join("")}</tr>
                    </thead>
                    <tbody>
                        ${rows.map(function (row) {
                            return `<tr>${products.map(function (product) {
                                const value = row[1] === "price" ? App.formatPrice(product) : product[row[1]] || "-";
                                return `<td><span>${App.escapeHTML(App.t(row[0]))}</span>${App.escapeHTML(value)}</td>`;
                            }).join("")}</tr>`;
                        }).join("")}
                    </tbody>
                </table>
            </div>
            <button class="button button--secondary" type="button" data-action="clear-compare">${App.escapeHTML(App.t("compareClear"))}</button>
        `;

        const clear = panel.querySelector("[data-action='clear-compare']");
        if (clear) {
            clear.addEventListener("click", function () {
                App.state.compare = [];
                renderCompare();
            }, { once: true });
        }
    }

    function renderAdminPanel() {
        const panel = document.getElementById("adminPanel");
        if (!panel) return;

        panel.innerHTML = `
            <article class="admin-card">
                <h2>${App.escapeHTML(App.t("adminMotoForm"))}</h2>
                <form data-admin-form data-admin-type="motos">
                    <label>ID modelo<input name="id_modelo" type="number" min="1"></label>
                    <label>${App.escapeHTML(App.t("adminName"))}<input name="nombre" required></label>
                    <label>${App.escapeHTML(App.t("adminBrandId"))}<input name="id_marca" type="number" min="1" required></label>
                    <label>${App.escapeHTML(App.t("adminCategoryId"))}<input name="id_categoria" type="number" min="1" required></label>
                    <label>${App.escapeHTML(App.t("adminImage"))}<input name="imagen_url" type="url"></label>
                    <label>${App.escapeHTML(App.t("adminDescription"))}<textarea name="descripcion"></textarea></label>
                    <label>Cilindrada<input name="cilindrada" type="number" min="0"></label>
                    <label>${App.escapeHTML(App.t("motorLabel"))}<input name="motor"></label>
                    <label>${App.escapeHTML(App.t("powerLabel"))}<input name="potencia"></label>
                    <label>${App.escapeHTML(App.t("adminPrice"))}<input name="precio" type="number" min="0" step="0.01"></label>
                    <label>${App.escapeHTML(App.t("adminStock"))}<input name="stock" type="number" min="0"></label>
                    <button class="btn-primary" type="submit">${App.escapeHTML(App.t("adminSave"))}</button>
                    <button class="btn-secondary" type="submit" data-admin-delete="true">${App.escapeHTML(App.t("adminDelete"))}</button>
                </form>
            </article>
            <article class="admin-card">
                <h2>${App.escapeHTML(App.t("adminAccessoryForm"))}</h2>
                <form data-admin-form data-admin-type="accesorios">
                    <label>ID producto<input name="id_producto" type="number" min="1"></label>
                    <label>${App.escapeHTML(App.t("adminName"))}<input name="nombre" required></label>
                    <label>${App.escapeHTML(App.t("adminCategoryId"))}<input name="id_categoria_accesorio" type="number" min="1" required></label>
                    <label>${App.escapeHTML(App.t("adminImage"))}<input name="imagen_url" type="url"></label>
                    <label>${App.escapeHTML(App.t("adminDescription"))}<textarea name="descripcion"></textarea></label>
                    <button class="btn-primary" type="submit">${App.escapeHTML(App.t("adminSave"))}</button>
                    <button class="btn-secondary" type="submit" data-admin-delete="true">${App.escapeHTML(App.t("adminDelete"))}</button>
                </form>
            </article>
        `;
    }

    function bindAdminPanel() {
        if (adminBound) return;
        adminBound = true;

        document.addEventListener("submit", async function (event) {
            if (!event.target || !event.target.matches("[data-admin-form]")) return;
            event.preventDefault();
            event.target.dataset.deleteIntent = event.submitter && event.submitter.dataset.adminDelete === "true" ? "true" : "false";
            await saveAdminRecord(event.target);
        });
    }

    async function saveAdminRecord(form) {
        const client = App.requireClient();
        if (!client) return;

        if (!App.state.user) {
            App.showToast(App.t("authRequired"));
            if (App.auth) App.auth.openModal("login");
            return;
        }

        const type = form.dataset.adminType;
        const shouldDelete = form.dataset.deleteIntent === "true";
        const data = Object.fromEntries(new FormData(form).entries());
        Object.keys(data).forEach(function (key) {
            if (data[key] === "") {
                delete data[key];
                return;
            }
            if (["id_modelo", "id_marca", "id_categoria", "id_producto", "id_categoria_accesorio", "precio", "stock", "cilindrada"].includes(key)) {
                data[key] = Number(data[key]);
            }
        });

        const isMoto = type === "motos";
        const table = isMoto ? "modelos" : "productos_accesorios";
        const idColumn = isMoto ? "id_modelo" : "id_producto";
        const id = data[idColumn];

        try {
            if (shouldDelete) {
                let query = client.from(table).delete();
                query = id ? query.eq(idColumn, id) : query.eq("nombre", data.nombre || "");
                const result = await query;
                if (result.error) throw result.error;
                App.showToast(App.t("adminDeleted"));
            } else if (id) {
                delete data[idColumn];
                const result = await client.from(table).update(data).eq(idColumn, id);
                if (result.error) throw result.error;
                App.showToast(App.t("adminSaved"));
            } else {
                delete data[idColumn];
                const result = await client.from(table).insert(data);
                if (result.error) throw result.error;
                App.showToast(App.t("adminSaved"));
            }

            form.reset();
            if (isMoto) {
                await loadMotos(true);
            } else if (App.accesorios && App.accesorios.load) {
                await App.accesorios.load(true);
            }
        } catch (error) {
            console.error("Error guardando en Supabase:", error);
            App.showToast(App.t("adminError"));
        }
    }
})();
