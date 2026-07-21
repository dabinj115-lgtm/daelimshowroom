(() => {
  const buttons = [...document.querySelectorAll(".map-button")];
  let navigationTimer = null;

  const resetButtonsImmediately = () => {
    if (navigationTimer) {
      window.clearTimeout(navigationTimer);
      navigationTimer = null;
    }

    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    buttons.forEach((button) => {
      button.classList.add("circle-fill-reset");
      button.classList.remove("circle-fill-active");

      // 스타일을 즉시 확정해 복귀 시 축소 애니메이션이 나오지 않게 함.
      void button.offsetWidth;
      button.classList.remove("circle-fill-reset");
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const href = button.getAttribute("href");
      if (!href) return;

      event.preventDefault();
      resetButtonsImmediately();

      // 초기 scale(0)을 실제 화면에 먼저 그린 뒤 scale(1) 적용.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          button.classList.add("circle-fill-active");

          navigationTimer = window.setTimeout(() => {
            navigationTimer = null;
            window.location.assign(href);
          }, 390);
        });
      });
    });
  });

  // 앱/외부 페이지에서 돌아오면 검정 상태 없이 즉시 흰 버튼.
  window.addEventListener("pagehide", resetButtonsImmediately);
  window.addEventListener("pageshow", resetButtonsImmediately);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetButtonsImmediately();
    }
  });
})();
