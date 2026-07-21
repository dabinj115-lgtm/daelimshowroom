(() => {
  const buttons = [...document.querySelectorAll(".map-button")];
  const timers = new WeakMap();

  const resetButtonImmediately = (button) => {
    const timer = timers.get(button);
    if (timer) {
      window.clearTimeout(timer);
      timers.delete(button);
    }

    button.classList.add("circle-fill-reset");
    button.classList.remove("circle-fill-active");

    // Safari에서도 역방향 축소 없이 즉시 원래 상태로 고정
    void button.offsetWidth;
    button.classList.remove("circle-fill-reset");
  };

  const resetAllButtons = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    buttons.forEach(resetButtonImmediately);
  };

  buttons.forEach((button) => {
    const activate = () => {
      resetAllButtons();

      // 초기 scale(0)을 먼저 그린 뒤 중앙 원 확대 시작
      requestAnimationFrame(() => {
        button.classList.add("circle-fill-active");
      });

      // 링크 이동을 방해하지 않으면서 화면에 남아 있을 때만 자연스럽게 해제
      const timer = window.setTimeout(() => {
        resetButtonImmediately(button);
      }, 260);

      timers.set(button, timer);
    };

    button.addEventListener("touchstart", activate, { passive: true });
    button.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse") activate();
    }, { passive: true });

    button.addEventListener("touchcancel", () => {
      resetButtonImmediately(button);
    }, { passive: true });

    button.addEventListener("pointercancel", () => {
      resetButtonImmediately(button);
    }, { passive: true });
  });

  // 외부 앱/페이지에서 돌아오면 즉시 흰 버튼
  window.addEventListener("pageshow", resetAllButtons);
  window.addEventListener("pagehide", resetAllButtons);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetAllButtons();
    }
  });
})();
