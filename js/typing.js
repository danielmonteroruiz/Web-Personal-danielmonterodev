// Rota el texto de especialización en la página de inicio.
// La animación es ligera a propósito: sin dependencias, solo cambios de texto temporizados.
const typingTarget = document.querySelector(".typing");
const specializationWords = [
  "Java",
  "Kotlin",
  "SQL y PostgreSQL",
  "Flutter",
  "Jetpack Compose",
  "Clean Code",
  "IA",
  "Videojuegos 2D y 3D",
  "Unity",
  "HTML",
  "CSS",
  "Responsive Design",
  "Spring Boot",
  "Git",
  "GitHub",
  "Postman",
];

let activeSpecializationIndex = 0;

function updateTypingText() {
  if (!typingTarget) {
    return;
  }

  typingTarget.textContent = specializationWords[activeSpecializationIndex];
  activeSpecializationIndex =
    (activeSpecializationIndex + 1) % specializationWords.length;

  window.setTimeout(updateTypingText, 2000);
}

updateTypingText();
