const knex = require('../connection')

module.exports = class PaymentAccess {
    static async getByName(userId, name) {
        try {
            const result = await knex.select('id', 'payment_name', 'user_id').from('payments').where({ payment_name: name , user_id: userId}).first();
            return result;
        } catch (error) {
            console.log('Erro ao selecionar forma de pagamento pelo nome', error);
            return false;
        }
    }
    // salvar categoria
    static async save(id, payment) {
        try {
            const result = await knex('payments').insert({ 
                payment_name: payment.name, 
                user_id: id,
                description: payment.description, 
                limit: payment.limit
            });
            return result;
        } catch (error) {
            console.log('Erro ao salvar categoria no banco', error);
            throw error;
        }
    }
    static async getPayment(id) {
        try {
            const result = await knex.select('id', 'payment_name', 'user_id', 'description', 'limit').from('payments').where({ user_id : id });
            return result;
        } catch (error) {
            console.log('Erro ao buscar formas de pagamento')
            throw error;
        }
    }
    static async deleteByName(userId, name) {
        try {
            const result = await knex('payments').where({ payment_name: name, user_id: userId }).del();
            return result;
        } catch (error) {
            console.error('Erro ao excluir forma de pagamento pelo nome', error);
            throw error;
        }
    }
}