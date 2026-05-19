(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;
    const IVA_RATE = 0.19;
    const FIXED_ANNUAL_INTEREST_RATE = 0.101;
    let loadPromise = null;
    let motoPageBound = false;
    let adminBound = false;

    Aplicacion.motos = {
        load: loadMotos,
        render: renderMotosPage
    };

    Aplicacion.onReady(initMotos);

    async function initMotos() {
        if (["inicio", "motos", "admin"].includes(Aplicacion.estado.page)) {
            await loadMotos();
        }

        if (Aplicacion.estado.page === "motos") {
            bindMotosPage();
            renderMotosPage();
            Aplicacion.onLanguageChange(renderMotosPage);
        }

        if (Aplicacion.estado.page === "admin") {
            if (!Aplicacion.admin || !(await Aplicacion.admin.isAdmin())) return;
            renderAdminPanel();
            bindAdminPanel();
            Aplicacion.onLanguageChange(function () {
                if (Aplicacion.estado.isAdmin) renderAdminPanel();
            });
        }
    }

    async function loadMotos(force) {
        if (loadPromise && !force) return loadPromise;

        loadPromise = (async function () {
            const cliente = Aplicacion.requireClient();
            if (!cliente) {
                Aplicacion.estado.catalogs.motos = [];
                Aplicacion.setCatalogStatus("motos", "error");
                return [];
            }

            Aplicacion.setCatalogStatus("motos", "loading");

            try {
                const result = await cliente
                    .from("modelos")
                    .select("id_modelo,nombre,descripcion,precio,stock,cilindrada,motor,potencia,imagen_url,id_marca,id_categoria,marcas(nombre),categorias_motos(nombre,descripcion)")
                    .order("id_modelo", { ascending: true });

                if (result.error) throw result.error;

                const rows = Array.isArray(result.data) ? result.data : [];
                Aplicacion.estado.catalogs.motos = rows.map(mapMoto);
                Aplicacion.setCatalogStatus("motos", rows.length ? "loaded" : "empty");
                return Aplicacion.estado.catalogs.motos;
            } catch (error) {
                console.error("Error cargando motos desde Supabase:", error);
                Aplicacion.estado.catalogs.motos = [];
                Aplicacion.setCatalogStatus("motos", "error");
                return [];
            } finally {
                renderMotosPage();
            }
        })();

        return loadPromise;
    }

    function mapMoto(row) {
        const categoryName = Aplicacion.nestedName(row.categorias_motos) || "Moto";
        return {
            id: String(row.id_modelo),
            idProducto: String(row.id_modelo),
            type: "moto",
            catalogType: "motos",
            name: row.nombre || "Moto",
            marca: Aplicacion.nestedName(row.marcas) || "",
            category: Aplicacion.normalizeCategory(categoryName),
            categoryName,
            precio: Number(row.precio || 0),
            stock: Number(row.stock || 0),
            image: row.imagen_url || Aplicacion.config.fallbackImage,
            description: row.descripcion || "",
            cilindrada: row.cilindrada ? Number(row.cilindrada) : "",
            motor: row.motor || "",
            potencia: row.potencia || ""
        };
    }

    function bindMotosPage() {
        if (motoPageBound) return;
        motoPageBound = true;

        const entradaBusqueda = document.getElementById("entradaBusqueda");
        if (entradaBusqueda) {
            entradaBusqueda.addEventListener("input", function () {
                Aplicacion.estado.filters.motos.query = entradaBusqueda.value;
                renderMotosPage();
            });
        }

        document.addEventListener("click", function (event) {
            const categoryButton = event.target.closest("[data-categoria-moto]");
            if (categoryButton) {
                Aplicacion.estado.filters.motos.category = categoryButton.dataset.categoriaMoto;
                renderMotosPage();
                return;
            }

            const actionElement = event.target.closest("[data-accion='alternar-comparacion']");
            if (actionElement) {
                toggleCompare(actionElement.dataset.idProducto);
                return;
            }

            const quoteElement = event.target.closest("[data-accion='cotizar-cuotas']");
            if (quoteElement) {
                selectInstallmentMoto(quoteElement.dataset.idProducto);
            }
        });

        document.addEventListener("change", function (event) {
            if (event.target && event.target.id === "filtroMarca") {
                Aplicacion.estado.filters.motos.marca = event.target.value;
                renderMotosPage();
            }

            if (event.target && event.target.id === "filtroCilindrada") {
                Aplicacion.estado.filters.motos.displacement = event.target.value;
                renderMotosPage();
            }

            if (event.target && event.target.matches("[data-entrada-cuotas]")) {
                updateInstallmentQuote();
            }
        });

        document.addEventListener("input", function (event) {
            if (event.target && event.target.matches("[data-entrada-cuotas]")) {
                updateInstallmentQuote();
            }
        });
    }

    function renderMotosPage() {
        if (Aplicacion.estado.page !== "motos") return;

        const status = document.getElementById("estadoCatalogo");
        const grid = document.getElementById("grillaProductos");
        if (!grid) return;

        renderAdvancedFilters();
        renderCategoryFilters();
        renderCompare();
        renderInstallmentQuote();

        if (status) status.textContent = Aplicacion.estadoCatalogoText("motos");

        const productos = filteredMotos();
        if (!productos.length) {
            const message = Aplicacion.estado.estadoCatalogo.motos === "loading" ? Aplicacion.t("catalogoCargando") : Aplicacion.t("sinResultados");
            grid.innerHTML = `<p class="estado-vacio">${Aplicacion.escapeHTML(message)}</p>`;
            return;
        }

        grid.innerHTML = productos.map(function (producto) {
            return Aplicacion.tarjetaProducto(producto, { comparacion: true, cuotas: true });
        }).join("");
    }

    function renderInstallmentQuote() {
        const node = document.getElementById("cotizadorCuotas");
        if (!node) return;

        const motos = Aplicacion.estado.catalogs.motos;
        if (!motos.length) {
            node.innerHTML = `
                <section>
                    <h2>${Aplicacion.escapeHTML(Aplicacion.t("tituloCuotas"))}</h2>
                    <p>${Aplicacion.escapeHTML(Aplicacion.t("cuotasSinMotos"))}</p>
                </section>
            `;
            return;
        }

        const selectedId = node.dataset.selectedMoto || motos[0].id;
        const selected = motos.find(function (producto) {
            return String(producto.id) === String(selectedId);
        }) || motos[0];
        node.dataset.selectedMoto = selected.id;

        const downPayment = node.dataset.downPayment || "";
        const term = node.dataset.term || "24";
        const fixedRate = formatPercent(FIXED_ANNUAL_INTEREST_RATE);

        node.innerHTML = `
            <section class="cotizador-cuotas__texto">
                <p class="ceja">${Aplicacion.escapeHTML(Aplicacion.t("botonCotizarCuotas"))}</p>
                <h2>${Aplicacion.escapeHTML(Aplicacion.t("tituloCuotas"))}</h2>
                <p>${Aplicacion.escapeHTML(Aplicacion.t("introCuotas"))}</p>
            </section>
            <form class="cotizador-cuotas__formulario">
                <label>
                    ${Aplicacion.escapeHTML(Aplicacion.t("motoCuotasTexto"))}
                    <select id="motoCuotas" data-entrada-cuotas>
                        ${motos.map(function (producto) {
                            return `<option value="${Aplicacion.escapeAttribute(producto.id)}" ${String(producto.id) === String(selected.id) ? "selected" : ""}>${Aplicacion.escapeHTML(producto.name)} - ${Aplicacion.escapeHTML(Aplicacion.formatPrice(producto))}</option>`;
                        }).join("")}
                    </select>
                </label>
                <label>
                    ${Aplicacion.escapeHTML(Aplicacion.t("cuotaInicialTexto"))}
                    <input id="cuotaInicial" data-entrada-cuotas type="number" min="0" step="50000" value="${Aplicacion.escapeAttribute(downPayment)}" placeholder="0">
                </label>
                <label>
                    ${Aplicacion.escapeHTML(Aplicacion.t("plazoCuotasTexto"))}
                    <select id="plazoCuotas" data-entrada-cuotas>
                        ${[12, 24, 36, 48, 60].map(function (months) {
                            return `<option value="${months}" ${String(months) === String(term) ? "selected" : ""}>${months} ${Aplicacion.escapeHTML(Aplicacion.t("mesesCuotas"))}</option>`;
                        }).join("")}
                    </select>
                </label>
                <label>
                    ${Aplicacion.escapeHTML(Aplicacion.t("interesMensualTexto"))}
                    <input id="interesCuotas" type="text" value="${Aplicacion.escapeAttribute(fixedRate)}" readonly>
                </label>
            </form>
            <section id="resultadoCuotas" class="cotizador-cuotas__resultado"></section>
        `;

        updateInstallmentQuote();
    }

    function selectInstallmentMoto(id) {
        const node = document.getElementById("cotizadorCuotas");
        if (!node) return;

        node.dataset.selectedMoto = id;
        renderInstallmentQuote();
        node.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function updateInstallmentQuote() {
        const node = document.getElementById("cotizadorCuotas");
        const result = document.getElementById("resultadoCuotas");
        const motoSelect = document.getElementById("motoCuotas");
        const downInput = document.getElementById("cuotaInicial");
        const termSelect = document.getElementById("plazoCuotas");
        if (!node || !result || !motoSelect || !downInput || !termSelect) return;

        const producto = Aplicacion.estado.catalogs.motos.find(function (item) {
            return String(item.id) === String(motoSelect.value);
        });
        if (!producto) return;

        const price = Math.max(0, Number(producto.precio || 0));
        const iva = price * IVA_RATE;
        const priceWithTax = price + iva;
        const downPayment = Math.min(priceWithTax, Math.max(0, Number(downInput.value || 0)));
        const months = Math.max(1, Number(termSelect.value || 1));
        const monthlyRate = Math.pow(1 + FIXED_ANNUAL_INTEREST_RATE, 1 / 12) - 1;
        const financed = Math.max(0, priceWithTax - downPayment);
        const monthlyPayment = monthlyRate
            ? financed * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
            : financed / months;
        const total = downPayment + (monthlyPayment * months);

        node.dataset.selectedMoto = producto.id;
        node.dataset.downPayment = downInput.value;
        node.dataset.term = termSelect.value;

        result.innerHTML = `
            <section class="cotizador-cuotas__fila">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("precioBaseTexto"))}</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(price))}</strong>
            </section>
            <section class="cotizador-cuotas__fila">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("ivaTexto"))} (${Aplicacion.escapeHTML(formatPercent(IVA_RATE))})</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(iva))}</strong>
            </section>
            <section class="cotizador-cuotas__fila">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("precioConIvaTexto"))}</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(priceWithTax))}</strong>
            </section>
            <section class="cotizador-cuotas__fila">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("valorFinanciadoTexto"))}</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(financed))}</strong>
            </section>
            <section class="cotizador-cuotas__fila cotizador-cuotas__fila--principal">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("cuotaMensualTexto"))}</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(monthlyPayment))}</strong>
            </section>
            <section class="cotizador-cuotas__fila">
                <span>${Aplicacion.escapeHTML(Aplicacion.t("costoTotalTexto"))}</span>
                <strong>${Aplicacion.escapeHTML(Aplicacion.formatMoney(total))}</strong>
            </section>
            <p>${Aplicacion.escapeHTML(Aplicacion.t("avisoCuotas"))}</p>
        `;
    }

    function formatPercent(value) {
        return new Intl.NumberFormat(Aplicacion.estado.lang === "en" ? "en-US" : "es-CO", {
            style: "percent",
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value);
    }

    function renderCategoryFilters() {
        const node = document.getElementById("filtrosCategorias");
        if (!node) return;

        const categories = Aplicacion.unique(Aplicacion.estado.catalogs.motos.map(function (producto) {
            return producto.category;
        }));
        const active = Aplicacion.estado.filters.motos.category;

        node.innerHTML = ["all"].concat(categories).map(function (category) {
            const label = category === "all" ? Aplicacion.t("all") : Aplicacion.etiquetaCategoria(category, "motos");
            return `
                <button type="button" data-categoria-moto="${Aplicacion.escapeAttribute(category)}" class="${category === active ? "esta-activo" : ""}">
                    ${Aplicacion.escapeHTML(label)}
                </button>
            `;
        }).join("");
    }

    function renderAdvancedFilters() {
        const node = document.getElementById("filtrosAvanzados");
        if (!node) return;

        const filters = Aplicacion.estado.filters.motos;
        const brands = Aplicacion.unique(Aplicacion.estado.catalogs.motos.map(function (producto) {
            return producto.marca;
        })).sort();
        const displacements = Aplicacion.unique(Aplicacion.estado.catalogs.motos.map(function (producto) {
            return producto.cilindrada;
        })).sort(function (a, b) {
            return Number(a) - Number(b);
        });

        node.innerHTML = `
            <label>
                ${Aplicacion.escapeHTML(Aplicacion.t("filtroMarcaTexto"))}
                <select id="filtroMarca">
                    <option value="all">${Aplicacion.escapeHTML(Aplicacion.t("todasLasMarcas"))}</option>
                    ${brands.map(function (brand) {
                        return `<option value="${Aplicacion.escapeAttribute(brand)}" ${brand === filters.marca ? "selected" : ""}>${Aplicacion.escapeHTML(brand)}</option>`;
                    }).join("")}
                </select>
            </label>
            <label>
                ${Aplicacion.escapeHTML(Aplicacion.t("filtroCilindradaTexto"))}
                <select id="filtroCilindrada">
                    <option value="all">${Aplicacion.escapeHTML(Aplicacion.t("todasLasCilindradas"))}</option>
                    ${displacements.map(function (cc) {
                        const value = String(cc);
                        return `<option value="${Aplicacion.escapeAttribute(value)}" ${value === String(filters.displacement) ? "selected" : ""}>${Aplicacion.escapeHTML(value)} ${Aplicacion.escapeHTML(Aplicacion.t("unidadCc"))}</option>`;
                    }).join("")}
                </select>
            </label>
        `;
    }

    function filteredMotos() {
        const filters = Aplicacion.estado.filters.motos;
        const query = Aplicacion.normalizeText(filters.query);

        return Aplicacion.estado.catalogs.motos.filter(function (producto) {
            const matchesQuery = !query || Aplicacion.normalizeText([
                producto.name,
                producto.marca,
                producto.categoryName,
                producto.description,
                producto.motor,
                producto.potencia
            ].join(" ")).includes(query);
            const matchesCategory = filters.category === "all" || producto.category === filters.category;
            const matchesBrand = filters.marca === "all" || producto.marca === filters.marca;
            const matchesDisplacement = filters.displacement === "all" || String(producto.cilindrada) === String(filters.displacement);
            return matchesQuery && matchesCategory && matchesBrand && matchesDisplacement;
        });
    }

    function toggleCompare(id) {
        const comparacion = Aplicacion.estado.comparacion;
        if (comparacion.includes(id)) {
            Aplicacion.estado.comparacion = comparacion.filter(function (item) {
                return item !== id;
            });
            Aplicacion.showToast(Aplicacion.t("comparacionQuitada"));
        } else {
            Aplicacion.estado.comparacion = comparacion.concat(id).slice(-3);
            Aplicacion.showToast(Aplicacion.t("comparacionAgregada"));
        }
        renderCompare();
    }

    function renderCompare() {
        const panel = document.getElementById("panelComparacion");
        if (!panel) return;

        const productos = Aplicacion.estado.comparacion.map(function (id) {
            return Aplicacion.estado.catalogs.motos.find(function (producto) {
                return String(producto.id) === String(id);
            });
        }).filter(Boolean);

        if (!productos.length) {
            panel.innerHTML = `
                <h2>${Aplicacion.escapeHTML(Aplicacion.t("tituloComparador"))}</h2>
                <p class="estado-vacio">${Aplicacion.escapeHTML(Aplicacion.t("comparadorVacio"))}</p>
            `;
            return;
        }

        const rows = [
            ["etiquetaMarca", "marca"],
            ["etiquetaCategoria", "categoryName"],
            ["unidadCc", "cilindrada"],
            ["etiquetaMotor", "motor"],
            ["etiquetaPotencia", "potencia"],
            ["totalCarrito", "precio"]
        ];

        panel.innerHTML = `
            <h2>${Aplicacion.escapeHTML(Aplicacion.t("tituloComparador"))}</h2>
            <section class="contenedor-tabla-comparacion">
                <table class="tabla-comparacion">
                    <thead>
                        <tr>${productos.map(function (producto) {
                            return `<th>${Aplicacion.escapeHTML(producto.name)}</th>`;
                        }).join("")}</tr>
                    </thead>
                    <tbody>
                        ${rows.map(function (row) {
                            return `<tr>${productos.map(function (producto) {
                                const value = row[1] === "precio" ? Aplicacion.formatPrice(producto) : producto[row[1]] || "-";
                                return `<td><span>${Aplicacion.escapeHTML(Aplicacion.t(row[0]))}</span>${Aplicacion.escapeHTML(value)}</td>`;
                            }).join("")}</tr>`;
                        }).join("")}
                    </tbody>
                </table>
            </section>
            <button class="boton boton--secondary" type="button" data-accion="limpiar-comparacion">${Aplicacion.escapeHTML(Aplicacion.t("limpiarComparador"))}</button>
        `;

        const clear = panel.querySelector("[data-accion='limpiar-comparacion']");
        if (clear) {
            clear.addEventListener("click", function () {
                Aplicacion.estado.comparacion = [];
                renderCompare();
            }, { once: true });
        }
    }

    function renderAdminPanel() {
        const panel = document.getElementById("panelAdmin");
        if (!panel) return;

        if (Aplicacion.admin && !Aplicacion.estado.isAdmin) {
            panel.innerHTML = "";
            return;
        }

        panel.innerHTML = `
            <article class="tarjeta-admin">
                <h2>${Aplicacion.escapeHTML(Aplicacion.t("formularioAdminMotos"))}</h2>
                <form data-formulario-admin data-tipo-admin="motos">
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminIdModelo"))}<input name="id_modelo" type="number" min="1"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminNombre"))}<input name="nombre" required></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminIdMarca"))}<input name="id_marca" type="number" min="1" required></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminIdCategoria"))}<input name="id_categoria" type="number" min="1" required></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminImagen"))}<input name="imagen_url" type="url"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminDescripcion"))}<textarea name="descripcion"></textarea></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminCilindrada"))}<input name="cilindrada" type="number" min="0"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("etiquetaMotor"))}<input name="motor"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("etiquetaPotencia"))}<input name="potencia"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminPrecio"))}<input name="precio" type="number" min="0" step="0.01"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminInventario"))}<input name="stock" type="number" min="0"></label>
                    <button class="boton-primario" type="submit">${Aplicacion.escapeHTML(Aplicacion.t("adminGuardar"))}</button>
                    <button class="boton-secundario" type="submit" data-eliminar-admin="true">${Aplicacion.escapeHTML(Aplicacion.t("eliminarAdmin"))}</button>
                </form>
            </article>
            <article class="tarjeta-admin">
                <h2>${Aplicacion.escapeHTML(Aplicacion.t("formularioAdminAccesorios"))}</h2>
                <form data-formulario-admin data-tipo-admin="accesorios">
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminIdProducto"))}<input name="id_producto" type="number" min="1"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminNombre"))}<input name="nombre" required></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminIdCategoria"))}<input name="id_categoria_accesorio" type="number" min="1" required></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminImagen"))}<input name="imagen_url" type="url"></label>
                    <label>${Aplicacion.escapeHTML(Aplicacion.t("adminDescripcion"))}<textarea name="descripcion"></textarea></label>
                    <button class="boton-primario" type="submit">${Aplicacion.escapeHTML(Aplicacion.t("adminGuardar"))}</button>
                    <button class="boton-secundario" type="submit" data-eliminar-admin="true">${Aplicacion.escapeHTML(Aplicacion.t("eliminarAdmin"))}</button>
                </form>
            </article>
        `;
    }

    function bindAdminPanel() {
        if (adminBound) return;
        adminBound = true;

        document.addEventListener("submit", async function (event) {
            if (!event.target || !event.target.matches("[data-formulario-admin]")) return;
            event.preventDefault();
            event.target.dataset.intencionEliminar = event.submitter && event.submitter.dataset.eliminarAdmin === "true" ? "true" : "false";
            await saveAdminRecord(event.target);
        });
    }

    async function saveAdminRecord(form) {
        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        if (!Aplicacion.estado.user) {
            Aplicacion.showToast(Aplicacion.t("autenticacionRequerida"));
            if (Aplicacion.auth) Aplicacion.auth.openModal("login");
            return;
        }

        if (!Aplicacion.admin || !(await Aplicacion.admin.isAdmin())) {
            Aplicacion.showToast(Aplicacion.t("adminAccesoDenegado"));
            return;
        }

        const type = form.dataset.tipoAdmin;
        const shouldDelete = form.dataset.intencionEliminar === "true";
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
                let query = cliente.from(table).delete();
                query = id ? query.eq(idColumn, id) : query.eq("nombre", data.nombre || "");
                const result = await query;
                if (result.error) throw result.error;
                Aplicacion.showToast(Aplicacion.t("adminEliminado"));
            } else if (id) {
                delete data[idColumn];
                const result = await cliente.from(table).update(data).eq(idColumn, id);
                if (result.error) throw result.error;
                Aplicacion.showToast(Aplicacion.t("adminGuardado"));
            } else {
                delete data[idColumn];
                const result = await cliente.from(table).insert(data);
                if (result.error) throw result.error;
                Aplicacion.showToast(Aplicacion.t("adminGuardado"));
            }

            form.reset();
            if (isMoto) {
                await loadMotos(true);
            } else if (Aplicacion.accesorios && Aplicacion.accesorios.load) {
                await Aplicacion.accesorios.load(true);
            }
        } catch (error) {
            console.error("Error guardando en Supabase:", error);
            Aplicacion.showToast(Aplicacion.t("adminErrorTexto"));
        }
    }
})();
