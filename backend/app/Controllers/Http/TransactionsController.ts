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
      
      const transaction = await user.related('transactions').create(data)
      return transaction

    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      console.log('erro', error)
      return 'Erro ao tentar criar transação.'
    }
    
  }

  public async destroy({}: HttpContextContract) {}
}
