const Handling = require('../handlings/IncomeHandling')

module.exports = class IncomeController {

    static async create(req, res) {
        try {
            const result = await Handling.IncomeCreate(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async list(req, res) {
        try {
            const result = await Handling.incomeList(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            console.log(error)
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async getIncome(req, res) {
        try {
            const result = await Handling.getIncomeByMonth(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async delete(req, res) {
        try {
            const result = await Handling.IncomeDelete(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        } 
    }
 
}