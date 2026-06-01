// Handles the contact form submission without leaving the portfolio page.
// The form is still posted to FormSubmit, but the response is consumed with fetch
// so the user gets a local toast confirmation instead of a redirect.
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
