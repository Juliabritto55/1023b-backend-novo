import {Router} from 'express'

import carrinhoController from './carrinho/carrinho.controller'
import produtosController from './produtos/produtos.controller'

const rotas = Router()

// Rotas do Carrinho
rotas.get('/carrinho',carrinhoController.listar)
rotas.post('/carrinho',carrinhoController.adicionar)

// Rotas dos produtos
rotas.get('/produtos',produtosController.listar)
rotas.post('/produtos',produtosController.adicionar)


export default rotas   