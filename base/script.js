const productos = [
    { nombre: "Yamaha R1M", precio: "$95.000.000", img: "https://via.placeholder.com/200" },
    { nombre: "Kawasaki Ninja ZX-10R", precio: "$75.000.000", img: "https://via.placeholder.com/200" },
    { nombre: "BMW S1000RR", precio: "$95.000.000", img: "https://via.placeholder.com/200" },
    { nombre: "Ducati Panigale V4", precio: "$110.000.000", img: "https://via.placeholder.com/200" }
];

const productList = document.getElementById('product-list');

function cargarProductos() {
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <span class="price">${producto.precio}</span>
            <button class="btn-add">Agregar al carrito</button>
        `;
        productList.appendChild(card);
    });
}

window.onload = cargarProductos;