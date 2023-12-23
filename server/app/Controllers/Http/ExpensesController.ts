import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Expense from 'App/Models/Expense';

export default class ExpensesController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const data = await Expense.all()
      return response.status(201).json({ data: data, message: 'Lista de despesas'})
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar despesas'})
    }
  }

  public async store({ request, auth, response }: HttpContextContract) {

    try {
      if (!auth.user) {
      return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const user = auth.user!;

      const data = request.only(['year', 'month', 'name', 'value', 'payment', 'category', 'installments', 'value_installment']);

      if(data.installments !== 0) {
        const calc = data.value / data.installments
        data.value_installment = calc
      } else {
        return response.status(400).json({ message: 'Numero de parcelas invalidas'})
      }

      const expense = await user.related('expenses').create(data)

      return response.status(201).json({ data: expense, message: 'Despesa criada com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar despesas'})
    }
    
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
