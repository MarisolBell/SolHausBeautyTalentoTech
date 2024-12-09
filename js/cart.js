// cart.js: Manejo centralizado del carrito

const cartItems = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("total-price");
const emptyCartButton = document.getElementById("empty-cart");
const continueShoppingButton = document.getElementById("continue-shopping");
const numerito = document.querySelector("#numerito");

// Inicializar el carrito al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

// Función para renderizar productos en el carrito
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cartItems) return; // Validar que el contenedor exista antes de continuar

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No hay productos en el carrito</p>";
    totalPriceDisplay.textContent = "Precio Total: $0";
    updateCartCount();
    return;
  }

  cart.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" width="100">
      <p>${product.title}</p>
      <p>Precio c/u: $${product.price}</p>
      <p>Cantidad: 
        <button onclick="updateQuantity(${product.id}, -1)">-</button>
        ${product.quantity}
        <button onclick="updateQuantity(${product.id}, 1)">+</button>
      </p>
      <p>Subtotal: $${(product.price * product.quantity).toFixed(2)}</p>
      <button onclick="deleteProductInCart(${product.id})">Eliminar</button>
    `;
    cartItems.appendChild(div);
  });

  updateTotalPrice();
  updateCartCount();
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find(item => item.id === productId);

  if (!product) return;

  product.quantity += change;

  if (product.quantity < 1) {
    deleteProductInCart(productId);
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Función para eliminar un producto del carrito
function deleteProductInCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Función para vaciar el carrito
function emptyCart() {
  localStorage.removeItem("cart");
  renderCart();
}

// Función para actualizar el precio total
function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  if (totalPriceDisplay) {
    totalPriceDisplay.textContent = `Precio Total: $${total.toFixed(2)}`;
  }
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
  if (numerito) numerito.textContent = totalQuantity;
}

// Función para finalizar la compra (checkout)
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu carrito está vacío. Agrega productos antes de finalizar la compra.',
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: '¡Compra exitosa!',
    text: 'Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.',
    confirmButtonText: 'Aceptar',
  }).then(() => {
    emptyCart();
    setTimeout(() => {
      window.location.href = './productos.html';
    }, 3000);
  });
}

// Continuar la compra
function continueShopping() {
  window.location.href = "./productos.html";
}

// Eventos
if (emptyCartButton) emptyCartButton.addEventListener("click", emptyCart);
if (continueShoppingButton) continueShoppingButton.addEventListener("click", continueShopping);

const checkoutButton = document.getElementById("checkout");
if (checkoutButton) checkoutButton.addEventListener("click", checkout);
