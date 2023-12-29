import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreationValidator from 'App/Validators/UserValidator'
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
      return response.status(400).json({ message: error })
    }
  }

  // missing email and password update

  public async destroy({ params, auth , response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user || user.id !== Number(params.id)) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const getUser = await User.findOrFail(user)
      await getUser.delete()
      return response.status(204).json({ message: 'Usuário excluido'})

    } catch (error) {
      return response.status(500).json({ error: 'Erro ao excluir usuário.' })
    }
  }


}
