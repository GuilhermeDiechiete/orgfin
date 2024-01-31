import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'

export default class AuthController {

  public async store({ auth, request }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(StoreValidator)
      const token = await auth.attempt(email, password, {
        expiresIn: '30 mins'
      })
      return token

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
