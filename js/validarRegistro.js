document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#register-form");
    const userInput = form.querySelector("#register-user");
    const emailInput = form.querySelector("#email");
    const passwordInput = form.querySelector("#register-password");
    const confirmPasswordInput = form.querySelector("#confirm-password");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const userName = userInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      // Validaciones
      if (!userName) {
        Swal.fire({
          icon: "error",
          title: "Nombre requerido",
          text: "Por favor, ingresa tu nombre completo.",
        });
        return;
      }

      if (!isValidName(userName)) {
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
          text: "Por favor, ingresa un correo electrónico válido.",
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

      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Contraseñas no coinciden",
          text: "Por favor, verifica que ambas contraseñas sean iguales.",
        });
        return;
      }

      // Simular éxito de registro
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
      }).then(() => {
        form.reset();
      });
    });

    // Función para validar el formato del correo electrónico
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Función para validar que el nombre no contenga números ni caracteres no válidos
    function isValidName(name) {
      const nameRegex = /^[a-zA-ZÀ-ÿ\s'´]+$/;
      return nameRegex.test(name);
    }
  });