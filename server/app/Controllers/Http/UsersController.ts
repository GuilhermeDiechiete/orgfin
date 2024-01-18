import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'

export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    try {

      const data = await request.validate(UserCreateValidator)
      const { confirmPassword, ...userData } = data

      await User.create(userData)
      return response.status(201).json({ message: 'Usuário criado com sucesso.' })

    } catch (error) {

      console.log('ERRO ( UserController -> store', error.messages.errors)
      return response.status(400).json({ message: error.messages.errors })
    }
  }

  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if(!user) {
        return response.status(401).json({ message: 'Usuário não autenticado.'})
      }
      const data = await User.findOrFail(user.id)
      return response.status(200).json({ data: data })

    } catch (error) {

      console.log('ERRO ( UserController -> show', error)
      return response.status(400).json({ message: error })
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user || user.id !== Number(params.id)) {
        return response.status(401).json({ message: 'Usuário não autenticado.' })
      }
      const getUser = await User.findOrFail(user)

      await getUser.delete()
      return response.status(204).json({ message: 'Usuário excluido' })

    } catch (error) {
      console.log('Erro ( UserController -> destroy', error)
      return response.status(500).json({ error: 'Erro ao excluir usuário.' })
    }
  }
}
