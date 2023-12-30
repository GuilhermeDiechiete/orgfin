import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserIncomesValidator from 'App/Validators/UserIncomesValidator'

export default class UserIncomesController {

  public async showByYear({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user) {
        return response.status(401).json({ message: 'Não autenticado'})
      }
      const year = params.year 

      if(!year) {
        return response.status(400).json({ message: 'Selecione o ano'}) 
      }

      const data = await user?.related('incomes').query().where('year', year).where('user_id', user.id)

      return response.status(200).json({ data: data, message: 'Rendas do ano: ', year})
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }


  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user) {
        return response.status(401).json({ message: 'Não autenticado'})
      }
      const data = await request.validate(UserIncomesValidator)
      const income = await user?.related('incomes').create(data)

      return response.status(201).json({ data:income, message: 'Renda criada com sucesso.'})

    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

  public async destroy({}: HttpContextContract) {}
}
