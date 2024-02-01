import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccountValidator from 'App/Validators/AccountValidator'

export default class AccountsController {
  public async index({}: HttpContextContract) {}

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
      return response.status(201).json({ message: `Conta ${name} criada com sucesso.`})
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao tentar criar conta.'
    }
    
  }

  public async destroy({}: HttpContextContract) {}
}
