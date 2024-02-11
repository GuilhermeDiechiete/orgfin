import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { StoreValidator } from 'App/Validators/User'

export default class UsersController {

  public async store({ request , response }: HttpContextContract) {
    try {
      const { username, email, password } = await request.validate(StoreValidator)
      const user = await User.create({ username, email, password })
      await user.save()
      const userKey = 'secretKey' + username
      user.related('keys').create({ key: userKey })
      return 'Usuário criado com sucesso.'
      

    } catch (error) {
      
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao criar usuário.' })
    }
    
  }

  public async show({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user || user.id !== params.id){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const infoUser = await User.findByOrFail('id', user.id)
      return infoUser

    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao buscar usuário.'
    }

  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
