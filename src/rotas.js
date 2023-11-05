const express = require('express')
const {
    cadastrarUsuario,
    login
} = require('./controlador/usuarios');

const verificarUsuarioLogado = require('./intermediarios/autenticador');
const { cadastrarTransacao, detalharTransacao } = require('./controlador/transacoes');

const rotas = express()

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', login)

rotas.use(verificarUsuarioLogado)

rotas.post('/transacao', verificarUsuarioLogado, cadastrarTransacao)
rotas.get('/transacao/:id', verificarUsuarioLogado, detalharTransacao)

module.exports = rotas