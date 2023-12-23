import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only([ 'username', 'email', 'password', 'confirmPassword' ])

      if(data.password !== data.confirmPassword) {
        return response.status(400).json({ message: 'Senhas não conferem.'})
      }
      delete data.confirmPassword

      const user = await User.create(data)

      return response.status(201).json({ data: user, message: 'Usuário criado com sucesso.' })
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao criar usuário'})
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}


}
