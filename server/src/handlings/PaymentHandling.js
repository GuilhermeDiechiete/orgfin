const V = require('../fragments/validators')
const Access = require('../database/access/PaymentAccess')

module.exports = class PaymentHandling {
    static async paymentCreate(req) {
        const id = req.params.id 
        const payment = { ...req.body }
        try {
            V.check(payment.name, 'nome').notNull()
            V.check(payment.description, 'descrição').notNull()
            V.check(payment.limit, 'limite').notNull()

            const checkName = await Access.getByName(id, payment.name)
            V.check(checkName, 'forma de pagamento').existsMsg('Já existe está forma de pagamento.')
            
            await Access.save(id, payment)

            return { status: 200, response: 'Forma de pagamento cadastrada com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        } 
    }
    static async paymentList(req) {
        const id = req.params.id 
        try {
            const payments = await Access.getPayment(id)
            return { status: 200, response: payments }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async paymentDelete(req) {
        const id = req.params.id
        const name = req.body.name
        try {
            V.check(name, 'nome').notNull()
            const payment = await Access.getByName(id, name)
            V.check(payment, 'forma de pagamento').notNull()

            await Access.deleteByName(id, name)

            return { status: 200, response: 'Forma de pagamento deletado com sucesso' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}