const Handling = require('../handlings/CategoryHandling')

module.exports = class CategoryController {

    static async create(req, res) {
        try {
            const result = await Handling.categoryCreate(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async list(req, res) {
        try {
            const result = await Handling.categoryList(req) 
     
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
    static async delete(req, res) {
        try {
            const result = await Handling.categoryDelete(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
}