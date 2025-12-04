//Coleta o valor do botão e garante que ele não atualize a pagina
const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    CadastroUsuario()
}

//coleta e envia os dasos do cadastro para o backend
async function CadastroUsuario() {
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    if (name === "" || email === "" || password === "") {
        alert("Preencha todos os campos!")
        return
    }

    const users = {
        name,
        email,
        password
    }

    //envia o objeto users para o backend
    const response = await fetch("http://localhost:3333/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ users })
    }).then(response => response.json())

    const { message, error } = response

    if(error){
        alert(error)
        return
    }
   
    alert(message)

    //limpar os campos
    document.querySelector("#name").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#password").value = ""
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
        <a href="./index.html">
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
