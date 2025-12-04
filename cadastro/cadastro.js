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

