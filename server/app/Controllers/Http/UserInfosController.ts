import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserInfosController {

  public async show({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user;

      if (!user || user.id !== Number(params.id)) {
      return response.status(401).json({ message: 'Sem permissão.' });
      }

      const info = await user.related('userInfo').query().first();
      if (!info) {
        return response.status(404).json({ message: 'Informações do usuário não encontradas.' });
      }

      return response.status(200).json({ data: info, message: 'Informações do usuário.' });

    } catch (error) {
      return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }


  public async update({ params, auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user;
  
      if (!user || user.id !== Number(params.id)) {
        return response.status(401).json({ message: 'Sem permissão.' });
      }
  
      const info = await user.related('userInfo').query().first();
  
      if (!info) {
        return response.status(404).json({ message: 'Informações do usuário não encontradas.' });
      }
  
      info.merge(request.only(['photo_url', 'full_name', 'description', 'profession', 'phone', 'date_of_birth', 'gender', 'role']));
  
      await info.save();
  
      return response.status(200).json({ message: 'Informações do usuário atualizadas com sucesso.' });
  
    } catch (error) {
      console.error('Erro ao atualizar informações do usuário:', error);
      return response.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
  

}
