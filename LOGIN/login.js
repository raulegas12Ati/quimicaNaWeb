document.addEventListener("DOMContentLoaded", function () {
    const botaoLogin = document.querySelector(".btn-login");


    botaoLogin.addEventListener("click", function () {

        // pegar email e senha
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;

        // validar campos vazios
        if (email === "" || senha === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // Mensagem de boas-vindas
        alert("Seja bem-vindo!");

        // pedir o nome do usuário
        let nome = prompt("Digite seu nome para completar o login:");

        if (nome === null || nome.trim() === "") {
            alert("O login foi cancelado porque o nome não foi informado.");
            return;
        }

        // salvar o nome no localStorage
        localStorage.setItem("usuarioNome", nome);

        // Redirecionar para página inicial
        window.location.href = "../index.html";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let nome = localStorage.getItem("usuarioNome");

    if (nome) {
        document.getElementById("usuarioLogado").textContent =
            "Olá, " + nome + "!";
    }
});
