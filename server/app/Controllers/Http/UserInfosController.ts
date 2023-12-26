import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserInfo from 'App/Models/UserInfo';

export default class UserInfosController {

  public async show({ params, auth, response }: HttpContextContract) {
    try {
      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const userId = params.id
      const userInfo = await UserInfo.findOrFail(userId)
      return response.status(201).json({ data: userInfo, message: 'Informações do'})
    } catch (error) {
      return response.status(400).json({ message: 'Não foi possivel buscar as informações.'})
    }
  }

  public async update({ params, auth, request, response }: HttpContextContract) {
    try {

      if (!auth.user) {
        return response.status(401).json({ message: 'Usuário não autenticado.' });
      }
      const userId = Number(params.id); 
    
      if (auth.user.id !== userId) {
        return response.status(403).json({ message: 'Não autorizado a atualizar informações deste usuário.' });
      }

      const userInfo = await UserInfo.findByOrFail('user_id', userId);
  
      userInfo.merge(request.only(['photo_url', 'full_name', 'description', 'profession', 'phone', 'date_of_birth', 'gender', 'role']));
      await userInfo.save();
  
      return response.status(200).json({ message: 'Informações do usuário atualizadas com sucesso.' });
      
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Erro ao atualizar informações do usuário.' });
    }
  } 

}
