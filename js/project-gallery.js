const projectCards = Array.from(document.querySelectorAll(".project-card"));
const imageModal = document.querySelector("#image-modal");
const imageModalClose = imageModal?.querySelector(".image-modal-close");
const imageModalBackdrop = imageModal?.querySelector(".image-modal-backdrop");
const imageModalPrev = imageModal?.querySelector(".image-modal-prev");
const imageModalNext = imageModal?.querySelector(".image-modal-next");
const imageModalCarousel = imageModal?.querySelector(".image-modal-carousel");

let activeModalImages = [];
let activeModalIndex = 0;
let modalTransitionTimer = 0;
let syncProjectCarouselHeight = () => {};

const swipeConfig = {
  minDistance: 48,
  maxVerticalDrift: 80,
};

// Adds horizontal swipe navigation while preserving normal vertical page scrolling.
function addSwipeNavigation(element, onSwipeLeft, onSwipeRight) {
  if (!element) {
    return;
  }

  let startX = 0;
  let startY = 0;
  let isTracking = false;

  element.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        return;
      }

      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      isTracking = true;
    },
    { passive: true }
  );

  element.addEventListener(
    "touchend",
    (event) => {
      if (!isTracking || event.changedTouches.length !== 1) {
        return;
      }

      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      isTracking = false;

      if (
        Math.abs(deltaX) < swipeConfig.minDistance ||
        Math.abs(deltaY) > swipeConfig.maxVerticalDrift ||
        Math.abs(deltaX) < Math.abs(deltaY)
      ) {
        return;
      }

      if (deltaX < 0) {
        onSwipeLeft();
        return;
      }

      onSwipeRight();
    },
    { passive: true }
  );
}

// Keeps gallery previews compact: show two thumbnails and summarize the rest with +N.
// Hidden thumbnails remain in the DOM so the modal can still browse the full gallery.
document.querySelectorAll(".project-gallery").forEach((gallery) => {
  const images = Array.from(gallery.querySelectorAll("img"));
  const hiddenImageCount = Math.max(images.length - 2, 0);

  if (hiddenImageCount === 0) {
    return;
  }

  gallery.classList.add("has-more-images");
  gallery.dataset.moreCount = `+${hiddenImageCount}`;

  const moreIndicator = document.createElement("button");
  moreIndicator.className = "gallery-more-count";
  moreIndicator.type = "button";
  moreIndicator.textContent = `+${hiddenImageCount}`;
  moreIndicator.setAttribute(
    "aria-label",
    `Ver ${hiddenImageCount} imagenes mas`
  );

  moreIndicator.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openProjectImage(images[2] ?? images[0]);
  });

  gallery.appendChild(moreIndicator);
});

// Expands or collapses the inline preview gallery inside each project card.
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
    requestAnimationFrame(syncProjectCarouselHeight);
  });
});

// Rebuilds modal slides and assigns spatial classes around the active image.
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

// Applies a visible transition before replacing the active modal image.
const changeModalImage = (nextIndex, direction) => {
  if (!imageModalCarousel || activeModalImages.length === 0) {
    return;
  }

  window.clearTimeout(modalTransitionTimer);
  imageModalCarousel.classList.remove("is-next", "is-prev");
  imageModalCarousel.classList.add(direction === "prev" ? "is-prev" : "is-next");
  imageModalCarousel.classList.add("is-changing");

  modalTransitionTimer = window.setTimeout(() => {
    activeModalIndex = nextIndex;
    renderModalImage();
    requestAnimationFrame(() => {
      imageModalCarousel.classList.remove("is-changing", "is-next", "is-prev");
    });
  }, 320);
};

// Opens the fullscreen modal from a clicked thumbnail or +N preview indicator.
const openProjectImage = (image) => {
  if (!imageModal) {
    return;
  }

  const gallery = image.closest(".project-gallery");
  activeModalImages = Array.from(gallery?.querySelectorAll("img") || []);
  activeModalIndex = Math.max(activeModalImages.indexOf(image), 0);
  imageModal.hidden = false;
  window.clearTimeout(modalTransitionTimer);
  imageModalCarousel?.classList.remove("is-changing", "is-next", "is-prev");
  renderModalImage();
};

window.openProjectImage = openProjectImage;

// Turns every gallery thumbnail into a modal trigger.
document.querySelectorAll(".project-gallery img").forEach((image) => {
  image.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openProjectImage(image);
  });
});

// Resets the modal state and clears pending transitions.
const closeImageModal = () => {
  if (!imageModal || !imageModalCarousel) {
    return;
  }

  imageModal.hidden = true;
  imageModalCarousel.innerHTML = "";
  imageModalCarousel.classList.remove("is-changing", "is-next", "is-prev");
  activeModalImages = [];
  activeModalIndex = 0;
  window.clearTimeout(modalTransitionTimer);
};

imageModalClose?.addEventListener("click", closeImageModal);
imageModalBackdrop?.addEventListener("click", closeImageModal);

// Modal navigation buttons cycle through every image in the current project gallery.
imageModalPrev?.addEventListener("click", () => {
  if (activeModalImages.length === 0) {
    return;
  }

  changeModalImage(
    (activeModalIndex - 1 + activeModalImages.length) % activeModalImages.length,
    "prev"
  );
});

imageModalNext?.addEventListener("click", () => {
  if (activeModalImages.length === 0) {
    return;
  }

  changeModalImage((activeModalIndex + 1) % activeModalImages.length, "next");
});

addSwipeNavigation(
  imageModalCarousel,
  () => imageModalNext?.click(),
  () => imageModalPrev?.click()
);

const prevButton = document.querySelector(".carousel-control-prev");
const nextButton = document.querySelector(".carousel-control-next");
const projectsCarousel = document.querySelector("#projects-carousel");

if (projectCards.length > 0 && prevButton && nextButton) {
  let activeIndex = 0;
  const mobileProjectsQuery = window.matchMedia("(max-width: 768px)");
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

  // Updates the 3D carousel classes: left, center, right and hidden positions.
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

    requestAnimationFrame(syncProjectCarouselHeight);
  };

  // Keeps the carousel wrapper height aligned with visible cards.
  // Desktop uses the tallest card to avoid clipping side cards; mobile uses the active card.
  syncProjectCarouselHeight = () => {
    if (!projectsCarousel) {
      return;
    }

    const activeCard = projectCards[activeIndex];

    if (!activeCard) {
      return;
    }

    if (mobileProjectsQuery.matches) {
      projectsCarousel.style.height = `${activeCard.offsetHeight}px`;
      return;
    }

    const tallestCardHeight = Math.max(
      ...projectCards.map((card) => card.offsetHeight)
    );
    projectsCarousel.style.height = `${tallestCardHeight}px`;
  };

  prevButton.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + projectCards.length) % projectCards.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % projectCards.length;
    updateCarousel();
  });

  addSwipeNavigation(
    projectsCarousel,
    () => nextButton.click(),
    () => prevButton.click()
  );

  // Keyboard navigation works for both the modal and the project carousel.
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

  window.addEventListener("resize", syncProjectCarouselHeight);
  mobileProjectsQuery.addEventListener?.("change", syncProjectCarouselHeight);
  updateCarousel();
}
