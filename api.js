import express, { response } from "express"
import cors from "cors"
import mysql from "mysql2"
import bcrypt from "bcrypt"
// import { getPodio, getRanking, addPlayer } from "./ranking/rankingController"

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

// app.get("/podio", getPodio)
// app.get("/ranking", getRanking)
// app.post("/ranking", addPlayer)

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

app.post("/coletaScore", (request, response) => {
    const { id, userName, contadorAcertos } = request.body.user
    console.log(contadorAcertos)
    console.log(id, userName)

    const selectSql = `
        SELECT score FROM quimicaNaWeb WHERE id_usuario = ?
    `

    database.query(selectSql, [id], (error, results) => {
        if (error) {
            console.log(error)
            response.json({ message: "Erro no banco de dados" })
            return
        }

        if (results.length === 0) {
            response.json({ message: "Usuário não encontrado" })
            return
        }

        const scoreAtual = results[0].score
        const scoreUsuario = scoreAtual + contadorAcertos

        const updateSql = `
            UPDATE quimicaNaWeb SET score = ? WHERE id_usuario = ?
        `
        

        database.query(updateSql, [scoreUsuario, id], (error) => {
            if (error) {
                console.log(error)
                response.json({ message: "Erro ao tentar editar o score do usuario" })
                return
            }

            response.json({ message: "Pontuação salva" })
        })
    })
})

app.get("/podio", (request, response) => {
    const sql = `
        SELECT id_usuario, name, score
        FROM quimicaNaWeb
        ORDER BY score DESC
        LIMIT 6
    `

    database.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao buscar o ranking" })
        }
        const top3 = results.slice(0, 3) 
        const next3 = results.slice(3, 6)

        console.log(top3)
        console.log(next3)

        return response.json({ top3, next3 })
    })
})

app.post("/login", (request, response) => {
    const { email, password } = request.body.users

    const selectCommand = "SELECT * FROM quimicaNaWeb WHERE email = ?"

    database.query(selectCommand, [email], async (error, results) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro no servidor!" })
        }

        if (results.length === 0) {
            return response.status(400).json({ message: "Usuário ou senha incorretos!" })
        }

        const user = results[0]

        const senhaCorreta = await bcrypt.compare(password, user.password)

        if (!senhaCorreta) {
            return response.status(400).json({ message: "Usuário ou senha incorretos!" })
        }

        return response.json({
            id: user.id_usuario,
            name: user.name,
            email: user.email
        })
    })
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`)
})