document.getElementById("btnPerfil").addEventListener("click", function(e) {
    e.preventDefault(); // impede o link de abrir direto

    alert("Seja bem-vindo à área de login!");

    let temLogin = confirm("Você já possui login?");

    if (temLogin) {
        
        window.location.href = "./LOGIN/login.html";
    } else {
        
        let querCadastrar = confirm("Gostaria de fazer o cadastro?");

        if (querCadastrar) {
           
            window.location.href = "cadastro.html";
        } else {
            
            alert("Tudo bem! Voltando para o site.");
        }
    }
});
