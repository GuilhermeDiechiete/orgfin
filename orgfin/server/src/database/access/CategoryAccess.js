const knex = require('../connection')

module.exports = class CategoryAccess {
    static async getCategoryByName(userId, name) {
        try {
            const result = await knex.select('id', 'category_name', 'user_id').from('categories').where({ user_id: userId, category_name: name }).first();
            return result;
        } catch (error) {
            console.log('Erro ao selecionar categoria pelo nome', error);
            return false;
        }
    }
    // salvar categoria
    static async save(userId, name) {
        try {
            const result = await knex('categories').insert({ category_name: name, user_id: userId });
            return result;
        } catch (error) {
            console.log('Erro ao salvar categoria no banco', error);
            throw error;
        }
    }
    static async getCategoriesByUserId(id) {
        try {
            const result = await knex.select('id', 'category_name', 'user_id').from('categories').where({ user_id : id });
            return result;
        } catch (error) {
            
        }
    }
    static async getCategoryWithExpenses(userId, year) {

        try {
          const categories = await knex
            .select("*").from('categories').where({ user_id: userId });
      
          const categoriesWithExpenses = [];
      
          for (const category of categories) {
            const expenses = await knex
              .select("*").from('expenses').where({
                user_id: userId,
                year: year,
                category_name: category.category_name
              });
      
            category.expenses = expenses;
            categoriesWithExpenses.push(category);
          }
          return categoriesWithExpenses;
        } catch (error) {
          console.error(error); 
          throw new Error('Ocorreu um erro ao buscar categorias e despesas.');
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