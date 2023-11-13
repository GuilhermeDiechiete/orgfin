const V = require('../fragments/validators')
const Access = require('../database/access/CategoryAccess')

module.exports = class CategoryHandling {
    static async categoryCreate(req) {
        const id = req.params.id
        const name = req.body.nameCategory
        try {
            V.check(name, 'nome da categoria').notNull()
            const checkName = await Access.getCategoryByName(id, name)
            V.check(checkName, 'Categoria').existsMsg(`A categoria "${name}" já existe em sua lista.`)

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
        const id = req.params.id
        
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
        const userId = req.params.id
        const id = req.params.categoryId
        try {
            V.check(id, 'categoria').exists()
            const category = await Access.getByName(id)
            check(category, 'Categoria não existe.')

            await Access.deleteByName(name)

            return { status: 200, response: 'Categoria deletada com sucesso' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}