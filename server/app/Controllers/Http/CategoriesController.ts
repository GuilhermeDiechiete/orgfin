import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const categories = await user?.related('categories').query()
      return response.status(200).json({ data: categories })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: error });
    }
  }
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
      return response.status(400).json({ message: error });
    }
    
  }


  public async destroy({ auth, params, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
      const categoryId = params.id

      const category = await user.related('categories').query().where('id', categoryId).first()

      if (!category) {
        return response.status(404).json({ message: 'Categoria não encontrada.' })
      }

      await category.delete();

      return response.status(204).json({ message: 'Categoria excluida'})
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: error.messages.errors });
    }
  }
}
