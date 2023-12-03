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
    // pegar todas as categorias com despesas do ano selecionado
    static async getAllCategoriesWithExpensesByYear(userId, year) {
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
    static async getFullAmountOfExpensesByCategory(userId, year) {
        try {
            const categories = await knex.select("*").from('categories').where({ user_id: userId });
    
            const categoriesWithExpenses = [];
    
            for (const category of categories) {
                const monthlyTotal = [];
    
                for (let month = 1; month <= 12; month++) {
                    const expenses = await knex('expenses')
                        .where({ user_id: userId, month: month, year: year, category_name: category.category_name })
                        .sum('amount as totalAmount')
                        .first();
    
                    monthlyTotal.push({
                        month: month,
                        totalAmount: expenses.amount || 0
                    });
                }
    
                categoriesWithExpenses.push({
                    category: category,
                    monthlyTotal: monthlyTotal
                });
            }
    
            return { categoriesWithExpenses };
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao buscar categorias e despesas.');
        }
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