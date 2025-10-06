import { Request, Response } from "express";
import produtosController from "../produtos/produtos.controller";

interface ItemCarrinho {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
    nome: string;
}

interface Carrinho {
    usuarioId: string;
    itens: ItemCarrinho[];
    dataAtualizacao: Date;
    total: number;
}

async function buscarCarrinhoPorUsuarioId(usuarioId: string): Promise<Carrinho | null> {
    return null;
}
async function criarCarrinho(carrinho: Carrinho) {
    return carrinho;
}
async function atualizarCarrinho(carrinho: Carrinho) {
    return carrinho;
}

class CarrinhoController {
    async adicionarItem(req: Request, res: Response) {
        const { usuarioId, produtoId, quantidade } = req.body;

        if (!usuarioId || !produtoId || quantidade === undefined) {
            return res.status(400).json({ mensagem: "usuarioId, produtoId e quantidade são obrigatórios" });
        }

        if (typeof quantidade !== "number" || quantidade <= 0) {
            return res.status(400).json({ mensagem: "Quantidade deve ser maior que zero" });
        }

        const produto = await produtosController.buscarPorId(produtoId);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }
        const precoUnitario = produto.preco;
        const nome = produto.nome;

        let carrinho = await buscarCarrinhoPorUsuarioId(usuarioId);

        const item: ItemCarrinho = {
            produtoId,
            quantidade,
            precoUnitario,
            nome
        };

        if (!carrinho) {
            carrinho = {
                usuarioId,
                itens: [item],
                dataAtualizacao: new Date(),
                total: item.precoUnitario * item.quantidade
            };
            await criarCarrinho(carrinho);
        } else {
            const idx = carrinho.itens.findIndex(i => i.produtoId === produtoId);
            if (idx >= 0) {
                carrinho.itens[idx].quantidade += quantidade;
            } else {
                carrinho.itens.push(item);
            }
            carrinho.total = carrinho.itens.reduce(
                (sum, i) => sum + i.precoUnitario * i.quantidade, 0
            );
            carrinho.dataAtualizacao = new Date();
            await atualizarCarrinho(carrinho);
        }

        return res.json(carrinho);
    }

    async removerItem(req: Request, res: Response) {
        return res.status(501).json({ mensagem: "Não implementado" });
    }

    async atualizarQuantidade(req: Request, res: Response) {
        return res.status(501).json({ mensagem: "Não implementado" });
    }

    async listar(req: Request, res: Response) {
        return res.status(501).json({ mensagem: "Não implementado" });
    }

    async remover(req: Request, res: Response) {
        return res.status(501).json({ mensagem: "Não implementado" });
    }
}

export default new CarrinhoController();