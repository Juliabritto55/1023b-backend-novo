import express, { Request, Response } from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB)


const app = express()
//Explique o que esse middleware faz com que o
// express faça o parse do body da requisição para json:
app.use(express.json())
//criando uma rota de acesso pelo navegador
app.get('/produtos', async (req:Request, res:Response) => {
    const produtos = await db.collection('produtos').find().toArray()
    res.json(produtos)
 })
//criando o servidor na porta 8000 com o express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})