// Configuración compartida de particles.js para el fondo del portfolio.
// Todas las páginas incluyen #particles-bg, por eso este archivo se reutiliza con seguridad.
if (window.particlesJS) {
  particlesJS("particles-bg", {
    particles: {
      number: {
        value: 30,
      },
      color: {
        value: "#08d3f7",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.2,
      },
      size: {
        value: 1.8,
      },
      move: {
        enable: true,
        speed: 0.4,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: false,
        },
      },
    },
    retina_detect: true,
  });
}
