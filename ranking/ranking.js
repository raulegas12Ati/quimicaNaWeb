import { linkAPI } from "../paginasLogin/login.js"

async function coletarRanking() {
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

coletarRanking()