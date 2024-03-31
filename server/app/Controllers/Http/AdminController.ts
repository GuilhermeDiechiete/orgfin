import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class AdminController {

  public async index({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const users = await User.all()
      return users
  
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao buscar transações.'
    }
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const u = await User.findByOrFail('id', params.id)
      
      await u?.delete()
      
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao deletar transação.'
    }
  }

  public async changeStatus({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const transaction = await user.related('transactions').query().where('id', params.id).first()

      if(transaction && transaction.status !== undefined) {
        transaction.status = !transaction.status;
        await transaction.save(); // Salvar a transação atualizada
      }
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao atualizar status da transação.'
    }
  }
}