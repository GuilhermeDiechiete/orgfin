import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FinancialDashboardsController {

  public async getExpenseByMonth({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Não autenticado, faça login!' })
      }

      const year = params.year
      const month = params.month 

      if(!year || !month) {
        return response.status(400).json({ message: 'Para fazer uma busca, selecione o ano e mês desejado.'})
      }

      const getExpenses = await user?.related('expenses').query().select([
        'month',
        'name', 
        'value', 
        'payment', 
        'category', 
        'installments', 
        'value_installment', 
        'status'

      ]).where('year', year)

      const expenses: Record<string, any> = {}
      const totalInstallments: Record<string, number> = {};

      if (getExpenses) {
      getExpenses.forEach((expense) => {
        const month = expense.month.toString();

        if (!expenses[month]) {
          expenses[month] = [];
          totalInstallments[month] = 0;
        }

        expenses[month].push(expense.toJSON());
        totalInstallments[month] += Number(expense.value_installment);
      });
    }
      
      return response.status(200).json({ 
        data: {expenses, totalInstallments },
        message: `Despesas para o ano ${year} organizadas por mês`,
      })

    } catch (error) {
      return response.status(400).json({ 
        message: 'Não foi possivel buscar despesas do ano.'})
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
