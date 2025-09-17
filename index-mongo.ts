import express from 'express'
import type { Request, Response } from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB)

const app = express()

// Middleware para fazer o parse do body da requisição para JSON
app.use(express.json())

// Rota para listar produtos
app.get('/produtos', async (req: Request, res: Response) => {
    const produtos = await db.collection('produtos').find().toArray()
    res.json(produtos)
})

// Inicializa o servidor na porta 8000
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})