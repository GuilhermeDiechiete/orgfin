const { check , exists, notExists, equalValue, equalFull } = require('../fragments/validators/validators')
const Access = require('../database/access/PaymentAccess')

module.exports = class PaymentHandling {
    static async paymentCreate(req) {
        const id = req.params.id 
        const payment = { ...req.body }
        try {
            check(payment.name, 'O nome do pagamento é obrigatório.')
            check(payment.description, 'Descreva para que você ira usar.')
            check(payment.limit, 'Informe o limite maximo de uso em Real (R$).')

            const checkName = await Access.getByName(id, payment.name)
            exists(checkName, 'Já existe essa forma de pagamento.')
            
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
            check(name, 'Digite o nome da categoria.')
            const payment = await Access.getByName(id, name)
            check(payment, 'Forma de pagamento não existe.')

            await Access.deleteByName(id, name)

            return { status: 200, response: 'Forma de pagamento deletado com sucesso' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}