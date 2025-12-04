const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    login()
}
async function login() {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value



    if (email === "" || password === "") {
        alert("Preencha TODAS as informações!")
        return
    }

    const users = {
        email,
        password
    }

    console.log(users)

    //enviar o user para o backend
    const response = await fetch("https://quimicanawebback.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ users })
    }).then(response => response.json())

    //Se existir response.message significa que o usuário errou
    if (response.message) {
        alert(response.message)
        window.location.reload()
        return
    }

    const {id, name} = response
    //Desestruturar id e email de response
    //Guardar a informação em section storage converida em json
    sessionStorage.setItem("user", JSON.stringify({ id, name }))
    alert("Login realizado com sucesso")

    window.location.href = "../index.html"
}


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
        <a href="../index.html">
          <img src="./logo.png" alt="Logo">
        </a>
      </div>
      <ul>
        <li><a href="../Tabela_interativa.html">TABELA</a></li>
        <li><a href="../Temas.html">TEMAS</a></li>
        <li><a href="../TQuiz.html">QUIZ</a></li>
        <li><a href="../SN.html">CRIADORES</a></li>
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
