const toTop = document.querySelector("#toTop");

/**
 * @event
 * @description Event listener for automatic scrolling to the top.
 */
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 1000) {
    toTop.style.opacity = ".6";
    toTop.style.cursor = "pointer";
  } else {
    toTop.style.opacity = "0";
    toTop.style.cursor = "default";
  }
});

/**
 * @event
 * @description Event listener for clicking on the "toTop" button.
 */
toTop.addEventListener("click", () => {
  if (toTop.style.opacity !== "0") {
    window.scrollTo(0, 0);
  }
});
