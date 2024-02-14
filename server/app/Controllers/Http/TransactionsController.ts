import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionValidator from 'App/Validators/TransactionValidator'

export default class TransactionsController {

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

  public async destroy({}: HttpContextContract) {}
}
