import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionValidator from 'App/Validators/TransactionValidator'
import { DateTime } from 'luxon'

export default class TransactionsController {
  // create transaction
  public async store({ request, auth, response }: HttpContextContract) {
    
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const data = await request.validate(TransactionValidator)

      const formatDate = DateTime.fromISO(data.date)

      const day = formatDate.day 
      const month = formatDate.month 
      const year = formatDate.year 

      const fullData = { day, month, year, ...data }
      
      const transaction = await user?.related('transactions').create(fullData)
      return response
        .status(201)
        .json({ data: transaction, message: 'Transação criada com sucesso.' })
    } catch (error) {
      console.log('ERRO ( TransactionsController -> store', error.messages.errors)
      return response.status(400).json({ message: error.messages.errors });
    }
    
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
