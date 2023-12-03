const V = require('../fragments/validators')
const Access = require('../database/access/ExpensesAccess')

module.exports = class CategoryHandling {
    static async expensesCreate(userId, expense) {
        try {
            V.check(expense.description, 'descrição').notNull()
            V.check(expense.amount, 'valor').notNull()
            V.check(expense.day, 'dia').notNull()
            V.check(expense.month, 'mês').notNullMsg('Selecione o mês da despesa na barra de meses a cima')
            V.check(expense.year, 'ano').notNullMsg('Selecione o ano na opção a cima')
            V.check(expense.payment, 'forma de pagamento').notNull()
            V.check(expense.category, 'categoria').notNull()
            V.check(expense.installment_number, 'numero de parcelas').notNull()
            V.check(expense.installment_amount, 'valor das parcelas').notNull()
            
            expense.status = false
            expense.user_id = userId 

            const pay = await Access.getPaymentByName(userId, expense.payment)
            V.check(pay, 'forma de pagamento').invalidMsg('Selecione uma forma de pagamento.')
            expense.payment = pay.payment_name

            const category = await Access.getCategoryByName(userId, expense.category)
            V.check(category, 'categoria').invalidMsg('Selecione uma categoria.')
            expense.category = category.category_name
    
            await Access.save(userId, expense)
            

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
    static async showTotalExpenses(userId, year) {
        try {
            const expenses = await Access.getAllCategoriesWithExpensesByYear( userId, year)
            const valueMonth = await Access.getFullAmountOfExpensesByCategory(userId, year)
            console.log('resultado', expenses)
            console.log('valores por mes', valueMonth)
            return { status: 200, response: {expenses:expenses, valueMonth:valueMonth}}
        } catch (error) {
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

