document.querySelectorAll('.map-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    const isTouchLike = window.matchMedia('(hover: none)').matches;
    if (!isTouchLike) return;

    event.preventDefault();
    button.classList.add('is-pressed');

    const url = button.href;
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      button.classList.remove('is-pressed');
    }, 180);
  });
});
