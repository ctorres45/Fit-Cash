let carrito = [];
let modalProducto = {};

// ===== PRODUCTOS =====
function cargarProductos() {

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

  productos.forEach(producto => {

    contenedor.innerHTML += `

      <div class="producto">

        <img 
          src="${producto.imagen}" 
          alt="${producto.nombre}"
          onclick="abrirModal(
            '${producto.nombre}', 
            ${producto.precio}, 
            '${producto.imagen}'
          )"
        >

        <h3>${producto.nombre}</h3>

        <p>$${producto.precio.toLocaleString()}</p>

        <button 
          onclick="agregarAlCarrito(
            '${producto.nombre}', 
            ${producto.precio}, 
            '${producto.imagen}'
          )"
        >
          🛒 Agregar al carrito
        </button>

      </div>

    `;

  });

}

// ===== MODAL =====
function abrirModal(nombre, precio, imagen) {

  modalProducto = {
    nombre,
    precio,
    imagen
  };

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

  const productoExistente =
    carrito.find(item => item.nombre === nombre);

  if (productoExistente) {

    productoExistente.cantidad++;

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

function cambiarCantidad(nombre, cambio) {

  const item =
    carrito.find(producto => producto.nombre === nombre);

  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {

    carrito =
      carrito.filter(producto => producto.nombre !== nombre);

  }

  actualizarCarrito();

}

function eliminarItem(nombre) {

  carrito =
    carrito.filter(producto => producto.nombre !== nombre);

  actualizarCarrito();

}

function actualizarCarrito() {

  const listaCarrito =
    document.getElementById("lista-carrito");

  const contadorCarrito =
    document.getElementById("contador-carrito");

  const subtotalElemento =
    document.getElementById("subtotal");

  const totalElemento =
    document.getElementById("total");

  const totalProductos =
    carrito.reduce((total, item) => total + item.cantidad, 0);

  const totalCompra =
    carrito.reduce(
      (total, item) =>
        total + (item.precio * item.cantidad),
      0
    );

  contadorCarrito.textContent = totalProductos;

  subtotalElemento.textContent =
    `$${totalCompra.toLocaleString()}`;

  totalElemento.textContent =
    `$${totalCompra.toLocaleString()}`;

  if (carrito.length === 0) {

    listaCarrito.innerHTML = `
      <p class="carrito-vacio">
        Tu carrito está vacío 😢
      </p>
    `;

    return;

  }

  listaCarrito.innerHTML = carrito.map(item => `

    <div class="carrito-item">

      <img 
        src="${item.imagen}" 
        alt="${item.nombre}"
      >

      <div class="carrito-item-info">

        <h4>${item.nombre}</h4>

        <p>$${item.precio.toLocaleString()}</p>

        <div class="carrito-item-controles">

          <button 
            onclick="cambiarCantidad('${item.nombre}', -1)"
          >
            −
          </button>

          <span>${item.cantidad}</span>

          <button 
            onclick="cambiarCantidad('${item.nombre}', 1)"
          >
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

// ===== ABRIR Y CERRAR CARRITO =====
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

    alert("Agrega productos al carrito primero");

    return;

  }

  const total =
    carrito.reduce(
      (suma, item) =>
        suma + (item.precio * item.cantidad),
      0
    );

  const productosMensaje =
    carrito.map(item => {

      return `• ${item.nombre} x${item.cantidad} - $${(
        item.precio * item.cantidad
      ).toLocaleString()}`;

    }).join("\n");

  const mensaje =
`Hola 👋
Quiero realizar el siguiente pedido:

${productosMensaje}

💰 Total: $${total.toLocaleString()}`;

  window.open(
    `https://wa.me/573116408358?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );

}

// ===== CERRAR MODAL CON ESC =====
document.addEventListener("keydown", evento => {

  if (evento.key === "Escape") {

    cerrarModal();

  }

});

// ===== INICIAR =====
cargarProductos();