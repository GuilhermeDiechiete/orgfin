const V = require('../fragments/validators')
const Access = require('../database/access/IncomeAccess')

module.exports = class IncomeHandling {
    static async IncomeCreate(req) {
        const userId = req.params.id
        const income = { ...req.body }

        try {
            V.check(income.description, 'descrição').notNull()
            V.check(income.income_value, 'valor da renda').notNull()
            V.check(income.day, 'dia').notNull()
            V.check(income.month, 'mês').notNull()
            V.check(income.year, 'ano').notNull()
            
            const save = await Access.saveIncome(userId, income)
            V.check(save, 'salvar renda').errorIn('Erro ao tentar salvar a renda.')
            return { status: 200, response: 'Renda cadastrada com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async incomeList(req) {
        const userId = req.params.id 
        const income = { ...req.body }
        
        V.check(income.month, 'mês').notNull()
        V.check(income.year, 'ano').notNull()

        try {
            const getIncome = await Access.getIncomeByUserId(userId)
            return { status: 200, response: getIncome }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async listByMonth(req) {
        const userId = req.params.id 
        const income = { ...req.body }

        V.check(income.month, 'mês').notNull()
        V.check(income.year, 'ano').notNull()

        try {
            const incomes = await Access.getIncomeByMonthAndYear(userId, income)
            return { status: 200, response: incomes }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    
    static async IncomeDelete(req) {
        const userId = req.params.id
        const id = req.params.IncomeId
        try {
            V.check(id, 'renda').exists()
            const income = await Access.getByName(id)
            check(income, 'Renda não existe.')

            await Access.deleteByName(id)

            return { status: 200, response: 'Renda deletada com sucesso' }
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}