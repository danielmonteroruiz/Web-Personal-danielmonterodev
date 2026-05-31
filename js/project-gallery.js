const projectCards = Array.from(document.querySelectorAll(".project-card"));
const imageModal = document.querySelector("#image-modal");
const imageModalClose = imageModal?.querySelector(".image-modal-close");
const imageModalBackdrop = imageModal?.querySelector(".image-modal-backdrop");
const imageModalPrev = imageModal?.querySelector(".image-modal-prev");
const imageModalNext = imageModal?.querySelector(".image-modal-next");
const imageModalCarousel = imageModal?.querySelector(".image-modal-carousel");

let activeModalImages = [];
let activeModalIndex = 0;

document.querySelectorAll(".gallery-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const gallery = card?.querySelector(".project-gallery");

    if (!gallery) {
      return;
    }

    const isOpen = gallery.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "Ocultar imagenes" : "Ver imagenes";
  });
});

const renderModalImage = () => {
  if (!imageModalCarousel || activeModalImages.length === 0) {
    return;
  }

  const getRelativeIndex = (index) => {
    let difference = index - activeModalIndex;
    const half = activeModalImages.length / 2;

    if (difference > half) {
      difference -= activeModalImages.length;
    }

    if (difference < -half) {
      difference += activeModalImages.length;
    }

    return difference;
  };

  imageModalCarousel.innerHTML = "";

  activeModalImages.forEach((image, index) => {
    const slide = document.createElement("div");
    const slideImage = document.createElement("img");
    const relativeIndex = getRelativeIndex(index);

    slide.className = "image-modal-slide";
    slideImage.src = image.src;
    slideImage.alt = image.alt;

    if (relativeIndex === 0) {
      slide.classList.add("is-center");
    } else if (relativeIndex === -1) {
      slide.classList.add("is-left");
    } else if (relativeIndex === 1) {
      slide.classList.add("is-right");
    } else if (relativeIndex < 0) {
      slide.classList.add("is-hidden-left");
    } else {
      slide.classList.add("is-hidden-right");
    }

    slide.appendChild(slideImage);
    imageModalCarousel.appendChild(slide);
  });
};

const openProjectImage = (image) => {
  if (!imageModal) {
    return;
  }

  const gallery = image.closest(".project-gallery");
  activeModalImages = Array.from(gallery?.querySelectorAll("img") || []);
  activeModalIndex = Math.max(activeModalImages.indexOf(image), 0);
  imageModal.hidden = false;
  renderModalImage();
};

window.openProjectImage = openProjectImage;

document.querySelectorAll(".project-gallery img").forEach((image) => {
  image.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openProjectImage(image);
  });
});

const closeImageModal = () => {
  if (!imageModal || !imageModalCarousel) {
    return;
  }

  imageModal.hidden = true;
  imageModalCarousel.innerHTML = "";
  activeModalImages = [];
  activeModalIndex = 0;
};

imageModalClose?.addEventListener("click", closeImageModal);
imageModalBackdrop?.addEventListener("click", closeImageModal);

imageModalPrev?.addEventListener("click", () => {
  if (activeModalImages.length === 0) {
    return;
  }

  activeModalIndex = (activeModalIndex - 1 + activeModalImages.length) % activeModalImages.length;
  renderModalImage();
});

imageModalNext?.addEventListener("click", () => {
  if (activeModalImages.length === 0) {
    return;
  }

  activeModalIndex = (activeModalIndex + 1) % activeModalImages.length;
  renderModalImage();
});

const prevButton = document.querySelector(".carousel-control-prev");
const nextButton = document.querySelector(".carousel-control-next");

if (projectCards.length > 0 && prevButton && nextButton) {
  let activeIndex = 0;
  const positionClasses = [
    "is-left",
    "is-center",
    "is-right",
    "is-hidden-left",
    "is-hidden-right",
  ];

  const getRelativeIndex = (index) => {
    let difference = index - activeIndex;
    const half = projectCards.length / 2;

    if (difference > half) {
      difference -= projectCards.length;
    }

    if (difference < -half) {
      difference += projectCards.length;
    }

    return difference;
  };

  const updateCarousel = () => {
    projectCards.forEach((card, index) => {
      const relativeIndex = getRelativeIndex(index);
      card.classList.remove(...positionClasses);

      if (relativeIndex === 0) {
        card.classList.add("is-center");
      } else if (relativeIndex === -1) {
        card.classList.add("is-left");
      } else if (relativeIndex === 1) {
        card.classList.add("is-right");
      } else if (relativeIndex < 0) {
        card.classList.add("is-hidden-left");
      } else {
        card.classList.add("is-hidden-right");
      }
    });
  };

  prevButton.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + projectCards.length) % projectCards.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % projectCards.length;
    updateCarousel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageModal && !imageModal.hidden) {
      closeImageModal();
      return;
    }

    if (event.key === "ArrowLeft" && imageModal && !imageModal.hidden) {
      imageModalPrev?.click();
      return;
    }

    if (event.key === "ArrowRight" && imageModal && !imageModal.hidden) {
      imageModalNext?.click();
      return;
    }

    if (event.key === "ArrowLeft") {
      prevButton.click();
    }

    if (event.key === "ArrowRight") {
      nextButton.click();
    }
  });

  updateCarousel();
}
