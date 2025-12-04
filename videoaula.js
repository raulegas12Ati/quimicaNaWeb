document.addEventListener("DOMContentLoaded", () => {
  // Seleciona elementos da página
  const videoPlayer = document.getElementById("videoPlayer"); // iframe do vídeo
  const videoButtons = document.querySelectorAll(".botoes-2 button"); // botões de tópicos
  const prevBtn = document.getElementById("prevBtn"); // botão anterior
  const nextBtn = document.getElementById("nextBtn"); // botão próximo

  // Objetos com os vídeos separados por tópico
  const videosByTopic = {
    acidos: [
      "https://www.youtube.com/embed/UiL3kzW8gYg?si=D7r0pubbPEqHwhzB",
      "https://www.youtube.com/embed/scJnpGTZHJM?si=BDTgNl7pIXwxf_cu",
      "https://www.youtube.com/embed/yv5168bi1X4?si=JADSSRjHSmD9C6od"
    ],
    sais: [
      "https://www.youtube.com/embed/eqFGa9hcdMc?si=tkqYZytKq8zIaWl8",
      "https://www.youtube.com/embed/hCfQtA3CJk8?si=uKvf0_mR_LgOcre7",
      "https://www.youtube.com/embed/_9_MA74mzoQ?si=VAKd3gR8evoY1efu"
    ],
    bases: [
      "https://www.youtube.com/embed/OaavuFq7yM0?si=u-lEP3D5Y0EPyctq",
      "https://www.youtube.com/embed/Vp4yzPi6Heg?si=TlilE6KrfYvn2RZ_",
      "https://www.youtube.com/embed/N26lTw3uHyU?si=q003PHH3DB7ANkLG"
    ]
  };

  // Variáveis de controle
  let currentTopic = "acidos"; // tópico atual
  let currentIndex = 0;        // índice do vídeo atual

  // Função para trocar o vídeo com efeito de fade
  function fadeVideo(newSrc) {
    videoPlayer.style.transition = "opacity 0.5s"; // define transição
    videoPlayer.style.opacity = 0;                 // fade-out

    setTimeout(() => {
      videoPlayer.src = newSrc; // troca o vídeo
      videoPlayer.style.opacity = 1; // fade-in
    }, 500); // espera meio segundo
  }

  // Função para trocar de tópico
  function changeVideoTopic(topic) {
    currentTopic = topic; // atualiza o tópico
    currentIndex = 0;     // reinicia o índice
    fadeVideo(videosByTopic[topic][currentIndex]); // mostra primeiro vídeo do tópico

    // Atualiza botão ativo
    videoButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`.botoes-2 button[data-target="${topic}"]`);
    if(activeBtn) activeBtn.classList.add("active");
  }

  // Função para próximo vídeo
  function nextVideo() {
    currentIndex++;
    if(currentIndex >= videosByTopic[currentTopic].length) currentIndex = 0; // volta pro início
    fadeVideo(videosByTopic[currentTopic][currentIndex]);
  }

  // Função para vídeo anterior
  function prevVideo() {
    currentIndex--;
    if(currentIndex < 0) currentIndex = videosByTopic[currentTopic].length - 1; // vai pro último
    fadeVideo(videosByTopic[currentTopic][currentIndex]);
  }

  // Eventos dos botões de tópico
  videoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-target");
      changeVideoTopic(topic);
    });
  });

  // Eventos das setas
  prevBtn.addEventListener("click", prevVideo);
  nextBtn.addEventListener("click", nextVideo);

  // Inicializa vídeo
  changeVideoTopic("acidos");
});
