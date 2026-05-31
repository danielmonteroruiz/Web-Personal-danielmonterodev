document.addEventListener("DOMContentLoaded", () => {
  const contador = document.getElementById("contador");
  if (!contador) return;

  const visitadaKey = "visitado_danimonterodev";
  const countKey = "contador_danimonterodev";

  const yaVisitado = sessionStorage.getItem(visitadaKey);
  const countGuardado = sessionStorage.getItem(countKey);

  // Si ya contó antes en este navegador, muestra el valor guardado
  if (yaVisitado && countGuardado) {
    contador.textContent = countGuardado;
    return;
  }

  // Primera visita en este navegador: suma 1
  fetch("https://api.counterapi.dev/v1/danimonterodev/visitas/up")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Algunas APIs devuelven count y otras value
      const valor = data.count ?? data.value;

      if (valor === undefined) {
        throw new Error("La API no devolvió count/value");
      }

      contador.textContent = valor;
      sessionStorage.setItem(visitadaKey, "true");
      sessionStorage.setItem(countKey, String(valor));
    })
    .catch((error) => {
      console.error("Error al cargar el contador:", error);
      contador.textContent = "Error";
    });
});