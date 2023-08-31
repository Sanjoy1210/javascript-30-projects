(function (window) {
  const panels = document.querySelectorAll(".panel");
  
  function toggleOpen(e) {
    this.classList.toggle("open");
    panels.forEach(panel => panel !== this && panel.classList.remove("open"));
  }

  function toggleActive(e) {
    if (e.propertyName.includes("flex")) {
      this.classList.toggle("open-active");
    }
  }

  panels.forEach((panel) => {
    panel.addEventListener("click", toggleOpen);
    panel.addEventListener("transitionend", toggleActive);
  });
}(window));
