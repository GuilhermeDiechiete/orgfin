import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionValidator from 'App/Validators/TransactionValidator'

export default class TransactionsController {
  // create transaction
  public async store({ request, auth, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.status(401).json({ message: 'Sem permissão.' })
    }

    const data = await request.validate(TransactionValidator)
    const transaction = await user?.related('transactions').create(data)
    return response
      .status(201)
      .json({ data: transaction, message: 'Transação criada com sucesso.' })
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const transaction = await user?.related('transactions').query().where('id', params.id).first()

      if (!transaction) {
        return response.status(404).json({ message: 'Transação não encontrada.' })
      }

      await transaction?.delete()

      return response.status(200).json({ message: 'Transação excluída com sucesso.' })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao excluir a transação.' })
    }
  }
}
