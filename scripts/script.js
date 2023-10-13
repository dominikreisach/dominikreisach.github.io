// lazyload
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
      observer.unobserve(lazyImage);
    }
  });
});

const lazyImages = document.querySelectorAll(".lazy");
lazyImages.forEach((lazyImage) => {
  observer.observe(lazyImage);
});
// popups
const popupTrigger = document.querySelectorAll(".popup-trigger");
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".close-button");

function openPopup(event) {
  const index = Array.from(popupTrigger).indexOf(event.target);
  popups[index].classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closePopup(event) {
  const index = Array.from(closeButtons).indexOf(event.target);
  popups[index].classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup:not(.hidden)");
    if (openPopups.length > 0) {
      const lastPopup = openPopups[openPopups.length - 1];
      lastPopup.querySelector(".close-button").click();
    }
  }
});
popupTrigger.forEach((element) => element.addEventListener("click", openPopup));
closeButtons.forEach((element) =>
  element.addEventListener("click", closePopup)
);
