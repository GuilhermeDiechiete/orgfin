import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/category/categoryValidator.'

export default class CategoriesController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const user = auth.user;

      const categories = await user?.related('categories').query();

      return response.status(200).json({ data: categories, message: 'Lista de categorias' });

    } catch (error) {
      console.error('Erro ao obter lista de categorias:', error);
      return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  public async store({ request, auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const user = auth.user!
      const data = await request.validate(CategoryValidator)
      const exists = await user?.related('categories').query().where('name', data.name).first();

      if(exists) {
        return response.status(400).json({ message: 'Categoria já existe'})
      }

      const category = await user.related('categories').create(data)

      return response.status(201).json({ data: category, message: 'Categoria Criada.'})
    } catch (error) {
      return response.status(500).json({ message: error })
    }
    
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const user = auth.user!;
      const categoryId = params.id;

      const category = await user?.related('categories').query().where('id', categoryId).first();

      if (!category) {
        return response.status(404).json({ message: 'Categoria não encontrada para o usuário.' });
      }

      await category.delete();

      return response.status(200).json({ message: 'Categoria excluída com sucesso.' });

    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}
