const buttons = document.querySelectorAll('.map-button');

buttons.forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty('--x', `${event.clientX - rect.left}px`);
    button.style.setProperty('--y', `${event.clientY - rect.top}px`);
  });

  button.addEventListener('click', (event) => {
    const isNewTabIntent = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1;
    if (isNewTabIntent) return;

    event.preventDefault();
    const rect = button.getBoundingClientRect();
    const clientX = event.clientX || rect.left + rect.width / 2;
    const clientY = event.clientY || rect.top + rect.height / 2;
    button.style.setProperty('--x', `${clientX - rect.left}px`);
    button.style.setProperty('--y', `${clientY - rect.top}px`);
    button.classList.add('is-pressed');

    window.setTimeout(() => {
      window.open(button.href, button.target || '_self', 'noopener,noreferrer');
      button.classList.remove('is-pressed');
    }, 180);
  });
});
