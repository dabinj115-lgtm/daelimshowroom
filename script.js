document.querySelectorAll('.map-button').forEach((button) => {
  button.addEventListener('touchstart', () => button.classList.add('is-touched'), { passive: true });
  button.addEventListener('touchend', () => window.setTimeout(() => button.classList.remove('is-touched'), 220), { passive: true });
});
