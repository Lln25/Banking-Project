const pool = require('../conexao');
const moment = require('moment');

const cadastrarTransacao = async (req, res) => {
	const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Campos descrição, valor, data, categoria_id e tipo são obrigatórios.' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json({ mensagem: 'Campo tipo precisa ser de entrada ou saida' });
    }

    if (!moment(data, moment.ISO_8601, true).isValid()) {
        return res.status(400).json({ mensagem: 'A data precisa estar em formato: (2022-03-24T15:30:00.000Z).' });
    }

    if (categoria_id < 1 || categoria_id > 17) {
        return res.status(400).json({ mensagem: 'A categoria precisa estar entre 1 - 17' });
    }

    const usuario_id = req.usuario.id;

    try {
        const novaTransacao = await pool.query(
            'INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [descricao, valor, data, categoria_id, tipo, usuario_id]
        );

        const transacaoCadastrada = novaTransacao.rows[0];

        return res.status(201).json(transacaoCadastrada);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    try {
        const transacao = await pool.query(
            'SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao AS categoria_nome ' +
            'FROM transacoes t ' +
            'JOIN categorias c ON t.categoria_id = c.id ' +
            'WHERE t.id = $1 AND t.usuario_id = $2',
            [id, usuario_id]
        );

        if (transacao.rowCount < 1) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const transacaoDetalhada = transacao.rows[0];
        return res.status(200).json(transacaoDetalhada);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    cadastrarTransacao,
    detalharTransacao
};
