import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccountValidator from 'App/Validators/AccountValidator'

export default class AccountsController {
  public async index({ auth , response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const accounts = await user.related('accounts').query()
      .where('user_id', user.id)
      return accounts
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao buscar categorias.' })
    }
  }

  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const { name, amount } = await request.validate(AccountValidator)

      const exists = await user.related('accounts').query().where('name', name).first()
      if(exists){
        return response.status(400).json({ message: 'Está conta já existe.'})
      }
      await user.related('accounts').create({ name, amount })
      return `Conta ${name} criada com sucesso.`
    } catch (error) {
      console.log(error)
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao criar conta.' })
    }
    
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const account = await user.related('accounts').query().where('id', params.id).first()

      await account?.delete()
      
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao deletar conta.'
    }
  }
}
