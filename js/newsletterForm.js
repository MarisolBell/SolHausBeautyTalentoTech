document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
    const emailInput = form.querySelector(".newsletter-input");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); 
  
      // Validación del campo de correo.
      const email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Correo inválido",
          text: "Por favor, ingresa un correo válido.",
        });
        return; 
      }
  
      
      fetch("https://formspree.io/f/mrbznwjy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "¡Suscripción exitosa!",
              text: "Gracias por suscribirte. Te mantendremos informado.",
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
  
    // Función para validar el formato del correo electrónico.
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email); // Retorna true si el correo es válido.
    }
  });
  