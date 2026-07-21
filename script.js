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

      // Safari의 bfcache에서도 축소 애니메이션이 재생되지 않게 즉시 반영
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

      button.classList.add("circle-fill-active");

      // 중앙 원이 충분히 퍼진 뒤 같은 탭에서 이동
      navigationTimer = window.setTimeout(() => {
        navigationTimer = null;
        window.location.assign(href);
      }, 290);
    });
  });

  // 페이지가 사라지는 순간 상태를 무애니메이션으로 제거해
  // 돌아왔을 때 검정 버튼/축소 효과가 남지 않도록 처리
  window.addEventListener("pagehide", resetButtonsImmediately);
  window.addEventListener("pageshow", resetButtonsImmediately);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      resetButtonsImmediately();
    } else {
      resetButtonsImmediately();
    }
  });
})();
