import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import { User } from 'App/Models'

export default class AuthController {

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(StoreValidator)
      const token = await auth.attempt(email, password, {
        expiresIn: '30 mins'
      })
      const data = await User.findByOrFail('email', email)
      if(!data) {
        return response.status(404).json('Usuário não identificado')
      }
      return response.status(200).json({ data: data, token: `Bearer ${token.token}` })

    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Credenciais Invalidas.'
    }
    
  }

  public async destroy({ auth }: HttpContextContract) {
    try {
      await auth.logout()
      return true
    } catch (error) {
      console.log(error)
    }
      
  }
}
