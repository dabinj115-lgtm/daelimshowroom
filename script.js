(() => {
  const clearButtonState = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    document.querySelectorAll(".map-button").forEach((button) => {
      button.classList.remove("is-active");
    });
  };

  window.addEventListener("pageshow", clearButtonState);
  window.addEventListener("pagehide", clearButtonState);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") clearButtonState();
  });

  document.querySelectorAll(".map-button").forEach((button) => {
    button.addEventListener("pointerup", () => {
      window.setTimeout(() => button.blur(), 0);
    });

    button.addEventListener("click", () => {
      window.setTimeout(() => button.blur(), 0);
    });
  });
})();
