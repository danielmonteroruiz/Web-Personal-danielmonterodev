// Entry-page terminal loader.
// It writes a short startup sequence and redirects to the home page once shown.
const terminal = document.getElementById("terminal");
const loaderLines = [
  "> Iniciando portafolio...",
  "> Cargando Proyectos [OK]",
  "> Cargando Perfil [OK]",
  "> Bienvenido a DanielMonteroCode",
];

let currentLineIndex = 0;

function redirectToHome() {
  localStorage.setItem("animationShown", "true");
  window.setTimeout(() => {
    window.location.href = "home.html";
  }, 1200);
}

function writeNextLoaderLine() {
  if (!terminal) {
    redirectToHome();
    return;
  }

  if (currentLineIndex >= loaderLines.length) {
    redirectToHome();
    return;
  }

  terminal.textContent += `${loaderLines[currentLineIndex]}\n`;
  currentLineIndex += 1;
  window.setTimeout(writeNextLoaderLine, 1200);
}

window.addEventListener("load", () => {
  if (localStorage.getItem("animationShown")) {
    window.location.href = "home.html";
    return;
  }

  writeNextLoaderLine();
});
