import express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI!)


const app = express()
//criando uma rota de acesso pelo navegador
app.get('/', async (req, res) => {

 })
//criando o servidor na porta 8000 com o express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})