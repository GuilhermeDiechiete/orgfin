import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class UsersController {
  
  public async store({ request }: HttpContextContract) {

    const data = request.only([
      'full_name', 
      'photo_url', 
      'date_of_birth', 
      'description', 
      'profession', 
      'gender', 
      'address_id'])
    
    return { message: 'store'}
  }

  public async show({ params }: HttpContextContract) {

    const user = await Profile.findOrFail(params.id)
    return { data: user, message: 'show'}
  }

  public async update({}: HttpContextContract) {
    return { message: 'update'}
  }

}
