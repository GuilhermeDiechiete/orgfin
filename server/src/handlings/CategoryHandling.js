const { check , exists, notExists, equalValue, equalFull } = require('../fragments/validators/validators')
const Access = require('../database/access/CategoryAccess')

module.exports = class CategoryHandling {
    static async categoryCreate(req) {
        const id = req.params.id 
        const name = req.body.name
        try {
            check(name, 'O nome da categoria é obrigatório.')
            const checkName = await Access.getByName(name)
            exists(checkName, 'Já existe está categoria.')
            await Access.save(id, name)

            return { status: 200, response: 'Categoria cadastrada com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async categoryList(req) {
        const id = req.params.id 
        try {
            const categories = await Access.getCategories(id)
            return { status: 200, response: categories }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async listCategoryWithExpenses(req) {
        const id = 2 
        
        const year = req.query.selectYear
        const month = req.query.currentMonth
        try {
            const categories = await Access.categoryWithExpenses( id, year, month)
            console.log(categories)
            return { status: 200, message: categories}
        } catch (error) {
            return { status: 400, message: error.message }
        }
    }
    static async categoryDelete(req) {
        const name = req.body.name
        try {
            check(name, 'Digite o nome da categoria.')
            const category = await Access.getByName(name)
            check(category, 'Categoria não existe.')

            await Access.deleteByName(name)

            return { status: 200, response: 'Categoria deletada com sucesso' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}