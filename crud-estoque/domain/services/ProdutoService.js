const Produto = require('../entities/Produto')

class ProdutoService{

    static async create(produto) {
        try {
            const newProduto = await Produto.create(produto); // Esperar o MongoDB criar o usuário
            return newProduto;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return null;
        }
    }

    static async findById(id) {
        try {
            const produto = await Produto.findById(id);
            return produto;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            return null;
        }
    }

    static async findAll() {
        try {
            const produto = await Produto.find();
            return produto;
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error);
            return null;
        }
    }

    static async atualizar(id, produto) {
        try {
            const produto_antigo = await Produto.findById(id);
            if (!produto_antigo) {
                throw new Error('Produto não encontrado');
            }
    
            produto_antigo.nome = produto.nome;
            produto_antigo.preco = produto.preco;
            produto_antigo.categoria = produto.categoria
            produto_antigo.quantidade = produto.quantidade
            produto_antigo.data = produto.data
            await produto_antigo.save();
    
            return produto_antigo;
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const produto = await Produto.findByIdAndDelete(id);
            if (!produto) {
                throw new Error('Produto não encontrado');
            }
            return produto;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw error;
        }
    }
}

module.exports = ProdutoService