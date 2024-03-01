import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionValidator from 'App/Validators/TransactionValidator'

export default class TransactionsController {

  // criar nova transação
  public async store({ request , auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const data = await request.validate(TransactionValidator)
      
      await user.related('transactions').create(data)
      return 'Transação criada com sucesso.'

    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao criar transação.' })
    }
    
  }
  public async getByYear({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const year = params.year 

      interface MonthlyTotal {
        month: number,
        total: number
      }

      const totalExpenses: MonthlyTotal[] = []
      const totalIncomes: MonthlyTotal[] = []
      const totalInvestments: MonthlyTotal[] = []

      for(let month = 1; month <= 12; month++) {
        const expenses = await user.related('transactions').query()
        .whereRaw('EXTRACT(YEAR FROM date) = ?', [year])
        .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
        .where('type', 'expense')

        const incomes = await user.related('transactions').query()
        .whereRaw('EXTRACT(YEAR FROM date) = ?', [year])
        .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
        .where('type', 'income')

        const investments = await user.related('transactions').query()
        .whereRaw('EXTRACT(YEAR FROM date) = ?', [year])
        .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
        .where('type', 'investment')

        const totalByMonthExpenses: number = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)
        const totalByMonthIncomes: number = incomes.reduce((acc, income) => acc + Number(income.amount), 0)
        const totalByMonthInvestmets: number = investments.reduce((acc, investment) => acc + Number(investment.amount), 0)

        totalExpenses.push({ 
          month, total: totalByMonthExpenses || 0
        })
        totalIncomes.push({
          month, total: totalByMonthIncomes || 0
        })
        totalInvestments.push({
          month, total: totalByMonthInvestmets || 0
        })
      }

      const totalAnnualExpenses: number = totalExpenses.reduce((acc, { total }) => acc + total, 0);
      const totalAnnualIncomes: number = totalIncomes.reduce((acc, { total }) => acc + total, 0);
      const totalAnnualInvestments: number = totalInvestments.reduce((acc, { total }) => acc + total, 0);

      return response.status(200).json({
        totalExpenses, totalIncomes, totalInvestments,
        totalAnnualExpenses, totalAnnualIncomes, totalAnnualInvestments
      })
  
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao buscar transações.'
    }
  }

  public async getByMonth({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const expenses = await user.related('transactions').query()
      .whereRaw('EXTRACT(YEAR FROM date) = ? AND EXTRACT(MONTH FROM date) = ?', [params.year, params.month])
      .where('type', 'expense')

      const incomes = await user.related('transactions').query()
      .whereRaw('EXTRACT(YEAR FROM date) = ? AND EXTRACT(MONTH FROM date) = ?', [params.year, params.month])
      .where('type', 'income')

      const investments = await user.related('transactions').query()
      .whereRaw('EXTRACT(YEAR FROM date) = ? AND EXTRACT(MONTH FROM date) = ?', [params.year, params.month])
      .where('type', 'investment')


      const totalByMonthExpenses: number = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)
      const totalByMonthIncomes: number = incomes.reduce((acc, income) => acc + Number(income.amount), 0)
      const totalByMonthInvestments: number = investments.reduce((acc, investment) => acc + Number(investment.amount), 0)

      const surplus =  totalByMonthIncomes - (totalByMonthExpenses + totalByMonthInvestments)

      console.log(expenses)
      return response.status(200).json({
        expenses, incomes, investments, totalByMonthExpenses, totalByMonthIncomes, totalByMonthInvestments, surplus
        
      })
      
    } catch (error) {
      console.log(error)
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao buscar transações.'
    }
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const transaction = await user.related('transactions').query().where('id', params.id).first()

      await transaction?.delete()
      
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao deletar transação.'
    }
  }

  public async changeStatus({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const transaction = await user.related('transactions').query().where('id', params.id).first()

      if(transaction && transaction.status !== undefined) {
        transaction.status = !transaction.status;
        await transaction.save(); // Salvar a transação atualizada
      }
       

    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao atualizar status da transação.'
    }
  }
}
