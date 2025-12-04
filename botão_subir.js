document.addEventListener('DOMContentLoaded', () => {
  const btnSubir = document.querySelector('.subir-btn');

  if (btnSubir) {
    btnSubir.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.botoes button[data-target]');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const id = botao.getAttribute('data-target');
      const alvo = document.getElementById(id);
      if (alvo) {
        alvo.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
