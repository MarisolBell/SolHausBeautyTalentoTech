// **1. Elementos del DOM**
const asideCategoryMenu = document.querySelector("#aside-category-menu");
const catalogoButton = document.querySelector("#catalogo-button");
const catalogo = document.querySelector("#productos-catalogo");
const modalCentro = document.querySelector("#modal-centro");
const notification = document.getElementById("notification");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("input[type='search']");

// **2. Variables globales**
const API_URL = "https://dummyjson.com/products";
const CATEGORIES = ["beauty", "fragrances", "skin-care"];
let currentQuantity = 1;
let allProducts = []; // Almacenar todos los productos para búsqueda

// **3. Inicialización**
document.addEventListener("DOMContentLoaded", () => {
  loadFilteredProducts(); // Carga los productos filtrados

  // Verificar si searchForm existe antes de asignar el evento
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => handleSearch(event));
  } else {
    console.warn("El formulario de búsqueda no se encuentra en el DOM.");
  }
});

// **4. Funciones principales**

// (a) Cargar productos filtrados
function loadFilteredProducts() {
  fetch(`${API_URL}?limit=1000`)
    .then(response => {
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      return response.json();
    })
    .then(data => {
      // Filtrar los productos por las categorías deseadas
      allProducts = data.products.filter(product => CATEGORIES.includes(product.category));
      renderProducts(allProducts);
    })
    .catch(error => console.error("Error al cargar productos:", error));
}

// (b) Renderizar productos
function renderProducts(products) {
  console.log(products);
  if (!catalogo) {
    console.warn("El contenedor del catálogo no está disponible.");
    return;
  }
  catalogo.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>Precio: $${product.price}</p>
      <button onclick="viewDetail(${product.id})">Ver Detalle</button>
    </div>
  `).join("");
}

// (c) Ver detalle de un producto
function viewDetail(productId) {
  fetch(`${API_URL}/${productId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar detalles del producto");
      return response.json();
    })
    .then(product => {
      modalCentro.classList.add("active");
      modalCentro.innerHTML = `
        <button class="boton cerrar" id="cerrar-modal-centro">X</button>
        <div class="card-detail">
          <img src="${product.thumbnail}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p class="card-detail-price">Precio: $${product.price}</p>
          <div class="quantity">
            <button onclick="decreaseQuantity()">-</button>
            <span id="product-quantity">${currentQuantity}</span>
            <button onclick="increaseQuantity()">+</button>
          </div>
          <button class="card-detail-btn" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')">
            Agregar al Carrito
          </button>
        </div>`;
      
      // Cerrar modal
      document.querySelector("#cerrar-modal-centro").addEventListener("click", closeModal);
    })
    .catch(error => console.error("Error al cargar detalles del producto:", error));
}

function closeModal() {
  modalCentro.classList.remove("active");
  currentQuantity = 1; // Reiniciar cantidad al cerrar modal
}

// (d) Buscar productos
function handleSearch(event) {
  event.preventDefault(); 
  const searchQuery = searchInput.value.trim().toLowerCase();
  const searchResults = allProducts.filter(product =>
    product.category.toLowerCase().includes(searchQuery) ||
    product.title.toLowerCase().includes(searchQuery)
  );

  catalogo.innerHTML = ""; // Limpiar el contenedor

  if (searchResults.length > 0) {
    // Crear encabezado para resultados
    const resultsHeader = document.createElement("h3");
    resultsHeader.className = "search-results-title";
    resultsHeader.textContent = `Resultados de búsqueda para "${searchQuery}"`;
    catalogo.appendChild(resultsHeader);
    // Renderizar los resultados
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "search-results-container";
    resultsContainer.innerHTML = searchResults.map(product => `
      <div class="search-result-card">
        <img src="${product.thumbnail}" alt="${product.title}" class="search-result-image">
        <h4>${product.title}</h4>
        <p>Precio: $${product.price}</p>
        <button class="card-detail-btn" onclick="viewDetail(${product.id})">Ver Detalle</button>
      </div>
    `).join("");

    catalogo.appendChild(resultsContainer);
  } else {
    catalogo.innerHTML = `
      <div class="no-results">
        <h4>No hay productos que coincidan con la búsqueda "${searchQuery}".</h4>
        <button class="ver-todos-btn" id="ver-todos">Ver todos los productos</button>
      </div>
    `;

    document.querySelector("#ver-todos").addEventListener("click", () => renderProducts(allProducts));
    event.preventDefault();
  }

  searchInput.value = ""; // Limpiar el campo de búsqueda
}

// (e) Modificar cantidad
function increaseQuantity() {
  currentQuantity += 1;
  document.getElementById("product-quantity").textContent = currentQuantity;
}

function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity -= 1;
    document.getElementById("product-quantity").textContent = currentQuantity;
  }
}

// (f) Agregar al carrito (Esto se manejará en `cart.js`)
function addToCart(productId, title, price, thumbnail) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(product => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity += currentQuantity;
  } else {
    cart.push({ id: productId, title, price, thumbnail, quantity: currentQuantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification("¡Producto agregado al carrito!");
}

// (g) Mostrar notificación
function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove("hidden");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hidden");
  }, 3000);
}

// (i) Manejar clic en categorías
function handleCategoryClick(event) {
  const category = event.target.getAttribute("data-category");
  if (category) {
    event.preventDefault();
    const categoryProducts = allProducts.filter(product => product.category === category);
    renderProducts(categoryProducts);
  }
}

// Asignar eventos
asideCategoryMenu?.addEventListener("click", handleCategoryClick);
catalogoButton?.addEventListener("click", () => renderProducts(allProducts));
