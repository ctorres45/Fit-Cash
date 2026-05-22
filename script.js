let carrito = [];
let modalProducto = {};

// ===== PRODUCTOS =====
async function cargarProductos() {

  const productos = [

    {
      nombre: "Proteína Whey",
      precio: 120000,
      imagen: "https://smartmuscle.com.co/wp-content/uploads/2025/04/smartmuscle-4.webp"
    },

    {
      nombre: "Creatina Monohidratada",
      precio: 80000,
      imagen: "https://nutrafitcolombia.com/wp-content/uploads/2024/11/creatina-monohidratada-500-gramos-dymatize-nutrafit-3.webp"
    },

    {
      nombre: "Crea Stack",
      precio: 85000,
      imagen: "https://nutrafitcolombia.com/wp-content/uploads/2023/04/crea-stack-60-porciones-nutramerican-pharma-nutrafit-3.webp"
    },

    {
      nombre: "Smart Gainer",
      precio: 55000,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1vQg24z5_xSi2kBH8yT9fImnSRMnvzTMzkg&s"
    },

    {
      nombre: "Creatina Ultra Pure",
      precio: 95000,
      imagen: "https://muscleandfitnessco.com/cdn/shop/files/creatine_ultra_pure_specs.jpg?v=1717683028"
    },

    {
      nombre: "Syntha-6",
      precio: 110000,
      imagen: "https://nutrafitcolombia.com/wp-content/uploads/2020/09/proteina-syntha-6-5-libras-bsn-nutrafit-3.webp"
    },

    {
      nombre: "Omega 3",
      precio: 60000,
      imagen: "https://nutrafitcolombia.com/wp-content/uploads/2020/11/omega-3-120-capsulas-proscience-galeria.webp"
    },

    {
      nombre: "Bipro Classic",
      precio: 65000,
      imagen: "https://nutrafitcolombia.com/wp-content/uploads/2023/04/proteina-bipro-classic-3-libras-nutramerican-pharma-nutrafit-3.webp"
    },

    {
      nombre: "Pre Entreno C4",
      precio: 130000,
      imagen: "https://elitenutritionoficial.com/cdn/shop/files/pre-entreno-c4-30-servicios-cellucor-nutrafit-3.webp?v=1771364977&width=3840"
    },

    {
      nombre: "BCAA Aminoácidos",
      precio: 75000,
      imagen: "https://nutrafitcolombia.com/wp-content/uploads/2024/08/pro-bcaa-422-400-gramos-inside-nutrition-nutrafit-3.webp"
    }

  ];

  const contenedor = document.querySelector(".productos-grid");

  contenedor.innerHTML = "";

  productos.forEach(p => {

    contenedor.innerHTML += `

      <div class="producto">

        <img 
          src="${p.imagen}" 
          alt="${p.nombre}"
          onclick="abrirModal('${p.nombre}', ${p.precio}, '${p.imagen}')"
        >

        <h3>${p.nombre}</h3>

        <p>$${p.precio.toLocaleString()}</p>

        <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio}, '${p.imagen}')">
          🛒 Agregar al carrito
        </button>

      </div>

    `;
  });
}

// ===== MODAL =====
function abrirModal(nombre, precio, imagen) {

  modalProducto = { nombre, precio, imagen };

  document.getElementById("modal-img").src = imagen;

  document.getElementById("modal-nombre").textContent = nombre;

  document.getElementById("modal-precio").textContent =
    `$${precio.toLocaleString()}`;

  document.getElementById("modal-imagen")
    .classList.add("activo");
}

function cerrarModal() {

  document.getElementById("modal-imagen")
    .classList.remove("activo");
}

function modalAgregar() {

  agregarAlCarrito(
    modalProducto.nombre,
    modalProducto.precio,
    modalProducto.imagen
  );

  cerrarModal();
}

// ===== CARRITO =====
function agregarAlCarrito(nombre, precio, imagen) {

  const existente = carrito.find(i => i.nombre === nombre);

  if (existente) {

    existente.cantidad++;

  } else {

    carrito.push({
      nombre,
      precio,
      imagen,
      cantidad: 1
    });
  }

  actualizarCarrito();
  abrirCarrito();
}

function cambiarCantidad(nombre, delta) {

  const item = carrito.find(i => i.nombre === nombre);

  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {

    carrito = carrito.filter(i => i.nombre !== nombre);
  }

  actualizarCarrito();
}

function eliminarItem(nombre) {

  carrito = carrito.filter(i => i.nombre !== nombre);

  actualizarCarrito();
}

function actualizarCarrito() {

  const lista = document.getElementById("lista-carrito");

  const contador =
    document.getElementById("contador-carrito");

  const subtotalEl =
    document.getElementById("subtotal");

  const totalEl =
    document.getElementById("total");

  const totalItems =
    carrito.reduce((sum, i) => sum + i.cantidad, 0);

  const total =
    carrito.reduce((sum, i) =>
      sum + i.precio * i.cantidad, 0);

  contador.textContent = totalItems;

  subtotalEl.textContent =
    `$${total.toLocaleString()}`;

  totalEl.textContent =
    `$${total.toLocaleString()}`;

  if (carrito.length === 0) {

    lista.innerHTML =
      `<p class="carrito-vacio">
        Tu carrito está vacío 😢
      </p>`;

    return;
  }

  lista.innerHTML = carrito.map(item => `

    <div class="carrito-item">

      <img src="${item.imagen}" alt="${item.nombre}">

      <div class="carrito-item-info">

        <h4>${item.nombre}</h4>

        <p>$${item.precio.toLocaleString()}</p>

        <div class="carrito-item-controles">

          <button onclick="cambiarCantidad('${item.nombre}', -1)">
            −
          </button>

          <span>${item.cantidad}</span>

          <button onclick="cambiarCantidad('${item.nombre}', 1)">
            +
          </button>

        </div>

      </div>

      <button 
        class="btn-eliminar"
        onclick="eliminarItem('${item.nombre}')"
      >
        🗑
      </button>

    </div>

  `).join("");
}

// ===== ABRIR Y CERRAR =====
function abrirCarrito() {

  document.getElementById("carrito-drawer")
    .classList.add("abierto");

  document.getElementById("overlay")
    .classList.add("activo");
}

function cerrarCarrito() {

  document.getElementById("carrito-drawer")
    .classList.remove("abierto");

  document.getElementById("overlay")
    .classList.remove("activo");
}

// ===== WHATSAPP =====
function irAWhatsApp() {

  if (carrito.length === 0) {

    alert("Agrega productos al carrito");

    return;
  }

  const total = carrito.reduce(
    (sum, i) => sum + i.precio * i.cantidad,
    0
  );

  const itemsTexto = carrito.map(i =>
    `• ${i.nombre} x${i.cantidad} - $${(i.precio * i.cantidad).toLocaleString()}`
  ).join("\n");

  const mensaje =
    `Hola! Quiero hacer un pedido:\n\n${itemsTexto}\n\nTotal: $${total.toLocaleString()}`;

  window.open(
    `https://wa.me/573116408358?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );
}

// ===== ESC =====
document.addEventListener("keydown", e => {

  if (e.key === "Escape") {

    cerrarModal();
  }
});

// ===== INICIAR =====
cargarProductos();