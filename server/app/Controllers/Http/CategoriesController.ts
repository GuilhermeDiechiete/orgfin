import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }

      const data = await request.validate(CategoryValidator)
      const category = await user?.related('categories').create(data)
      
      return response
        .status(201)
        .json({ message: `Categoria ${ category.name } criada com sucesso` })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: error.messages.errors });
    }
    
  }


  public async destroy({}: HttpContextContract) {}
}
