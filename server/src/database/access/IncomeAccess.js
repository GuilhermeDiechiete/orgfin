const knex = require('../connection')

module.exports = class CategoryAccess {
    // save income
    static async saveIncome(userId, income) {
        try {
            const result = await knex('income').insert({ 
                user_id: userId,
                description: income.description,
                day: income.day,
                month: income.month,
                year: income.year,
                income_value: income.income_value 
            });
            return result;
        } catch (error) {
            console.log('Erro ao renda - file-incomeAccess');
            throw error;
        }
    }
    static async getIncomeByUserId(userId) {
        try {
            const result = await knex.select('id', 'user_id', 'description', 'day', 'month', 'year', 'income_value').from('income').where({ user_id : userId });
            return result;
        } catch (error) {
            console.log('Erro ao buscar incomes')
            throw error;
        }
    }
    static async getIncomeByMonthAndYear(userId, income) {
        try {
            // preciso fazer um for em cada mes 
            const result = await knex.select('id', 'user_id', 'description', 'day', 'month', 'year', 'income_value').from('income').where({ user_id : userId , month: income.month, year: income.year });
            return result;
        } catch (error) {
            
        }
    }

        
    static async deleteByName(name) {
        try {
            const result = await knex('categories').where({ category_name: name }).del();
            return result;
        } catch (error) {
            console.error('Erro ao excluir categoria pelo nome', error);
            throw error;
        }
    }
    
}