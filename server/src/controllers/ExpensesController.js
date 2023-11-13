const Handling = require('../handlings/ExpensesHandling')

module.exports = class ExpensesController {

    static async create(req, res) {
        try {
            const result = await Handling.expensesCreate(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async list(req, res) {
        try {
            const result = await Handling.expensesList(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async totalMonth(req, res) {
        try {
            const result = await Handling.expensesTotalMonth(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async delete(req, res) {
        try {
            const result = await Handling.expensesDelete(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        } 
    }
 
}