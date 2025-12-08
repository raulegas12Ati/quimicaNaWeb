import { linkAPI } from "../paginasLogin/login.js"
import "./home.js"
console.log("Chegou")

const button = document.querySelector("button")
button.onclick = (event) => {
  event.preventDefault()
  coletarRanking()
}

async function coletarRanking() {
  console.log("Chegou")
  const user = JSON.parse(sessionStorage.getItem("user"))
  if (!user) {
    alert("Você precisa fazer o login antes de ver o ranking!")
    window.location.href = "../paginasLogin/login.html"
    return
  }

  const response = await fetch(`${linkAPI}/podio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  }).then(response => response.json())

  const { top3, next3 } = response
  console.log(top3)
  console.log(next3)
}