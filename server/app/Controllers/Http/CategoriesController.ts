import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const categories = await Category.all()
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
      const data = request.only(['name'])

      const category = await user.related('categories').create(data)
      return response.status(201).json({ data: category, message: 'Categoria Criada.'})
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
      return response.status(500).json({ message: 'Erro interno do servidor.' })
    }
    
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const user = auth.user!;
      const categoryId = params.id;
      const category = await user.related('categories').query().where('id', categoryId).first();

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
