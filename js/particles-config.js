// Shared particles.js configuration for the portfolio background.
// Every page includes a #particles-bg element, so this file can be reused safely.
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
