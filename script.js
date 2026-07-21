(() => {
  const buttons = [...document.querySelectorAll(".map-button")];
  let navigationTimer = null;

  const resetButtons = () => {
    if (navigationTimer) {
      window.clearTimeout(navigationTimer);
      navigationTimer = null;
    }

    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();

    buttons.forEach((button) => {
      button.classList.remove(
        "is-touching",
        "is-navigating",
        "is-pressing"
      );
      button.style.removeProperty("--touch-x");
      button.style.removeProperty("--touch-y");
    });
  };

  const setTouchOrigin = (button, event) => {
    const rect = button.getBoundingClientRect();
    const point = event.touches?.[0] ?? event;
    const x = Math.max(0, Math.min(rect.width, point.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, point.clientY - rect.top));

    button.style.setProperty("--touch-x", `${x}px`);
    button.style.setProperty("--touch-y", `${y}px`);
  };

  buttons.forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;
      resetButtons();
      setTouchOrigin(button, event);
      button.classList.add("is-pressing");
    }, { passive: true });

    button.addEventListener("touchstart", (event) => {
      resetButtons();
      setTouchOrigin(button, event);
      button.classList.add("is-pressing");
    }, { passive: true });

    const cancelPress = () => {
      button.classList.remove("is-pressing");
      button.blur();
    };

    button.addEventListener("pointercancel", cancelPress, { passive: true });
    button.addEventListener("touchcancel", cancelPress, { passive: true });

    button.addEventListener("click", (event) => {
      const href = button.getAttribute("href");
      const target = button.getAttribute("target");

      if (!href || (target && target !== "_self")) return;

      event.preventDefault();

      // 클릭 순간 효과가 안 보이는 문제 방지
      if (!button.classList.contains("is-pressing")) {
        const rect = button.getBoundingClientRect();
        button.style.setProperty("--touch-x", `${rect.width / 2}px`);
        button.style.setProperty("--touch-y", `${rect.height / 2}px`);
        button.classList.add("is-pressing");
      }

      navigationTimer = window.setTimeout(() => {
        window.location.assign(href);
      }, 240);
    });
  });

  // 앱/외부 페이지에서 돌아왔을 때 bfcache에 남은 선택 상태 제거
  window.addEventListener("pageshow", resetButtons);
  window.addEventListener("pagehide", resetButtons);
  window.addEventListener("popstate", resetButtons);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      resetButtons();
    }
  });
})();
