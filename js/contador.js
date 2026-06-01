// Session-aware visit counter for the home page.
// CounterAPI receives one increment per browser session and the value is cached locally.
document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("contador");

  if (!counterElement) {
    return;
  }

  const visitedSessionKey = "visitado_danimonterodev";
  const cachedCountKey = "contador_danimonterodev";
  const cachedCount = sessionStorage.getItem(cachedCountKey);

  if (sessionStorage.getItem(visitedSessionKey) && cachedCount) {
    counterElement.textContent = cachedCount;
    return;
  }

  fetch("https://api.counterapi.dev/v1/danimonterodev/visitas/up")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      const count = data.count ?? data.value;

      if (count === undefined) {
        throw new Error("La API no devolvió count/value");
      }

      counterElement.textContent = count;
      sessionStorage.setItem(visitedSessionKey, "true");
      sessionStorage.setItem(cachedCountKey, String(count));
    })
    .catch((error) => {
      console.error("Error al cargar el contador:", error);
      counterElement.textContent = "Error";
    });
});
