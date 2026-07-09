(function(){
  const buttons = document.querySelectorAll('.map-button');
  buttons.forEach((button)=>{
    button.addEventListener('click',(event)=>{
      const url = button.href;
      const target = button.target || '_self';
      event.preventDefault();
      button.classList.add('is-touched');
      window.setTimeout(()=>{
        if(target === '_blank') window.open(url, '_blank', 'noopener,noreferrer');
        else window.location.href = url;
        button.classList.remove('is-touched');
      }, 120);
    });
  });
})();
