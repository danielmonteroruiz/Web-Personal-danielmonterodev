// Rotates the specialization text on the home page.
// The animation is intentionally lightweight: no dependencies, just timed text swaps.
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
