import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/UserAddress'

export default class UserAddressesController {

  public async show({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if (!user || user.id !== Number(params.id)) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }

    const address = await Address.query().where('user_id', user.id).first()
    if (!address) {
      return response.status(404).json({ message: 'Informações do usuário não encontradas.' })
    }
    return response.status(200).json({ data: address, message: 'Informações do usuário.' })

    } catch (error) {
      return response.status(500).json({ message: 'Informações do usuário não encontradas.' })
    }
  }

  public async update({ params, auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user;
      if (!user || user.id !== Number(params.id)) {
        return response.status(401).json({ message: 'Sem permissão.' })
      }
  
      const address = await Address.findByOrFail('user_id', user.id);
      address.merge(request.only(['street', 'number', 'city', 'state', 'postal_code']))
  
      await address.save()
      return response.status(200).json({ message: 'Endereço atualizado com sucesso.' })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar o endereço.' })
    }
  }
    
}
