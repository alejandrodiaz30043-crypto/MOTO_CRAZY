(function () {
    "use strict";

    const App = window.MotoCrazy;

    App.auth = {
        openModal: openAuthModal,
        closeModal: closeAuthModal,
        refreshUser
    };

    App.onReady(initAuth);
    App.onLanguageChange(function () {
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
        document.querySelectorAll(".header-actions").forEach(function (actions) {
            if (actions.querySelector(".user-menu-container")) return;
            actions.insertAdjacentHTML("afterbegin", `
                <div class="user-menu-container"></div>
            `);
        });

        document.querySelectorAll(".user-menu-container").forEach(function (menu) {
            menu.innerHTML = `
                <button class="user-icon-btn" type="button" aria-label="${App.escapeAttribute(App.t("authMenuTitle"))}" aria-haspopup="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M20 21a8 8 0 0 0-16 0"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </button>
                <div class="user-dropdown" role="menu">
                    <p class="dropdown-title" data-auth-label>${App.escapeHTML(App.t("authMenuTitle"))}</p>
                    <div class="auth-guest-actions">
                        <button class="btn-primary" type="button" data-action="open-auth-register" data-auth-text="authRegisterButton">${App.escapeHTML(App.t("authRegisterButton"))}</button>
                        <button class="btn-primary" type="button" data-action="open-auth-login" data-auth-text="authLoginButton">${App.escapeHTML(App.t("authLoginButton"))}</button>
                        <button class="btn-link" type="button" data-action="open-auth-recover" data-auth-text="authRecoverButton">${App.escapeHTML(App.t("authRecoverButton"))}</button>
                        <hr>
                        <button class="btn-social" type="button" data-action="auth-oauth" data-provider="google"><span class="social-icon social-icon--google">G</span> <span data-auth-text="authGoogleButton">${App.escapeHTML(App.t("authGoogleButton"))}</span></button>
                        <button class="btn-social" type="button" data-action="auth-oauth" data-provider="facebook"><span class="social-icon social-icon--facebook">f</span> <span data-auth-text="authFacebookButton">${App.escapeHTML(App.t("authFacebookButton"))}</span></button>
                        <button class="btn-social" type="button" data-action="auth-oauth" data-provider="apple"><span class="social-icon social-icon--apple">A</span> <span data-auth-text="authAppleButton">${App.escapeHTML(App.t("authAppleButton"))}</span></button>
                    </div>
                    <div class="auth-user-actions" hidden>
                        <p class="auth-user-email" data-auth-email></p>
                        <button class="btn-secondary" type="button" data-action="auth-logout" data-auth-text="authLogoutButton">${App.escapeHTML(App.t("authLogoutButton"))}</button>
                    </div>
                </div>
            `;
        });
    }

    function createAuthModal() {
        if (document.getElementById("authModal")) return;

        document.body.insertAdjacentHTML("beforeend", `
            <div id="authModal" class="auth-modal" aria-hidden="true">
                <div class="auth-modal__backdrop" data-action="close-auth-modal"></div>
                <section class="auth-modal__panel" role="dialog" aria-modal="true" aria-labelledby="authTitle">
                    <button class="icon-button auth-modal__close" type="button" data-action="close-auth-modal" aria-label="${App.escapeAttribute(App.t("authCloseLabel"))}">X</button>
                    <h2 id="authTitle">${App.escapeHTML(App.t("authRegisterTitle"))}</h2>
                    <p id="authHint" class="auth-modal__hint">${App.escapeHTML(App.t("authRegisterHint"))}</p>
                    <form id="authForm" class="auth-form" data-auth-mode="register">
                        <label>
                            <span data-auth-email-label>${App.escapeHTML(App.t("authEmailLabel"))}</span>
                            <input id="authEmail" type="email" name="email" autocomplete="email" required>
                        </label>
                        <label id="authPasswordGroup">
                            <span data-auth-password-label>${App.escapeHTML(App.t("authPasswordLabel"))}</span>
                            <input id="authPassword" type="password" name="password" autocomplete="current-password" minlength="6">
                        </label>
                        <button id="authSubmit" class="btn-primary" type="submit">${App.escapeHTML(App.t("authRegisterSubmit"))}</button>
                        <p id="authMessage" class="auth-message" aria-live="polite"></p>
                    </form>
                </section>
            </div>
        `);
    }

    function bindAuthEvents() {
        document.addEventListener("click", async function (event) {
            const actionElement = event.target.closest("[data-action]");
            if (!actionElement) return;

            const action = actionElement.dataset.action;
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
                await logoutUser();
                return;
            }

            if (action === "auth-oauth") {
                await startOAuth(actionElement.dataset.provider);
            }
        });

        document.addEventListener("submit", function (event) {
            if (event.target && event.target.id === "authForm") {
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
        const client = App.requireClient();
        if (!client) {
            App.state.user = null;
            updateAuthUI();
            dispatchAuthChange();
            return null;
        }

        try {
            const result = await client.auth.getUser();
            App.state.user = result.data && result.data.user ? result.data.user : null;
        } catch (error) {
            App.state.user = null;
        }

        updateAuthUI();
        dispatchAuthChange();
        return App.state.user;
    }

    function listenForAuthChanges() {
        const client = App.requireClient();
        if (!client || !client.auth || !client.auth.onAuthStateChange) return;

        client.auth.onAuthStateChange(function (_event, session) {
            App.state.user = session && session.user ? session.user : null;
            updateAuthUI();
            dispatchAuthChange();
        });
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

        const modes = {
            register: {
                title: App.t("authRegisterTitle"),
                hint: App.t("authRegisterHint"),
                submit: App.t("authRegisterSubmit")
            },
            login: {
                title: App.t("authLoginTitle"),
                hint: App.t("authLoginHint"),
                submit: App.t("authLoginSubmit")
            },
            recover: {
                title: App.t("authRecoverTitle"),
                hint: App.t("authRecoverHint"),
                submit: App.t("authRecoverSubmit")
            }
        };
        const config = modes[mode] || modes.login;

        form.dataset.authMode = mode;
        title.textContent = config.title;
        hint.textContent = config.hint;
        submit.textContent = config.submit;
        passwordGroup.hidden = mode === "recover";
        password.required = mode !== "recover";
        if (message) {
            message.textContent = "";
            message.classList.remove("is-error");
        }

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.getElementById("authEmail").focus();
    }

    function updateOpenAuthModal() {
        const modal = document.getElementById("authModal");
        const form = document.getElementById("authForm");
        if (!modal || !form || !modal.classList.contains("is-open")) return;
        openAuthModal(form.dataset.authMode || "login");
    }

    function closeAuthModal() {
        const modal = document.getElementById("authModal");
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    }

    async function submitAuthForm(form) {
        const client = App.requireClient();
        if (!client) return;

        const mode = form.dataset.authMode || "login";
        const formData = new FormData(form);
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const submit = document.getElementById("authSubmit");

        if (mode !== "recover" && password.length < 6) {
            setAuthMessage(App.t("authPasswordTooShort"), true);
            return;
        }

        const originalText = submit ? submit.textContent : "";
        if (submit) {
            submit.disabled = true;
            submit.textContent = App.t("authProcessing");
        }

        try {
            if (mode === "register") {
                const result = await client.auth.signUp({
                    email,
                    password
                });
                if (result.error) throw result.error;
                App.state.user = result.data && result.data.session && result.data.session.user ? result.data.session.user : null;
                updateAuthUI();
                dispatchAuthChange();
                App.showToast(App.t("authRegisterSuccess"));
                setAuthMessage(App.t("authRegisterConfirm"), false);
                return;
            }

            if (mode === "login") {
                const result = await client.auth.signInWithPassword({
                    email,
                    password
                });
                if (result.error) throw result.error;
                App.state.user = result.data && result.data.user ? result.data.user : null;
                updateAuthUI();
                dispatchAuthChange();
                closeAuthModal();
                App.showToast(App.t("authLoginSuccess"));
                return;
            }

            const result = await client.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.href.split("#")[0]
            });
            if (result.error) throw result.error;
            setAuthMessage(App.t("authRecoverSent"), false);
        } catch (error) {
            setAuthMessage(error.message || App.t("authGenericError"), true);
        } finally {
            if (submit) {
                submit.disabled = false;
                submit.textContent = originalText;
            }
        }
    }

    async function logoutUser() {
        const client = App.requireClient();
        if (!client) return;

        try {
            const result = await client.auth.signOut();
            if (result.error) throw result.error;
        } catch (error) {
            console.warn("No se pudo cerrar sesion:", error);
        }

        App.state.user = null;
        updateAuthUI();
        dispatchAuthChange();
        App.showToast(App.t("authLogoutSuccess"));
    }

    async function startOAuth(provider) {
        const client = App.requireClient();
        if (!client || !provider) return;

        const redirectTo = window.location.href.split("#")[0];
        const result = await client.auth.signInWithOAuth({
            provider,
            options: { redirectTo }
        });
        if (result.error) {
            App.showToast(result.error.message || App.t("authGenericError"));
        }
    }

    function updateAuthUI() {
        const user = App.state.user;
        const email = user && user.email ? user.email : App.t("authConnectedUser");
        const isAuthenticated = Boolean(user && user.id);

        document.querySelectorAll(".user-dropdown").forEach(function (dropdown) {
            const label = dropdown.querySelector("[data-auth-label]");
            const guestActions = dropdown.querySelector(".auth-guest-actions");
            const userActions = dropdown.querySelector(".auth-user-actions");
            const emailNode = dropdown.querySelector("[data-auth-email]");

            dropdown.querySelectorAll("[data-auth-text]").forEach(function (node) {
                node.textContent = App.t(node.dataset.authText);
            });

            if (label) label.textContent = isAuthenticated ? App.t("authActiveSession") : App.t("authMenuTitle");
            if (guestActions) guestActions.hidden = isAuthenticated;
            if (userActions) userActions.hidden = !isAuthenticated;
            if (emailNode) emailNode.textContent = email;
        });
    }

    function setAuthMessage(message, isError) {
        const node = document.getElementById("authMessage");
        if (!node) return;
        node.textContent = message;
        node.classList.toggle("is-error", Boolean(isError));
    }

    function dispatchAuthChange() {
        window.dispatchEvent(new CustomEvent("motocrazy:auth-changed", {
            detail: { user: App.state.user }
        }));
    }
})();
