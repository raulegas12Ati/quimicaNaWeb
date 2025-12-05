import linkAPI from "../paginasLogin/login"

const rankingList = document.getElementById("ranking-list")
const mensagem = document.getElementById("mensagem")

const p1n = document.getElementById("p1n")
const p1p = document.getElementById("p1p")
const p2n = document.getElementById("p2n")
const p2p = document.getElementById("p2p")
const p3n = document.getElementById("p3n")
const p3p = document.getElementById("p3p")

function mostrarMensagem(texto) {
  mensagem.textContent = texto
  mensagem.style.display = "block"
  setTimeout(() => (mensagem.style.display = "none"), 3333)
}

// ========================
// CARREGAR RANKING COMPLETO EGA TODOS DO RANKING
// ========================
async function carregarRanking() {
  try {
    const res = await fetch(`${linkAPI}/ranking`)
    const jogadores = await res.json()

    rankingList.innerHTML = ""

    jogadores.forEach((jogador, index) => {
      const li = document.createElement("li")
      li.innerHTML = `
        <span class="posicao">${index + 1}</span>
        <span class="nome">${jogador.username}</span>
        <span class="pontos">${jogador.total_points} pts</span>
      `;
      rankingList.appendChild(li)
    });

  } catch (err) {
    console.error(err)
    mostrarMensagem("Erro ao carregar ranking")
  }
}

// ========================
// CARREGAR PÓDIO (TOP 3) PEGA SÓ OS TRES PRIMEIROS
// ========================
async function carregarPodio() {
  try {
    const res = await fetch(`${linkAPI}/podio`)
    const podio = await res.json()

    if (podio[0]) {
      p1n.textContent = podio[0].username
      p1p.textContent = podio[0].total_points
    }
    if (podio[1]) {
      p2n.textContent = podio[1].username
      p2p.textContent = podio[1].total_points
    }
    if (podio[2]) {
      p3n.textContent = podio[2].username
      p3p.textContent = podio[2].total_points
    }

  } catch (err) {
    console.error(err)
    mostrarMensagem("Erro ao carregar pódio")
  }
}

// ========================
// CHAMAR AS FUNÇÕES
// ========================
carregarRanking()
carregarPodio()

async function criaPodio() {
  const response = await fetch(`${linkAPI}/podio`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })

  const data = await response.json()
  console.log(data)
}

criaPodio()
