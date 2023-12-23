import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientController {
  
  public async index({ auth }: HttpContextContract) {
    try {
      const user = auth.user!
      return { data: user, message: 'Informações do usuário'}
    } catch (error) {
      
    }
  }

  public async update({}: HttpContextContract) {
    return { message: 'update'}
  }



 

}
