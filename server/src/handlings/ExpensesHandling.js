const { check ,  } = require('../fragments/validators/validators')
const Access = require('../database/access/ExpensesAccess')

module.exports = class CategoryHandling {
    static async expensesCreate(req) {
        console.log(req)
        const id = req.params.id 
        const expenses = { ...req.body }

        try {
            check(expenses.amount, 'Informe o valor da despesa.') // preciso validar apenas numeros
            check(expenses.day, 'Informe o dia de pagamento.')
            check(expenses.month, 'Inform o mes da despesa.')
            check(expenses.year, 'Informe o ano da despesa.')
            check(expenses.description, 'Informe uma descrição.')
            check(expenses.payment, 'Informe a forma de pagamento.')
            check(expenses.category, 'Informe uma categoria.')
            check(expenses.installment_number, 'Informe o numero de parcelas.')
            check(expenses.installment_amount, 'Informe o valor da parcela')
            
            expenses.status = false
            expenses.user_id = id

            const pay = await Access.getPaymentByName(id, expenses.payment)
            check(pay, 'Forma de pagamento não existe')

            expenses.payment = pay.id
            const category = await Access.getCategoryByName(id, expenses.category)
            check(category, 'Categoria não existe.')
            expenses.category = category.id
    
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
            check(expenses.year, 'Selecione o ano das despesas')
            check(expenses.month, 'Selecione o mês das despesas.')
            const getExpenses = await Access.getExpenses(id, expenses)
            return { status: 200, response: getExpenses}
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

