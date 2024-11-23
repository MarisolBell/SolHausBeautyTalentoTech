document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");
  
    function mostrarNav() {
      nav.classList.add("visible");
    }
  
    function ocultarNav() {
      nav.classList.remove("visible");
    }
  
    abrir.addEventListener("click", mostrarNav);
    cerrar.addEventListener("click", ocultarNav);
  });
  