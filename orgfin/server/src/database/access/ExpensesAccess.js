const knex = require('../connection')

module.exports = class CategoryAccess {
    static async getPaymentByName(userId, paymentName) {
        try {
            const result = await knex.select( 'id', 'payment_name' ).from('payments').where({ payment_name: paymentName , user_id: userId}).first();
            return result;
        } catch (error) {
            console.log('Erro ao selecionar forma de pagamento pelo nome', error);
            return false;
        }
    }
    static async getCategoryByName(userId, categoryName) {
        try {
            const result = await knex.select( 'id', 'category_name' ).from('categories').where({ category_name: categoryName, user_id: userId}).first();
            return result;
        } catch (error) {
            console.log('Erro ao selecionar categoria pelo nome', error);
            return false;
        }
    }

    // salvar despesas
    static async save(userId, expense) {

        console.log(userId, expense)
       try {
            const result = await knex('expenses').insert({ 
                amount: expense.amount,
                day: expense.day,
                month: expense.month,
                year: expense.year,
                description: expense.description,
                user_id: userId,
                payment_name: expense.payment,
                category_name: expense.category,
                installment_number: expense.installment_number,
                installment_amount: expense.installment_amount,
                status: expense.status
            });
            return result;
       } catch (error) { 
        console.log(error)
            console.log('Erro ao tentar salvar despesa')
            throw error;
       }
    }
    static async getTotalExpenses(userId, year) {
        try {
            const categories = await knex.select("*").from('categories').where({ user_id: userId });
    
            const categoriesWithExpenses = [];
    
            for (const category of categories) {
                const expenses = await knex.select("*")
                    .from('expenses')
                    .where({ user_id: userId, year: year, category_name: category.category_name });
    
                categoriesWithExpenses.push({ category, expenses });
            }
    
            return categoriesWithExpenses;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao buscar categorias e despesas.');
        }
    }
    
    static async getExpenses(userId, expenses) {
        const result = await knex.select( "*" ).from('expenses').where({ 
            user_id: userId,
            month: expenses.month,
            year: expenses.year
        })
        return result;
    }
    static async getExpensesTotalMonth(userId, year) {
        const result = [];
        let totalSumAnnual = 0

        for (let month = 1; month <= 12; month++) {
        const expensesMonth = await knex.select( "*" ).from('expenses').where({ user_id: userId, month: month,year: year })
    
        const totalSum = expensesMonth.reduce((acc, expensesMonth) => {
            return acc + parseFloat(expensesMonth.amount);
          }, 0);
        
        totalSumAnnual += totalSum
      
          result.push({ month: month, expenses: expensesMonth, sum: totalSum });
        }
        let totalAnnual = totalSumAnnual

        console.log('Resultado', result);
        
        return { result, totalAnnual };
      }
      
      
    static async delete(userId, expense_id) {
        try {
            const result = await knex('expenses').where({ user_id: userId, id: expense_id }).del();
            return result;
        } catch (error) {
            console.error('Erro ao excluir despesa pelo id', error);
            throw error;
        }
    }
}