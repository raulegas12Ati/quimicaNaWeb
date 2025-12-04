// Carrossel de notícias
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

// FAQ interativo
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

function init() {
  const menu = document.querySelector(".AjusteLogin")

  //Recupera o user do SectionStore e convert para objeto
  const user = JSON.parse(sessionStorage.getItem("user"))

  //Verificar se existe um usuario para que o menu seja alterado
  if (user) {
    menu.innerHTML += `
      <div class="logo">
        <a href="./index.html">
          <img src="./logo.png" alt="Logo">
        </a>
      </div>
      <ul>
        <li><a href="./Tabela_interativa.html">TABELA</a></li>
        <li><a href="./Temas.html">TEMAS</a></li>
        <li><a href="./TQuiz.html">QUIZ</a></li>
        <li><a href="./SN.html">CRIADORES</a></li>
      </ul>
      <li>
      <li>
        <p>Ola ${user.name}</p>
        <button id="logout">Sair</button>
      </li>
        `

    const logoutButton = document.querySelector("#logout")
    logoutButton.addEventListener("click", logout)

    return
  }

  //Se o usuário não estver logado
  menu.innerHTML += `   
      <div class="logo">
        <a href="./index.html">
          <img src="./logo.png" alt="Logo">
        </a>
      </div>
      <ul>
        <li><a href="./Tabela_interativa.html">TABELA</a></li>
        <li><a href="./Temas.html">TEMAS</a></li>
        <li><a href="./TQuiz.html">QUIZ</a></li>
        <li><a href="./SN.html">CRIADORES</a></li>
      </ul>
      <li>
      <li>
        <a href="./paginasLogin/login.html" class="btn-login">
          <img src="./Profile.png" alt="">
        </a>
      </li>
    `
}

init()

function logout() {
  //remove o user do sessionStorage
  sessionStorage.removeItem("user")
  alert("Volte sempre!")
  window.location.reload()
}
