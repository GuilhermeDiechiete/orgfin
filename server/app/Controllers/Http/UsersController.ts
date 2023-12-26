import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreationValidator from 'App/Validators/user/UserCreationValidator'
import UserInfo from 'App/Models/UserInfo'
import UserAddress from 'App/Models/UserAddress'

export default class UsersController {

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UserCreationValidator)
      const { confirmPassword, ...userData } = data

      // user create
      const user = await User.create(userData)
      const user_info = await UserInfo.create({ user_id: user.id })
      
      if(!user_info) {
        return response.status(201).json({ data: user, message: 'Erro ao criar informações.' })
      }

      const user_address = await UserAddress.create({ user_id: user_info.id })

      if(!user_address) {
        return response.status(201).json({ data: user, message: 'Erro ao criar informações.' })
      }

      return response.status(201).json({ data: user, message: 'Usuário criado com sucesso.' })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: error.messages })
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ params, auth , response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const userId = params.id
      const user = await User.findOrFail(userId)
      
      if (auth.user?.id !== user.id) {
        return response.status(403).json({ error: 'Não autorizado a excluir este usuário.' })
      }

      await user.delete()

      return response.status(204).json({ message: 'Usuário excluido'})
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir usuário.' })
    }
  }


}
