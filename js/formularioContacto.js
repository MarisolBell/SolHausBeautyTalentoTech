document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form"); // Selecciona el formulario por clase
    const nombreInput = form.querySelector("#nombre");
    const emailInput = form.querySelector("#email");
    const mensajeInput = form.querySelector("#mensaje");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); 
  
      // Validar campos
      const nombre = nombreInput.value.trim();
      const email = emailInput.value.trim();
      const mensaje = mensajeInput.value.trim();
  
      if (!nombre) {
        Swal.fire({
          icon: "error",
          title: "Nombre requerido",
          text: "Por favor, ingresa tu nombre completo.",
        });
        return;
      }
  
      if (!isValidName(nombre)) {
        Swal.fire({
          icon: "error",
          title: "Nombre inválido",
          text: "El nombre no puede contener números ni caracteres no válidos.",
        });
        return;
      }
  
      if (!isValidEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Correo inválido",
          text: "Por favor, ingresa un correo válido.",
        });
        return;
      }
  
      if (!mensaje) {
        Swal.fire({
          icon: "error",
          title: "Mensaje requerido",
          text: "Por favor, escribe un mensaje.",
        });
        return;
      }
  
      // Enviar datos usando Fetch API
      fetch("https://formspree.io/f/mrbznwjy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, mensaje }),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "¡Mensaje enviado!",
              text: "Gracias por contactarnos. Te responderemos pronto.",
            });
            form.reset(); 
          } else {
            Swal.fire({
              icon: "error",
              title: "Error en el envío",
              text: "Hubo un problema. Por favor, intenta nuevamente.",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo establecer conexión. Intenta más tarde.",
          });
          console.error("Error:", error);
        });
    });
  
    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email); // Retorna true si el correo es válido
    }
  
    // Función para validar que el nombre no contenga números ni caracteres no válidos
    function isValidName(nombre) {
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'´]+$/; // Letras, espacios y caracteres especiales comunes
      return nameRegex.test(nombre);
    }
  });
  