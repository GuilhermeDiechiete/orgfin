import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PanelsController {

  public async show({ params, auth, response }: HttpContextContract) {
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

      const expenses = await user?.related('expenses').query()
      .select([
        'month',
        'name', 
        'value', 
        'payment', 
        'category', 
        'installments', 
        'value_installment', 
        'status'
      ])
      .where('year', year)

      const organizedExpenses: Record<string, any> = {}
      const valueTotalByMonth: Record<string, number> = {};

      if (expenses) {
      expenses.forEach((expense) => {
        const month = expense.month.toString();

        if (!organizedExpenses[month]) {
          organizedExpenses[month] = [];
          valueTotalByMonth[month] = 0;
        }

        organizedExpenses[month].push(expense.toJSON());
        valueTotalByMonth[month] += Number(expense.value);
      });
    }
      
      return response.status(200).json({ 
        data: {organizedExpenses, valueTotalByMonth },
        message: `Despesas para o ano ${year} organizadas por mês`,
      })

    } catch (error) {
      return response.status(400).json({ 
        message: 'Não foi possivel buscar despesas do ano.'})
    }
  }

  public async showByMonth({ params, auth, response }: HttpContextContract) {
    try {
      await auth.authenticate()

      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Não autenticado, faça login!' })
      }

      const year = params.year
      const month = params.month 

      console.log(year,month)
      if(!year || !month) {
        return response.status(400).json({ message: 'Para buscar, selecione o ano e mês desejado.'})
      }
      
      const expenses = await user?.related('expenses').query()
      .select([
        'month',
        'name', 
        'value', 
        'payment', 
        'category', 
        'installments', 
        'value_installment', 
        'status'
      ])
      .where('year', year).where('month', month)

      const organizedExpenses: Record<string, any> = {}
      const valueTotalByMonth: Record<string, number> = {};

      if (expenses) {
      expenses.forEach((expense) => {
        const month = expense.month.toString();

        if (!organizedExpenses[month]) {
          organizedExpenses[month] = [];
          valueTotalByMonth[month] = 0;
        }

        organizedExpenses[month].push(expense.toJSON());
        valueTotalByMonth[month] += Number(expense.value);
      });
    }
      return response.status(200).json({ 
        data: {organizedExpenses, valueTotalByMonth },
        message: `Despesas para o ano ${year} organizadas por mês`,
      })

    } catch (error) {
      return response.status(400).json({ 
        message: 'Não foi possivel buscar despesas do ano.'})
    }
  }
}

