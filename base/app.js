let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function toggleCarrito() {
    document.getElementById("carrito").classList.toggle("active");
}

function agregar(nombre, precio, img) {
    carrito.push({nombre, precio, img});
    guardar();
}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    render();
}

function eliminar(i) {
    carrito.splice(i,1);
    guardar();
}

function render() {
    let lista = document.getElementById("lista");
    let total = document.getElementById("total");

    if (!lista) return;

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((p,i) => {
        suma += p.precio;

        lista.innerHTML += `
            <li>
                <img src="${p.img}" width="50">
                ${p.nombre} - $${p.precio}
                <button onclick="eliminar(${i})">X</button>
            </li>
        `;
    });

    total.innerText = "Total: $" + suma;
}

/* BUSCADOR */
document.addEventListener("input", e => {
    if (e.target.id === "buscador") {
        let filtro = e.target.value.toLowerCase();
        document.querySelectorAll("article").forEach(p => {
            p.style.display = p.innerText.toLowerCase().includes(filtro) ? "" : "none";
        });
    }
});

render();