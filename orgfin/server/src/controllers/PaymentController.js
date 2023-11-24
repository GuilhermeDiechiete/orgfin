const Handling = require('../handlings/PaymentHandling')

module.exports = class PaymentController {

    static async create(req, res) {
        try {
            const result = await Handling.paymentCreate(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async list(req, res) {
        try {
            const result = await Handling.paymentList(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
    static async delete(req, res) {
        try {
            const result = await Handling.paymentDelete(req) 
            res.status(result.status).json({ message: result.response})
        } catch (error) {
            res.status(500).json({ response : 'Erro interno do servidor.'})
        }
    }
}