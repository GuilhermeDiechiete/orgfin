import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchTransactionsController {
  
  public async getTransactionsByMonth({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }

      const month = params.month 
      const year = params.year

      const outputs = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('type', 'output')
      .where('month', month).where('year', year)

      const inputs = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('type', 'input')
      .where('month', month).where('year', year)

      const investments = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('type', 'investment')
      .where('month', month).where('year', year)

      return response.status(200).json({ outputs, inputs, investments})

    } catch (error) {
      console.log('ERRO ( SearchTransactionsController -> getTransactionsByMonth', error.messages.errors)
      return response.status(400).json({ message: 'Erro ao buscar transações' })
    }
  }
  public async getTotalTransactionsByMonth({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const amountsExpense = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('month', params.month)
      .where('type', 'output')
      .select('amount')

      const amountsIncome = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('month', params.month)
      .where('type', 'input')
      .select('amount')

      const amountsInvestment = await user?.related('transactions').query()
      .where('user_id', user.id)
      .where('month', params.month)
      .where('type', 'investment')
      .select('amount')

      const totalExpenses: number = amountsExpense.reduce((acc, expense) => acc + Number(expense.amount), 0);
      const totalIncomes: number = amountsIncome.reduce((acc, income) => acc + Number(income.amount), 0);
      const totalInvestments: number = amountsInvestment.reduce((acc, investment) => acc + Number(investment.amount), 0);

      return response.json({  totalExpenses: totalExpenses, totalIncomes: totalIncomes, totalInvestments: totalInvestments });
      
    } catch (error) {
      console.log('ERRO ( SearchTransactionsController -> getTotalTransactionsByMonth', error.messages.errors)
      return response.status(500).json({ error: 'Erro ao buscar a soma total.' });
    }
  }
  public async getTotal({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }

      interface MonthlyTotal {
        month: number;
        total: number;
      }
      
      const totalOutputs: MonthlyTotal[] = [];

      for(var month = 1; month <= 12; month++) {
        const total = await user?.related('transactions').query()
        .where('user_id', user.id)
        .where('month', month)
        .where('type', 'output')
        .where('year', params.year)

        const totalByMonth: number = total.reduce((acc, output) => acc + Number(output.amount), 0);

        totalOutputs.push({
          month, 
          total: totalByMonth || 0
        })
      }

      console.log(totalOutputs)

      return response.json({ data: totalOutputs });
      
    } catch (error) {
      console.log('ERRO ( SearchTransactionsController -> getTotalTransactionsByMonth', error.messages.errors)
      return response.status(500).json({ error: 'Erro ao buscar a soma total.' });
    }
  }
}
