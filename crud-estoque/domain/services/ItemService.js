const Item = require('../entities/Item')
const mongoose = require('mongoose')

class ItemService{

    static async create(item) {
        try {
            const newItem = await Item.create(item); // Esperar o MongoDB criar o usuário
            return newItem;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return null;
        }
    }

    static async findById(id) {
        try {
            const item = await Item.findById(id);
            return item;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            return null;
        }
    }

    static async findAll() {
        try {
            const item = await Item.find();
            return item;
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error);
            return null;
        }
    }

    static async atualizar(id, item) {
        try {
            const item_antigo = await Item.findById(id);
            if (!item_antigo) {
                throw new Error('Item não encontrado');
            }
    
            item_antigo.nome = item.nome;
            item_antigo.valor_venda = item.valor_venda;
            item_antigo.valor_compra = item.valor_compra
            item_antigo.quantidade = item.quantidade
            item_antigo.data = item.data
            await item_antigo.save();
    
            return item_antigo;
        } catch (error) {
            console.error('Erro ao atualizar Item:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const item = await Item.findByIdAndDelete(new mongoose.Types.ObjectId(id));
            if (!item) {
                throw new Error('Item não encontrado');
            }
            return item;
        } catch (error) {
            console.error('Erro ao deletar Item:', error);
            throw error;
        }
    }

    static async report(dias) {
        let itens = [];
        
        if (dias && dias !== 0) {
            let data = new Date();  
            let datafim = new Date();  

            datafim.setDate(data.getDate() - dias);
    
            
            itens = await Item.find({
                data: { $gte: datafim, $lte: data }
            });
        } else {
            itens = await Item.find();
        }
    
        return { items: itens, totalItems: itens.length };
    }
    
}

module.exports = ItemService