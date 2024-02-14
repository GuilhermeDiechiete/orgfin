import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index({ auth , response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const categories = await user.related('categories').query()
      .where('user_id', user.id)
      return categories
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao buscar categorias.' })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const { name } = await request.validate(CategoryValidator)

      const exists = await user.related('categories').query()
      .where('name', name)
      .where('user_id', user.id).first()

      if(exists) {
        return response.status(400).json({ message: 'Está Categoria já existe.'})
      }
      await user.related('categories').create({ name })
      return 'Categoria criada com sucesso.'
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao criar categoria.' })
    }
    

  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const category = await user.related('categories').query().where('id', params.id).first()

      await category?.delete()
      
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao deletar categoria.'
    }
  }
}
