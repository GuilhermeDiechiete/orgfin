import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator.'

export default class CategoriesController {

  // show list of user categories
  public async index({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' })
      }
      const categories = await user?.related('categories').query()
      return response.status(200).json({ data: categories, message: 'Lista de categorias.' })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao listar categorias.' })
    }
  }
  // create category
  public async store({ request, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' })
      }
      const data = await request.validate(CategoryValidator)

      const exists = await user?.related('categories').query().where('name', data.name).where('user_id', user.id).first()

      if(exists) {
        return response.status(400).json({ message: 'Categoria já existe'})
      }
      const category = await user.related('categories').create(data)

      return response.status(201).json({ data: category, message: 'Categoria Criada com sucesso.'})

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar categoria.' })
    } 
  }

  // delete category by id
  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' })
      }
      const categoryId = params.id
      const category = await user?.related('categories').query().where('id', categoryId).first()

      if (!category) {
        return response.status(404).json({ message: 'Categoria não encontrada para o usuário.' })
      }
      await category.delete()
      return response.status(200).json({ message: 'Categoria excluída com sucesso.' })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir categoria.' })
    }
  }
}
