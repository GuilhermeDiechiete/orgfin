import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {

  // login
  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const data = await request.validate(AuthValidator)
      const { email, password } = data

      const token = await auth.attempt(email, password, {
        expiresIn: '2 days'
      })
      return response.status(200).json({token, message: 'Login efetuado com sucesso.'})
    } catch (error) {

      if (error.code === 'E_INVALID_AUTH_PASSWORD') {
        return response.status(400).json({ message: 'Senha incorreta.' })
      }
      if (error.code === 'E_INVALID_AUTH_UID') {
        return response.status(400).json({ message: 'E-mail não cadastrado.' })
      }
      return response.status(400).json({ message: 'Credenciais inválidas.' })
    }
  }

  // logout
  public async destroy({ auth, response }: HttpContextContract) {
    try {
      await auth.logout()
      return response.status(200).json({ message: 'Logout Efetuado com sucesso.'})

    } catch (error) {
      return response.status(400).json({ message: 'Erro ao efetuar logout.'})
    }  
  }
}
