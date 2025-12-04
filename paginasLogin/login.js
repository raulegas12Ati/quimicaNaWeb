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
    const response = await fetch("http://localhost:3333/login", {
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