const Handling = require('../handlings/CategoryHandling')

module.exports = class CategoryController {

    static async create(req, res) {
        try {
            const userId = req.params.id
            const data = { ...req.body }
            const result = await Handling.categoryCreate(userId, data) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async showCategory(req, res) {
        try {
            const userId = req.params.id 
            const name = req.body.name
            const result = await Handling.getCategory(userId, name) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async listCategories(req, res) {
        try {
            const userId = req.params.id 
            const result = await Handling.getCategories(userId) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async getFull(req, res) {
        try {
            const result = await Handling.listCategoryWithExpenses(req) 
            res.status(result.status).json({ message: result.message})
        } catch (error) {
            res.status(500).json({ message : 'Erro interno do servidor.'})
        }
    }
    static async deleteCategory(req, res) {
        try {
            const userId = req.params.id 
            const name = req.body.name
            const result = await Handling.categoryDelete(userId, name) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
}