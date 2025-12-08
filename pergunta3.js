import { linkAPI } from "./paginasLogin/login.js"
const user = JSON.parse(sessionStorage.getItem("user"))

if (!user) {
  alert("Você precisa fazer login!")
  window.location.href = "../paginasLogin/login.html"
}

const id = user.id
const userName = user.name

const perguntas = [
  {
    texto: "Descreva o modelo de ligação de Lewis e como ele pode ser utilizado para prever a geometria molecular",
    alternativas: ["Ele representa apenas átomos, sem considerar elétrons", "Ele ajuda a visualizar elétrons de valência e prever a geometria molecular", "É um modelo que não tem aplicação prática", "Ele não é relevante para a química moderna"],
    correta: 1
  },
  {
    texto: "Compare e contraste as ligações iônicas e covalentes em termos de formação e propriedades",
    alternativas: ["Ambas são formadas por tranferência de elétrons", "Iônicas envolvem tranferência de elétrons, enquanto covalentes envolvem compartilhamento", "Iônicas são fracas e covalentes são fortes.", "Ambas são sempre encontradas em compostos sólidos."],
    correta: 1
  },
  {
    texto: "O que são forças intermoleculares e como elas influenciam as propriedades físicas das substâncias?",
    alternativas: ["Elas não têm impacto nas propriedades físicas", "Elas são interações que influenciam ponto de ebulição e solubilidade", "Elas só ocorrem em líquidos", "Elas são irrelevantes para a química"],
    correta: 1
  },
  {
    texto: "Explique a teoria da repulsão dos pares de elétrons da camada de valência sua aplicação na previsão da geometria molecular",
    alternativas: ["A teoria ignora a repulsão entre elétrons", "A teoria prevê a geometria com base na repulsão entre pares de elétrons", "A teoria se aplica apenas a moléculas grandes.", "A teoria é usada apenas para ligações covalentes."],
    correta: 1
  },
  {
    texto: "Por que as ligações metalicas são boas em conduzir eletricidade?",
    alternativas: ["Por que elas tem mais elétrons", "Por que elas compartilham elétrons", "Por que elas tem um mar de elétrons entre os átomos", "por que elas formam iôns"],
    correta: 2
  }
]

let numeroPergunta = 0
let contadorAcertos = 0
let jaRespondeu = false

const elementoPergunta = document.getElementById("question")
const elementoOpcoes = document.getElementById("options")
const botaoProximo = document.getElementById("next-btn")
const barraProgresso = document.getElementById("progress-bar")

// Mostra pergunta e atualiza barra
function mostrarPergunta() {
  jaRespondeu = false
  botaoProximo.style.display = "none"

  const pergunta = perguntas[numeroPergunta]
  elementoPergunta.textContent = `${numeroPergunta + 1}. ${pergunta.texto}`
  elementoOpcoes.innerHTML = ""

  pergunta.alternativas.forEach((texto, i) => {
    const botao = document.createElement("div")
    botao.className = "option"
    botao.innerHTML = `<span>${String.fromCharCode(65 + i)}</span> ${texto}`
    botao.onclick = () => verificarResposta(i)
    elementoOpcoes.appendChild(botao)
  })

  barraProgresso.style.width = ((numeroPergunta + 1) / perguntas.length) * 100 + "%"
}

// Verifica resposta
function verificarResposta(indice) {
  if (jaRespondeu) return
  jaRespondeu = true

  const certa = perguntas[numeroPergunta].correta
  if (indice === certa) contadorAcertos++

  document.querySelectorAll(".option").forEach((opcao, i) => {
    opcao.classList.add(i === certa ? "correct" : "incorrect")
  })

  botaoProximo.style.display = "inline-block"
}

// Próxima pergunta ou fim
botaoProximo.onclick = () => {
  numeroPergunta++
  if (numeroPergunta < perguntas.length) {
    mostrarPergunta()
  } else {
    elementoPergunta.textContent = `Fim do quiz! Você acertou ${contadorAcertos} de ${perguntas.length}.`
    elementoOpcoes.innerHTML = ""
    botaoProximo.style.display = "none"
  }
}

mostrarPergunta()

// --- POPUP DE SAÍDA ---
const popup = document.getElementById("popup-sair")
document.querySelectorAll("nav ul li a").forEach(link => {
  link.onclick = e => {
    e.preventDefault()
    popup.style.display = "flex"
  }
})
document.getElementById("confirmar-sair").onclick = () => location.href = "index.html"
document.getElementById("cancelar-sair").onclick = () => popup.style.display = "none"

async function finalizarQuiz() {
  let resultado = document.getElementById("resultado")
  resultado.innerHTML = ""
  resultado.style.display = "block"
  resultado.className = "tela-final"

  let titulo = document.createElement("h2")
  let medalhaImg = document.createElement("img")
  let mensagem = document.createElement("p")
  let botaoRetry = document.createElement("button")

  const user = {
    id,
    userName,
    contadorAcertos
  }

  const response = await fetch(`${linkAPI}/coletaScore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  }).then(response => response.json())

  if (contadorAcertos === perguntas.length) {
    titulo.textContent = "Medalha de Au!"
    medalhaImg.src = "Medalhas/medalha de ouro.png"
    mensagem.textContent = `Parabéns! Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  } else if (contadorAcertos === perguntas.length - 1) {
    titulo.textContent = "Medalha de Ag!"
    medalhaImg.src = "Medalhas/medalha de prata.png"
    mensagem.textContent = `Muito bem! Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  } else if (contadorAcertos === perguntas.length - 2) {
    titulo.textContent = "Medalha de Cu + Sn!"
    medalhaImg.src = "Medalhas/medalha de bronze.png"
    mensagem.textContent = `Bom esforço! Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  } else {
    titulo.textContent = "Continue tentando!"
    mensagem.textContent = `Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  }

  medalhaImg.className = "medalha"
  botaoRetry.textContent = "Tentar novamente"
  botaoRetry.onclick = () => location.reload()

  resultado.appendChild(titulo)
  resultado.appendChild(medalhaImg)
  resultado.appendChild(mensagem)
  resultado.appendChild(botaoRetry)
  alert(response.message)
}

// Atualiza o "fim do quiz"
botaoProximo.onclick = () => {
  numeroPergunta++
  if (numeroPergunta < perguntas.length) {
    mostrarPergunta()
  } else {
    document.getElementById("question").textContent = ""
    document.getElementById("options").innerHTML = ""
    botaoProximo.style.display = "none"
    finalizarQuiz()
  }

}