(function () {
    "use strict";

    const Aplicacion = window.MotoCrazy;
    let profilePromise = null;

    const adminState = {
        ready: false,
        profile: null,
        isAdmin: false
    };

    Aplicacion.admin = {
        estado: adminState,
        getCurrentProfile,
        isAdmin,
        protectAdminRoute,
        toggleAdminUI
    };

    Aplicacion.onReady(initAdminAccess);
    Aplicacion.onLanguageChange(toggleAdminUI);

    async function initAdminAccess() {
        await refreshAdminState(true);
        await protectAdminRoute();
        toggleAdminUI();

        window.addEventListener("motocrazy:auth-changed", async function () {
            await refreshAdminState(true);
            await protectAdminRoute();
            toggleAdminUI();
        });
    }

    async function refreshAdminState(force) {
        const profile = await getCurrentProfile(force);
        adminState.profile = profile;
        adminState.isAdmin = Boolean(profile && profile.rol === "admin");
        adminState.ready = true;
        Aplicacion.estado.profile = profile;
        Aplicacion.estado.isAdmin = adminState.isAdmin;
        return adminState;
    }

    async function getCurrentProfile(force) {
        if (profilePromise && !force) return profilePromise;

        profilePromise = (async function () {
            const cliente = Aplicacion.requireClient();
            if (!cliente) return null;

            try {
                const userResult = await cliente.auth.getUser();
                const user = userResult.data && userResult.data.user ? userResult.data.user : null;
                Aplicacion.estado.user = user;

                if (!user) {
                    return null;
                }

                const profileResult = await cliente
                    .from("perfiles")
                    .select("id,nombre,rol,created_at")
                    .eq("id", user.id)
                    .maybeSingle();

                if (profileResult.error) throw profileResult.error;

                return normalizeProfile(profileResult.data, user);
            } catch (error) {
                console.warn("No se pudo consultar el perfil de usuario:", error);
                return Aplicacion.estado.user ? fallbackProfile(Aplicacion.estado.user) : null;
            }
        })();

        return profilePromise;
    }

    async function isAdmin(force) {
        if (!adminState.ready || force) {
            await refreshAdminState(Boolean(force));
        }
        return adminState.isAdmin;
    }

    async function protectAdminRoute() {
        if (Aplicacion.estado.page !== "admin") return true;

        const allowed = await isAdmin();
        if (allowed) return true;

        const panel = document.getElementById("panelAdmin");
        if (panel) panel.innerHTML = "";

        Aplicacion.showToast(Aplicacion.t("adminAccesoDenegado"));
        window.setTimeout(function () {
            window.location.replace(homeUrlWithState());
        }, 120);
        return false;
    }

    async function toggleAdminUI() {
        const allowed = await isAdmin();
        document.querySelectorAll("[data-navegacion='admin'], [data-admin-only]").forEach(function (node) {
            node.hidden = !allowed;
            node.setAttribute("aria-hidden", allowed ? "false" : "true");
        });
    }

    function homeUrlWithState() {
        const params = new URLSearchParams();
        params.set("lang", Aplicacion.estado.lang || "es");
        params.set("tema", Aplicacion.estado.tema || "oscuro");
        return `index.html?${params.toString()}`;
    }

    function normalizeProfile(profile, user) {
        if (!profile) return fallbackProfile(user);

        return {
            id: profile.id || user.id,
            nombre: profile.nombre || user.email || "",
            rol: profile.rol === "admin" ? "admin" : "cliente",
            created_at: profile.created_at || null
        };
    }

    function fallbackProfile(user) {
        return {
            id: user.id,
            nombre: user.email || "",
            rol: "cliente",
            created_at: null
        };
    }
})();
