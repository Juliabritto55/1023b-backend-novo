import { Request, Response } from "express";

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
class CarrinhoController {
    //adicionarItem
    async adicionarItem(req:Request, res:Response) {
        const { usuarioId, produtoId, quantidade } = req.body;
    } 
        //Buscar o produto no banco de dados
        const produto = await produtosController.buscarPorId(produtoId);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }
        const precoUnitario = produto.preco;
        const nome = produto.nome;
        //Pegar o preço do produto
        //Pegar o nome do produto


        // Verificar se um carrinho com o usuário já existe
        let carrinho = await buscarCarrinhoPorUsuarioId(usuarioId);

        const item: ItemCarrinho = {
            produtoId,
            quantidade,
            precoUnitario

        // Se não existir deve criar um novo carrinho

        // Se existir, deve adicionar o item ao carrinho existente

        // Calcular o total do carrinho

        // Atualizar a data de atualização do carrinho




    //removerItem
    //atualizarQuantidade
    //listar
    //remover                -> Remover o carrinho todo

}
export default new CarrinhoController();