import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchesController {

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

        const totalByMonth: number = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)

        totalExpenses.push({
          month, total: totalByMonth || 0
        })
      }

      for(let month = 1; month <= 12; month++) {
        const incomes = await user.related('transactions').query()
        .whereRaw('EXTRACT(YEAR FROM date) = ?', [year])
        .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
        .where('type', 'income')

        const totalByMonth: number = incomes.reduce((acc, income) => acc + Number(income.amount), 0)

        totalIncomes.push({
          month, total: totalByMonth || 0
        })
      }

      for(let month = 1; month <= 12; month++) {
        const investments = await user.related('transactions').query()
        .whereRaw('EXTRACT(YEAR FROM date) = ?', [year])
        .whereRaw('EXTRACT(MONTH FROM date) = ?', [month])
        .where('type', 'investment')

        const totalByMonth: number = investments.reduce((acc, investment) => acc + Number(investment.amount), 0)

        totalInvestments.push({
          month, total: totalByMonth || 0
        })
      }
console.log(totalExpenses)
      return response.status(200).json({
        
        totalExpenses, totalIncomes, totalInvestments
      })

      
    } catch (error) {
      console.log(error)
    }
  }

  
}
