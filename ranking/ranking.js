// const API_URL = "http://localhost:3333";

// const rankingList = document.getElementById("ranking-list");
// const mensagem = document.getElementById("mensagem");

// const p1n = document.getElementById("p1n");
// const p1p = document.getElementById("p1p");
// const p2n = document.getElementById("p2n");
// const p2p = document.getElementById("p2p");
// const p3n = document.getElementById("p3n");
// const p3p = document.getElementById("p3p");

// function mostrarMensagem(texto) {
//   mensagem.textContent = texto;
//   mensagem.style.display = "block";
//   setTimeout(() => mensagem.style.display = "none", 3006);
// }

// async function carregarRanking() {
//   try {
//     const res = await fetch(`${API_URL}/ranking`);
//     const data = await res.json();

//     rankingList.innerHTML = "";

//     data.forEach((item, index) => {
//       const li = document.createElement("li");

//       li.innerHTML = `
//         <span class="posicao">${index + 4}</span>
//         <span class="nome">${item.username}</span>
//         <span class="pontos">${item.total_points} pts</span>
//       `;

//       rankingList.appendChild(li);
//     });

//   } catch (err) {
//     console.error(err);
//     mostrarMensagem("Erro ao carregar ranking");
//   }
// }

// async function carregarPodio() {
//   try {
//     const res = await fetch(`${API_URL}/podio`);
//     const data = await res.json();

//     if (data[0]) {
//       p1n.textContent = data[0].username;
//       p1p.textContent = data[0].total_points;
//     }
//     if (data[1]) {
//       p2n.textContent = data[1].username;
//       p2p.textContent = data[1].total_points;
//     }
//     if (data[2]) {
//       p3n.textContent = data[2].username;
//       p3p.textContent = data[2].total_points;
//     }

//   } catch (err) {
//     console.error(err);
//     mostrarMensagem("Erro ao carregar pódio");
//   }
// }

// carregarRanking();
// carregarPodio();

// const score = import { getScore } from "../pergunta.js"
// score = score + import { getScore } from "../pergunta2.js"
// score = score + import { getScore } from "../pergunta3.js"

async function fazPodio() {
  const response = await fetch("http://localhost:3333/podio", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })

  const data = await response.json()
  console.log(data)
}

fazPodio()
