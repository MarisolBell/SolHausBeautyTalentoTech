document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
    const userInput = form.querySelector("#user");
    const passwordInput = form.querySelector("#password");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const userName = userInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Validaciones
      if (!userName) {
        Swal.fire({
          icon: "error",
          title: "Usuario requerido",
          text: "Por favor, ingresa tu nombre de usuario.",
        });
        return;
      }
  
      if (!isValidName(userName)) {
        Swal.fire({
          icon: "error",
          title: "Usuario inválido",
          text: "El nombre de usuario no puede contener números ni caracteres no válidos.",
        });
        return;
      }
  
      if (!password) {
        Swal.fire({
          icon: "error",
          title: "Contraseña requerida",
          text: "Por favor, ingresa tu contraseña.",
        });
        return;
      }
  
      if (password.length < 8) {
        Swal.fire({
          icon: "error",
          title: "Contraseña débil",
          text: "La contraseña debe tener al menos 8 caracteres.",
        });
        return;
      }
  
      // Simular éxito de inicio de sesión
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "Has ingresado correctamente a tu cuenta.",
      }).then(() => {
        form.reset();
      });
    });
  
    // Función para validar que el nombre no contenga números ni caracteres no válidos
    function isValidName(name) {
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'´]+$/;
      return nameRegex.test(name);
    }
  });
  