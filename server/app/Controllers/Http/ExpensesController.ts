import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExpenseValidator from 'App/Validators/expense/ExpenseValidator'

export default class ExpensesController {

  // show list of user expenses
  public async index({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' })
      }
      const data = await user?.related('expenses').query();
      return response.status(201).json({ data: data, message: 'Lista de despesas'})

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar despesas'})
    }
  }

  // create expense
  public async store({ request, auth, response }: HttpContextContract) {

    try {
      const user = auth.user 
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const data = await request.validate(ExpenseValidator)
      const value_installment = data.value / data.installments
      const fullData = {  ...data, value_installment }
      const expense = await user.related('expenses').create(fullData)
      return response.status(201).json({ data: expense, message: 'Despesa criada com sucesso' })

    } catch (error) {
      return response.status(500).json({ message: error })
    }
    
  }

  // update expense status
  public async update({ request, params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
  
      const expense = await user.related('expenses').query().where('id', params.id).first()
      if (!expense) {
        return response.status(404).json({ message: 'Despesa não encontrada.' })
      }
      
      expense.merge(request.only(['status']));
      await expense.save();
      return response.status(200).json({ message: 'Status da despesa atualizado com sucesso.' })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar o status da despesa.' })
    }
  }
  

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user;
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }

      const expense = await user.related('expenses').query().where('id', params.id).first()
      if (!expense) {
        return response.status(404).json({ message: 'Despesa não encontrada.' })
      }
      await expense.delete()
      return response.status(200).json({ message: 'Despesa excluída com sucesso.' })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir a despesa.' })
    }
  }
}
