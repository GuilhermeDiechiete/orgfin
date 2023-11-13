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
    static async save(id, expenses) {
        console.log(id, expenses)
       try {
            const result = await knex('expenses').insert({ 
                amount: expenses.amount,
                day: expenses.day,
                month: expenses.month,
                year: expenses.year,
                description: expenses.description,
                user_id: id,
                payment_name: expenses.payment,
                category_name: expenses.category,
                installment_number: expenses.installment_number,
                installment_amount: expenses.installment_amount,
                status: expenses.status
            });
            return result;
       } catch (error) { 
            console.log('Erro ao tentar salvar despesa')
            throw error;
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