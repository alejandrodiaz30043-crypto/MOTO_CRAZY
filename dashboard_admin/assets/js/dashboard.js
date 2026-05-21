document.addEventListener("DOMContentLoaded", function () {
    const botonImprimir = document.querySelector("[data-accion='imprimir-dashboard']");
    const fechaReporte = document.querySelector("[data-fecha-reporte]");

    if (fechaReporte) {
        fechaReporte.textContent = new Date().toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    if (botonImprimir) {
        botonImprimir.addEventListener("click", function () {
            window.print();
        });
    }
});
