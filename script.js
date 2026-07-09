(() => {
  const buttons = document.querySelectorAll('.map-button');
  buttons.forEach((button) => {
    button.addEventListener('pointerdown', () => button.classList.add('is-touching'));
    const clear = () => button.classList.remove('is-touching');
    button.addEventListener('pointerup', clear);
    button.addEventListener('pointercancel', clear);
    button.addEventListener('pointerleave', clear);
  });
})();
