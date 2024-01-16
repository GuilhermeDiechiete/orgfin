import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchTransactionsController {
  
  public async searchTransactionsByMonth({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const expenses = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('type', 'expense')
      .where('month', params.month)
      .where('year', params.year)

      const incomes = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('type', 'income')
      .where('month', params.month)
      .where('year', params.year)

      const investments = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('type', 'investment')
      .where('month', params.month)
      .where('year', params.year)

      return response.status(200).json({expenses: expenses, incomes:incomes, investments:investments})
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao buscar transações' })
    }
  }
  public async searchTotalTransactions({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }

      

      const amountsExpense = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('month', params.month)
      .where('type', 'expense')
      .select('amount')

      const total: number = amountsExpense.reduce((acc, expense) => acc + Number(expense.amount), 0);

      return response.json({ totalExpenses: total });
      
      
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar a soma total.' });
    }
  }
}
