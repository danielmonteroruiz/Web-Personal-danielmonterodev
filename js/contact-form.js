// Gestiona el envío del formulario sin salir del portfolio.
// El formulario se envía a FormSubmit, pero la respuesta se consume con fetch
// para mostrar una confirmación local en lugar de redirigir al usuario.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  if (!form || !toast) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then(() => {
        toast.classList.add("show");

        window.setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);

        form.reset();
      })
      .catch((error) => {
        console.error("No se pudo enviar el formulario:", error);
      });
  });
});
