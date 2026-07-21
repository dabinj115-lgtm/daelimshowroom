(() => {
  const buttons = [...document.querySelectorAll(".map-button")];

  const clearButtonState = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    buttons.forEach((button) => {
      button.classList.remove("is-touching", "is-navigating");
    });
  };

  buttons.forEach((button) => {
    const startTouch = () => {
      button.classList.remove("is-navigating");
      button.classList.add("is-touching");
    };

    const cancelTouch = () => {
      if (!button.classList.contains("is-navigating")) {
        button.classList.remove("is-touching");
      }
    };

    button.addEventListener("pointerdown", startTouch, { passive: true });
    button.addEventListener("pointercancel", cancelTouch, { passive: true });
    button.addEventListener("pointerleave", cancelTouch, { passive: true });

    button.addEventListener("touchstart", startTouch, { passive: true });
    button.addEventListener("touchcancel", cancelTouch, { passive: true });

    button.addEventListener("click", (event) => {
      // 클릭 후 외부 페이지로 전환되는 동안 그라데이션 완료 상태를 유지.
      button.classList.remove("is-touching");
      button.classList.add("is-navigating");

      // 브라우저가 페인트할 시간을 확보한 뒤 이동.
      const href = button.getAttribute("href");
      const target = button.getAttribute("target");

      if (href && (!target || target === "_self")) {
        event.preventDefault();
        window.setTimeout(() => {
          window.location.href = href;
        }, 220);
      }
    });
  });

  // 페이지로 다시 돌아온 순간에만 선택 효과를 제거.
  window.addEventListener("pageshow", clearButtonState);
})();
