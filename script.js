(() => {
  const buttons = [...document.querySelectorAll(".map-button")];

  const clearButtonState = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    buttons.forEach((button) => {
      button.classList.remove("is-active", "is-touching");
    });
  };

  buttons.forEach((button) => {
    const press = () => button.classList.add("is-touching");
    const release = () => {
      button.classList.remove("is-touching");
      window.setTimeout(() => button.blur(), 0);
    };

    button.addEventListener("pointerdown", press, { passive: true });
    button.addEventListener("pointerup", release, { passive: true });
    button.addEventListener("pointercancel", release, { passive: true });
    button.addEventListener("pointerleave", release, { passive: true });
    button.addEventListener("touchstart", press, { passive: true });
    button.addEventListener("touchend", release, { passive: true });
    button.addEventListener("touchcancel", release, { passive: true });
    button.addEventListener("click", () => {
      window.setTimeout(clearButtonState, 120);
    });
  });

  window.addEventListener("pageshow", clearButtonState);
  window.addEventListener("pagehide", clearButtonState);
  window.addEventListener("blur", clearButtonState);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") clearButtonState();
  });
})();
