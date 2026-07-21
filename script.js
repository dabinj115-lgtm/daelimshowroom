(() => {
  const buttons = [...document.querySelectorAll(".map-button")];

  const setTouchOrigin = (button, event) => {
    const rect = button.getBoundingClientRect();
    const point = event.touches?.[0] ?? event;
    const x = Math.max(0, Math.min(rect.width, point.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, point.clientY - rect.top));

    button.style.setProperty("--touch-x", `${x}px`);
    button.style.setProperty("--touch-y", `${y}px`);
  };

  const resetButtons = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    buttons.forEach((button) => {
      button.style.removeProperty("--touch-x");
      button.style.removeProperty("--touch-y");
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;
      setTouchOrigin(button, event);
    }, { passive: true });

    button.addEventListener("touchstart", (event) => {
      setTouchOrigin(button, event);
    }, { passive: true });
  });

  // 외부 앱/페이지에서 돌아오면 애니메이션 없이 즉시 원래 상태로 복귀
  window.addEventListener("pageshow", resetButtons);
  window.addEventListener("pagehide", resetButtons);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetButtons();
    }
  });
})();
