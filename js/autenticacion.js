(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;

    Aplicacion.auth = {
        openModal: openAuthModal,
        closeModal: closeAuthModal,
        refreshUser
    };

    Aplicacion.onReady(initAuth);
    Aplicacion.onLanguageChange(function () {
        updateAuthUI();
        updateOpenAuthModal();
    });

    async function initAuth() {
        createUserMenus();
        createAuthModal();
        bindAuthEvents();
        await refreshUser();
        listenForAuthChanges();
    }

    function createUserMenus() {
        document.querySelectorAll(".acciones-encabezado").forEach(function (actions) {
            if (actions.querySelector(".contenedor-menu-usuario")) return;
            actions.insertAdjacentHTML("afterbegin", `
                <section class="contenedor-menu-usuario"></section>
            `);
        });

        document.querySelectorAll(".contenedor-menu-usuario").forEach(function (menu) {
            menu.innerHTML = `
                <button class="boton-icono-usuario" type="button" aria-label="${Aplicacion.escapeAttribute(Aplicacion.t("tituloMenuAutenticacion"))}" aria-haspopup="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M20 21a8 8 0 0 0-16 0"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </button>
                <section class="desplegable-usuario" role="menu">
                    <p class="titulo-desplegable" data-etiqueta-autenticacion>${Aplicacion.escapeHTML(Aplicacion.t("tituloMenuAutenticacion"))}</p>
                    <section class="acciones-invitado-autenticacion">
                        <button class="boton-primario" type="button" data-accion="abrir-registro-autenticacion" data-texto-autenticacion="botonRegistro">${Aplicacion.escapeHTML(Aplicacion.t("botonRegistro"))}</button>
                        <button class="boton-primario" type="button" data-accion="abrir-inicio-autenticacion" data-texto-autenticacion="botonIniciarSesion">${Aplicacion.escapeHTML(Aplicacion.t("botonIniciarSesion"))}</button>
                        <button class="boton-enlace" type="button" data-accion="abrir-recuperacion-autenticacion" data-texto-autenticacion="botonRecuperar">${Aplicacion.escapeHTML(Aplicacion.t("botonRecuperar"))}</button>
                        <hr>
                        <button class="boton-social" type="button" data-accion="autenticacion-oauth" data-proveedor="google">${socialIcon("google")} <span data-texto-autenticacion="botonGoogle">${Aplicacion.escapeHTML(Aplicacion.t("botonGoogle"))}</span></button>
                        <button class="boton-social" type="button" data-accion="autenticacion-oauth" data-proveedor="facebook">${socialIcon("facebook")} <span data-texto-autenticacion="botonFacebook">${Aplicacion.escapeHTML(Aplicacion.t("botonFacebook"))}</span></button>
                        <button class="boton-social" type="button" data-accion="autenticacion-oauth" data-proveedor="apple">${socialIcon("apple")} <span data-texto-autenticacion="botonApple">${Aplicacion.escapeHTML(Aplicacion.t("botonApple"))}</span></button>
                    </section>
                    <section class="acciones-usuario-autenticado" hidden>
                        <p class="correo-usuario-autenticado" data-correo-autenticacion></p>
                        <button class="boton-secundario" type="button" data-accion="cerrar-sesion" data-texto-autenticacion="botonCerrarSesion">${Aplicacion.escapeHTML(Aplicacion.t("botonCerrarSesion"))}</button>
                    </section>
                </section>
            `;
        });
    }

    function socialIcon(provider) {
        const icons = {
            google: `
                <span class="icono-social icono-social--google" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                        <path fill="#fbbc05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"></path>
                        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z"></path>
                    </svg>
                </span>
            `,
            facebook: `
                <span class="icono-social icono-social--facebook" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="currentColor" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"></path>
                    </svg>
                </span>
            `,
            apple: `
                <span class="icono-social icono-social--apple" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                        <path fill="currentColor" d="M16.37 1.43c0 1.07-.39 2.06-1.17 2.98-.94 1.1-2.04 1.73-3.24 1.63-.14-1.03.41-2.13 1.16-2.98.8-.92 2.18-1.6 3.25-1.63zM20.3 17.48c-.53 1.21-.79 1.75-1.47 2.82-.96 1.47-2.31 3.3-3.99 3.32-1.49.01-1.87-.97-3.9-.96-2.02.01-2.45.98-3.94.97-1.68-.02-2.96-1.67-3.92-3.15-2.67-4.09-2.95-8.88-1.3-11.43 1.17-1.81 3.02-2.87 4.75-2.87 1.76 0 2.87.97 4.33.97 1.41 0 2.27-.97 4.31-.97 1.54 0 3.17.84 4.34 2.29-3.81 2.09-3.19 7.54.79 9.01z"></path>
                    </svg>
                </span>
            `
        };

        return icons[provider] || "";
    }

    function createAuthModal() {
        if (document.getElementById("modalAutenticacion")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <section id="modalAutenticacion" class="modal-autenticacion" aria-hidden="true">
                <section class="modal-autenticacion__fondo" data-accion="cerrar-modal-autenticacion"></section>
                <section class="modal-autenticacion__panel" role="dialog" aria-modal="true" aria-labelledby="tituloAutenticacion">
                    <button class="boton-icono modal-autenticacion__cerrar" type="button" data-accion="cerrar-modal-autenticacion" aria-label="${Aplicacion.escapeAttribute(Aplicacion.t("etiquetaCerrarAutenticacion"))}">X</button>
                    <h2 id="tituloAutenticacion">${Aplicacion.escapeHTML(Aplicacion.t("tituloRegistro"))}</h2>
                    <p id="pistaAutenticacion" class="modal-autenticacion__pista">${Aplicacion.escapeHTML(Aplicacion.t("pistaRegistro"))}</p>
                    <form id="formularioAutenticacion" class="formulario-autenticacion" data-modo-autenticacion="register">
                        <label>
                            <span data-correo-autenticacion-label>${Aplicacion.escapeHTML(Aplicacion.t("correoAutenticacionLabel"))}</span>
                            <input id="correoAutenticacion" type="email" name="email" autocomplete="email" required>
                        </label>
                        <label id="grupoContrasenaAutenticacion">
                            <span data-etiqueta-contrasena-autenticacion>${Aplicacion.escapeHTML(Aplicacion.t("contrasenaAutenticacionLabel"))}</span>
                            <input id="contrasenaAutenticacion" type="password" name="password" autocomplete="current-password" minlength="6">
                        </label>
                        <button id="enviarAutenticacion" class="boton-primario" type="submit">${Aplicacion.escapeHTML(Aplicacion.t("enviarRegistro"))}</button>
                        <p id="mensajeAutenticacion" class="mensaje-autenticacion" aria-live="polite"></p>
                    </form>
                </section>
            </section>
        `);
    }

    function bindAuthEvents() {
        document.addEventListener("click", async function (event) {
            const actionElement = event.target.closest("[data-accion]");
            if (!actionElement) return;

            const action = actionElement.dataset.accion;
            if (action === "abrir-registro-autenticacion") {
                openAuthModal("register");
                return;
            }

            if (action === "abrir-inicio-autenticacion") {
                openAuthModal("login");
                return;
            }

            if (action === "abrir-recuperacion-autenticacion") {
                openAuthModal("recover");
                return;
            }

            if (action === "cerrar-modal-autenticacion") {
                closeAuthModal();
                return;
            }

            if (action === "cerrar-sesion") {
                await logoutUser();
                return;
            }

            if (action === "autenticacion-oauth") {
                await startOAuth(actionElement.dataset.proveedor);
            }
        });

        document.addEventListener("submit", function (event) {
            if (event.target && event.target.id === "formularioAutenticacion") {
                event.preventDefault();
                submitAuthForm(event.target);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeAuthModal();
            }
        });
    }

    async function refreshUser() {
        const cliente = Aplicacion.requireClient();
        if (!cliente) {
            Aplicacion.estado.user = null;
            updateAuthUI();
            dispatchAuthChange();
            return null;
        }

        try {
            const result = await cliente.auth.getUser();
            Aplicacion.estado.user = result.data && result.data.user ? result.data.user : null;
        } catch (error) {
            Aplicacion.estado.user = null;
        }

        updateAuthUI();
        dispatchAuthChange();
        return Aplicacion.estado.user;
    }

    function listenForAuthChanges() {
        const cliente = Aplicacion.requireClient();
        if (!cliente || !cliente.auth || !cliente.auth.onAuthStateChange) return;

        cliente.auth.onAuthStateChange(function (_event, session) {
            Aplicacion.estado.user = session && session.user ? session.user : null;
            updateAuthUI();
            dispatchAuthChange();
        });
    }

    function openAuthModal(mode) {
        const modal = document.getElementById("modalAutenticacion");
        const form = document.getElementById("formularioAutenticacion");
        const title = document.getElementById("tituloAutenticacion");
        const hint = document.getElementById("pistaAutenticacion");
        const submit = document.getElementById("enviarAutenticacion");
        const passwordGroup = document.getElementById("grupoContrasenaAutenticacion");
        const password = document.getElementById("contrasenaAutenticacion");
        const message = document.getElementById("mensajeAutenticacion");
        if (!modal || !form || !title || !hint || !submit || !passwordGroup || !password) return;

        const modes = {
            register: {
                title: Aplicacion.t("tituloRegistro"),
                hint: Aplicacion.t("pistaRegistro"),
                submit: Aplicacion.t("enviarRegistro")
            },
            login: {
                title: Aplicacion.t("tituloInicioSesion"),
                hint: Aplicacion.t("pistaInicioSesion"),
                submit: Aplicacion.t("enviarInicioSesion")
            },
            recover: {
                title: Aplicacion.t("tituloRecuperacion"),
                hint: Aplicacion.t("pistaRecuperacion"),
                submit: Aplicacion.t("enviarRecuperacion")
            }
        };
        const config = modes[mode] || modes.login;

        form.dataset.modoAutenticacion = mode;
        title.textContent = config.title;
        hint.textContent = config.hint;
        submit.textContent = config.submit;
        passwordGroup.hidden = mode === "recover";
        password.required = mode !== "recover";
        if (message) {
            message.textContent = "";
            message.classList.remove("es-error");
        }

        modal.classList.add("esta-abierto");
        modal.setAttribute("aria-hidden", "false");
        document.getElementById("correoAutenticacion").focus();
    }

    function updateOpenAuthModal() {
        const modal = document.getElementById("modalAutenticacion");
        const form = document.getElementById("formularioAutenticacion");
        if (!modal || !form || !modal.classList.contains("esta-abierto")) return;
        openAuthModal(form.dataset.modoAutenticacion || "login");
    }

    function closeAuthModal() {
        const modal = document.getElementById("modalAutenticacion");
        if (!modal) return;
        modal.classList.remove("esta-abierto");
        modal.setAttribute("aria-hidden", "true");
    }

    async function submitAuthForm(form) {
        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        const mode = form.dataset.modoAutenticacion || "login";
        const formData = new FormData(form);
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const submit = document.getElementById("enviarAutenticacion");

        if (mode !== "recover" && password.length < 6) {
            setAuthMessage(Aplicacion.t("contrasenaAutenticacionTooShort"), true);
            return;
        }

        const originalText = submit ? submit.textContent : "";
        if (submit) {
            submit.disabled = true;
            submit.textContent = Aplicacion.t("autenticacionProcesando");
        }

        try {
            if (mode === "register") {
                const result = await cliente.auth.signUp({
                    email,
                    password
                });
                if (result.error) throw result.error;
                Aplicacion.estado.user = result.data && result.data.session && result.data.session.user ? result.data.session.user : null;
                updateAuthUI();
                dispatchAuthChange();
                Aplicacion.showToast(Aplicacion.t("registroExitoso"));
                setAuthMessage(Aplicacion.t("registroConfirmacion"), false);
                return;
            }

            if (mode === "login") {
                const result = await cliente.auth.signInWithPassword({
                    email,
                    password
                });
                if (result.error) throw result.error;
                Aplicacion.estado.user = result.data && result.data.user ? result.data.user : null;
                updateAuthUI();
                dispatchAuthChange();
                closeAuthModal();
                Aplicacion.showToast(Aplicacion.t("inicioSesionExitoso"));
                return;
            }

            const result = await cliente.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.href.split("#")[0]
            });
            if (result.error) throw result.error;
            setAuthMessage(Aplicacion.t("recuperacionEnviada"), false);
        } catch (error) {
            setAuthMessage(error.message || Aplicacion.t("errorAutenticacion"), true);
        } finally {
            if (submit) {
                submit.disabled = false;
                submit.textContent = originalText;
            }
        }
    }

    async function logoutUser() {
        const cliente = Aplicacion.requireClient();
        if (!cliente) return;

        try {
            const result = await cliente.auth.signOut();
            if (result.error) throw result.error;
        } catch (error) {
            console.warn("No se pudo cerrar sesion:", error);
        }

        Aplicacion.estado.user = null;
        updateAuthUI();
        dispatchAuthChange();
        Aplicacion.showToast(Aplicacion.t("cierreSesionExitoso"));
    }

    async function startOAuth(provider) {
        const cliente = Aplicacion.requireClient();
        if (!cliente || !provider) return;

        const redirectTo = window.location.href.split("#")[0];
        const result = await cliente.auth.signInWithOAuth({
            provider,
            options: { redirectTo }
        });
        if (result.error) {
            Aplicacion.showToast(result.error.message || Aplicacion.t("errorAutenticacion"));
        }
    }

    function updateAuthUI() {
        const user = Aplicacion.estado.user;
        const email = user && user.email ? user.email : Aplicacion.t("usuarioConectado");
        const isAuthenticated = Boolean(user && user.id);

        document.querySelectorAll(".desplegable-usuario").forEach(function (dropdown) {
            const label = dropdown.querySelector("[data-etiqueta-autenticacion]");
            const guestActions = dropdown.querySelector(".acciones-invitado-autenticacion");
            const userActions = dropdown.querySelector(".acciones-usuario-autenticado");
            const emailNode = dropdown.querySelector("[data-correo-autenticacion]");

            dropdown.querySelectorAll("[data-texto-autenticacion]").forEach(function (node) {
                node.textContent = Aplicacion.t(node.dataset.textoAutenticacion);
            });

            if (label) label.textContent = isAuthenticated ? Aplicacion.t("sesionActiva") : Aplicacion.t("tituloMenuAutenticacion");
            if (guestActions) guestActions.hidden = isAuthenticated;
            if (userActions) userActions.hidden = !isAuthenticated;
            if (emailNode) emailNode.textContent = email;
        });
    }

    function setAuthMessage(message, isError) {
        const node = document.getElementById("mensajeAutenticacion");
        if (!node) return;
        node.textContent = message;
        node.classList.toggle("es-error", Boolean(isError));
    }

    function dispatchAuthChange() {
        window.dispatchEvent(new CustomEvent("motocrazy:auth-changed", {
            detail: { user: Aplicacion.estado.user }
        }));
    }
})();
