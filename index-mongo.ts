import express, { Request, Response } from 'express';
import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function main() {
    const client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
    const db = client.db(process.env.MONGO_DB!);

    const app = express();
    app.use(express.json());

    app.get('/produtos', async (req: Request, res: Response) => {
        try {
            const produtos = await db.collection('produtos').find().toArray();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    });

    app.post('/produtos', async (req: Request, res: Response) => {
        const { nome, preco, urlfoto, descricao } = req.body;
        if (!nome || !preco || !urlfoto || !descricao) {
            return res.status(400).json({ error: 'Nome, preço, urlfoto e descrição são obrigatórios' });
        }
        try {
            const produto = { nome, preco, urlfoto, descricao };
            const resultado = await db.collection('produtos').insertOne(produto);
            res.status(201).json({ ...produto, _id: resultado.insertedId });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao inserir produto' });
        }
    });

    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
}

main().catch(err => {
    console.error('Erro ao iniciar o servidor:', err);
});