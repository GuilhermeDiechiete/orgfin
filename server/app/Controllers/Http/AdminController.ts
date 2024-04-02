import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class AdminController {

  // busca todos os usuários do sistema
  public async index({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const users = await User.all()
      return users
  
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao buscar transações.'
    }
  }

  // deleta o usuário
  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const u = await User.findByOrFail('id', params.id)
      
      await u?.delete()
      
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao deletar transação.'
    }
  }

  // atualiza o papel do usuário [ admin / normal ]
  public async changeRole({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const u = await User.findByOrFail('id', params.id)
      
      if(u && u.role !== undefined) {
        u.role = !u.role;
        await u.save(); // Salvar a transação atualizada
      }
      console.log('atualizei papel')
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao atualizar papel do usuário.'
    }
  }
}