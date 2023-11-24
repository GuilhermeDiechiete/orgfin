const V = require('../fragments/validators')
const Access = require('../database/access/CategoryAccess')

module.exports = class CategoryHandling {
    static async categoryCreate(userId, category) {
        try {
            V.check(category.nameCategory, 'nome da categoria').notNull()
            const checkName = await Access.getCategoryByName(userId, category.nameCategory)
            V.check(checkName, 'Categoria').existsMsg(`A categoria "${category.nameCategory}" já existe em sua lista.`)

            await Access.save(userId, category.nameCategory)
            return { status: 200, response: 'Categoria cadastrada com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async getCategories(userId) {
        try {
            const resultCategory = await Access.getCategoriesByUserId(userId)
            
            return { status: 200, response: resultCategory }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async listCategoryWithExpenses(userId, year) {
        try {
            const categories = await Access.getCategoryWithExpenses( userId, year)
            console.log('resultado', categories)
            return { status: 200, response: categories}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async categoryDelete(userId, nameCategory) {
        try {
            // ainda falta
            V.check(userId, 'categoria').exists()
            const category = await Access.getByName(userId)
            check(category, 'Categoria não existe.')

            await Access.deleteByName(nameCategory)

            return { status: 200, response: 'Categoria deletada com sucesso' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}