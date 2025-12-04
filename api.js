import express, { response } from "express"
import cors from "cors"
import mysql from "mysql2"
import bcrypt from "bcrypt"
import { getPodio, getRanking, addPlayer } from "./ranking/rankingController"

const port = 3333
const app = express()
app.use(cors())
app.use(express.json())
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const database = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10
})

app.get("/podio", getPodio)
app.get("/ranking", getRanking)
app.post("/ranking", addPlayer)

app.post("/cadastro", async (request, response) => {
    try {
        const { name, email, password } = request.body.users

        if (!emailRegex.test(email)) {
            return response.status(400).json({ error: "E-mail inválido! " })
        }
        const codigoDeVerificacao = `SELECT * FROM quimicaNaWeb WHERE email = ?`

        database.query(codigoDeVerificacao, [email], async (error, results) => {
            if (error) {
                console.log(error)
                return response.status(500).json({ error: "Error ao verificar E-mail" })
            }

            if (results.length > 0) {
                return response.status(400).json({ error: "O E-mail ja existe!" })
            }
            const score = 0
            //cria o hash da senha 
            const passwordHash = await bcrypt.hash(password, 10)
            const InsertSql = `
              INSERT INTO quimicaNaWeb(name, score, email, password)
              VALUES(?, ?, ?, ?)
            `
            //Coloca os valores do vormulario no banco de dados     
            database.query(InsertSql, [name, score, email, passwordHash], (error) => {
                if (error) {
                    console.log(error)
                    return response.status(500).json({ error: "Erro ao cadastrar usuário." });
                }

                return response.status(201).json({ message: "Usuario cadastrado com sucesso!" })
            })
        })

    } catch (error) {
        return response.status(500).json({ error: "Erro interno" })
    }
})

// app.post("/coletaScore", (request, response) => {
//     const { contadorAcertos } = request.body.score

//     const selectSql = `
//         SELECT score quimicaNaWeb WHERE id = ?
//     `

//     const scoreAtual = database.query(selectSql, [id], (error) => {
//         if (error) {
//             console.log(error)
//             response.json({ message: "Erro no banco de dados" })
//             return
//         }
//     })
//     const scoreUsuario = contadorAcertos + scoreAtual

//     const comandtSql = `
//         UPDATE quimicaNaWeb SET score = ? WHERE id = ?
//     `

//     database.query(comandtSql, [scoreUsuario], (error) => {
//         if(error){
//             console.log(error)
//             response.json({message: "Erro ao tentar editar o score do usuario"})
//             return
//         }

//         response.json({message: "Sucesso"})
//     })
// })

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})