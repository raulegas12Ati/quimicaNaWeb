document.addEventListener("DOMContentLoaded", () => {

    const videoPlayer = document.getElementById("videoPlayer");
    const videoButtons = document.querySelectorAll(".botoes-2 button");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    // Vídeos separados por tópico
    const videosByTopic = {
      acidos: [
        "https://www.youtube.com/embed/WRTwCeW_dv4?si=pthghcFO_QhwHyc_",
        "https://www.youtube.com/embed/G1PY70G77a0?si=4OMAq2V1Nww62wYL",
        "https://www.youtube.com/embed/c_jzS4NDeSI?si=koRIBd8SJPd-pMLu"
      ],
      sais: [
        "https://www.youtube.com/embed/5Qjt7yD-xyo?si=8KmKbru4E_QFKko2",
        "https://www.youtube.com/embed/PX_eFPRjlZ0?si=gjmdlW0FPzKXrGG0",
        "https://www.youtube.com/embed/XrxFcAcq6LE?si=Nlf_g9zVb19UIgS8"
      ],
      bases: [
        "https://www.youtube.com/embed/Kun8xsd4i1M?si=DNSIylgeU7v0S6Ru",
        "https://www.youtube.com/embed/uMrI_mHi2NI?si=ZsHK0-LYbZuMdGfX",
        "https://www.youtube.com/embed/x24XV31QueE?si=6JsJY8Jn2_QfjHp4"
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
  