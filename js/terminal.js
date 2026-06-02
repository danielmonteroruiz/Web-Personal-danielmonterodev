// Utilidad heredada para revelar contenido con efecto terminal.
// Se conserva para páginas que puedan volver a usar #terminal-text y #main en el futuro.
const terminalText = document.getElementById("terminal-text");
const terminalWrapper = document.getElementById("terminal");
const mainContent = document.getElementById("main");
const terminalLines = [
  "> Iniciando portafolio...",
  "> Cargando Proyectos [OK]",
  "> Cargando Perfil [OK]",
  "> Bienvenido a DanielMonteroCode",
];

let terminalLineIndex = 0;

function typeTerminalLine() {
  if (!terminalText || !terminalWrapper || !mainContent) {
    return;
  }

  if (terminalLineIndex < terminalLines.length) {
    terminalText.textContent += `${terminalLines[terminalLineIndex]}\n`;
    terminalLineIndex += 1;
    window.setTimeout(typeTerminalLine, 1500);
    return;
  }

  window.setTimeout(() => {
    terminalWrapper.style.display = "none";
    mainContent.style.display = "block";
  }, 1000);
}

window.addEventListener("load", typeTerminalLine);
