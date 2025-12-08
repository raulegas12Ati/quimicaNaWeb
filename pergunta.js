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
    texto: "Qual é o elemento mais abundante no universo?",
    alternativas: ["Oxigênio", "Hidrogênio", "Carbono", "Hélio"],
    correta: 1
  },
  {
    texto: "Quem é considerado o criador da Tabela Periódica moderna?",
    alternativas: ["Issac Newton", "Dmitri Mendeleev", "Antoine Lavoisier", "Marie Curie"],
    correta: 1
  },
  {
    texto: "O que é o número atômico?",
    alternativas: ["Número de prótons", "Número de nêutrons", "Número de elétrons", "Carga do átomo"],
    correta: 0
  },
  {
    texto: "Qual desses elementos é um metal alcalino?",
    alternativas: ["Cloro", "Cobre", "Potássio", "Silício"],
    correta: 2
  },
  {
    texto: "Qual é o símbolo químico do Ouro?",
    alternativas: ["Au", "O", "Ag", "Ga"],
    correta: 0
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
  // export function getScore() {
  //   return contadorAcertos
  // }

  if (contadorAcertos === perguntas.length) {
    titulo.textContent = "Medalha de Au!"
    medalhaImg.src = "Medalhas/medalha de ouro.png"
    mensagem.textContent = `Parabéns! Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  } else if (contadorAcertos === perguntas.length - 1) {
    titulo.textContent = "Medalha de Prata!"
    medalhaImg.src = "Medalhas/medalha de prata.png"
    mensagem.textContent = `Muito bem! Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  } else if (contadorAcertos === perguntas.length - 2) {
    titulo.textContent = "Medalha de Bronze!"
    medalhaImg.src = "Medalhas/medalha de bronze.png"
    mensagem.textContent = `Bom esforço! Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  } else {
    titulo.textContent = "Continue tentando!"
    mensagem.textContent = `Você acertou ${contadorAcertos}/${perguntas.length} questões.`
  }

  //Enviar a quantidade de acertos para o backend
  // const response = await fetch()

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