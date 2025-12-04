import { db } from "./database.js";

// PEGAR TOP 3
export async function getPodio(req, res) {
  try {
    const [rows] = await db.execute(
      "SELECT username, total_points FROM ranking ORDER BY total_points DESC LIMIT 3"
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao carregar pódio" });
  }
}

// PEGAR DO 4° EM DIANTE
export async function getRanking(req, res) {
  try {
    const [rows] = await db.execute(
      "SELECT username, total_points FROM ranking ORDER BY total_points DESC LIMIT 9999 OFFSET 3"
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao carregar ranking" });
  }
}

// ADICIONAR JOGADOR
export async function addPlayer(req, res) {
  const { username, total_points } = req.body;

  if (!username || total_points === undefined) {
    return res.status(400).json({ error: "Envie username e total_points!" });
  }

  try {
    await db.execute(
      "INSERT INTO ranking (username, total_points) VALUES (?, ?)",
      [username, total_points]
    );

    res.json({ message: "Jogador salvo!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao salvar jogador" });
  }
}