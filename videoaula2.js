document.addEventListener("DOMContentLoaded", () => {

  const videoPlayer = document.getElementById("videoPlayer");
  const videoButtons = document.querySelectorAll(".botoes-2 button");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Vídeos separados por tópico
  const videosByTopic = {
    acidos: [
      "https://www.youtube.com/embed/DZZbjdvXBPE?si=SKO5_PJOzkweBWaE",
      "https://www.youtube.com/embed/Q-CwtK3yHIg?si=SgqAyTkcJt_vcy3n",
      "https://www.youtube.com/embed/4ggxiI48QOk?si=LDjKk63ov_vNPLvx"
    ],
    sais: [
      "https://www.youtube.com/embed/52ABzqF9PBo?si=JI1fFLyuHiS1zMER",
      "https://www.youtube.com/embed/zQnqlKm-aGg?si=8cNq_Rhvg5lgZO2k",
      "https://www.youtube.com/embed/QyiH608y_Gg?si=gH1-kTNL1SX7skpo"
    ],
    bases: [
      "https://www.youtube.com/embed/-P5meP684Kg?si=zsDI3UVjkjya2ir5",
      "https://www.youtube.com/embed/itAsRbbOIKY?si=CMz97A5ZIYMi30z1",
      "https://www.youtube.com/embed/IKoUj8okqPQ?si=RFBntoJlSoZNtrP6"
    ]
  };

  let currentTopic = "acidos";
  let currentIndex = 0;

  function fadeVideo(newSrc) {
    // Faz fade-out
    videoPlayer.style.transition = "opacity 0.5s";
    videoPlayer.style.opacity = 0;

    // Depois de 500ms troca o vídeo e faz fade-in
    setTimeout(() => {
      videoPlayer.src = newSrc;
      videoPlayer.style.opacity = 1;
    }, 500);
  }

  function changeVideoTopic(topic) {
    currentTopic = topic;
    currentIndex = 0;
    fadeVideo(videosByTopic[topic][currentIndex]);

    // Atualiza botão ativo
    videoButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`.botoes-2 button[data-target="${topic}"]`);
    if(activeBtn) activeBtn.classList.add("active");
  }

  function nextVideo() {
    currentIndex++;
    if(currentIndex >= videosByTopic[currentTopic].length) currentIndex = 0;
    fadeVideo(videosByTopic[currentTopic][currentIndex]);
  }

  function prevVideo() {
    currentIndex--;
    if(currentIndex < 0) currentIndex = videosByTopic[currentTopic].length - 1;
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

  // Vídeo inicial
  changeVideoTopic("acidos");

});
