const V = require('../fragments/validators')
const Access = require('../database/access/ExpensesAccess')

module.exports = class CategoryHandling {
    static async expensesCreate(req) {
        const id = req.params.id 
        const expenses = { ...req.body }

        try {
            V.check(expenses.description, 'descrição').notNull()
            V.check(expenses.amount, 'valor').notNull()
            V.check(expenses.day, 'dia').notNull()
            V.check(expenses.month, 'mês').notNullMsg('Selecione o mês da despesa na barra de meses a cima')
            V.check(expenses.year, 'ano').notNullMsg('Selecione o ano na opção a cima')
            V.check(expenses.payment, 'forma de pagamento').notNull()
            V.check(expenses.category, 'categoria').notNull()
            V.check(expenses.installment_number, 'numero de parcelas').notNull()
            V.check(expenses.installment_amount, 'valor das parcelas').notNull()
            
            expenses.status = false
            expenses.user_id = id

            const pay = await Access.getPaymentByName(id, expenses.payment)
            V.check(pay, 'forma de pagamento').invalidMsg('Selecione uma forma de pagamento.')
            expenses.payment = pay.payment_name

            const category = await Access.getCategoryByName(id, expenses.category)
            V.check(category, 'categoria').invalidMsg('Selecione uma categoria.')
            expenses.category = category.category_name
    
            await Access.save(id, expenses)
            

            return { status: 200, response: 'Despesa criada com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
    static async expensesList(req) {
        const id = req.params.id
        const expenses = { ...req.query }

        try {
            V.check(expenses.year, 'ano').notNull()
            V.check(expenses.month, 'mes').notNull()
            const getExpenses = await Access.getExpenses(id, expenses)
            return { status: 200, response: getExpenses}
        } catch (error) {
            return { status: 400, response: error.message }
        }
        
    }
    static async expensesTotalMonth(req) {
        const id = req.params.id
        const getYear = { ...req.query }
       

        try {
            V.check(getYear.year, 'ano').notNull()
            const getExpenses = await Access.getExpensesTotalMonth(id, getYear.year)
            return { status: 200, response: getExpenses}
        } catch (error) {
            console.log(error)
            return { status: 400, response: error.message }
        }
        
    }
    static async expensesDelete(req) {
        const id = req.params.id 
        const expense = { ...req.body }

        try {
            check(expense.expense_id, 'Não foi possivel excluir a despesa.')

            const del = await Access.delete(id, expense.expense_id)
            check(del, 'Não foi possivel exluir despesa, não existe.')
            return { status: 200, response: 'Despesa deletada com sucesso.'}
        } catch (error) {
            return { status: 400, response: error.message }
        }
    }
}

