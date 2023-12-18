import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {

    public async index({ response }: HttpContextContract) {
        try {
            const users = await User.all()
            return {
                message: 'Lista de usuários.',
                data: users
            }
        } catch (error) {
            response.status(500).json({
                message: 'Usuário não encontrado',
            })
        }
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const userId = params.id
            const user = await User.findOrFail(userId)
            return {
                message: 'Usuário encontrado.',
                data: user
            }
        } catch (error) {
            response.status(500).json({
                message: 'Usuário não encontrado',
            })
        }
    }

    public async store({request, response}: HttpContextContract) {
        try {

            const data = await request.validate(UserValidator)
            const user = await User.create(data)
            
            return {
                message: 'Usuário criado com sucesso',
                data: user
            }
        } catch (error) {
            response.status(500).json({
                message: error
            })
        }  
    }

    public async update({ request, params, response }: HttpContextContract) {
        try {
            const data = await request.validate(UserValidator)
            const user = await User.findOrFail(params.id)

            user.username = data.username 
            user.email = data.email 
            user.password = data.password
            return {
                message: 'Usuário atualizado com sucesso',
                data: user
            }
        } catch (error) {
            response.status(500).json({
                message: error,
            })
        }
    }
    
    public async destroy({ params, response }: HttpContextContract) {
        try {
            const userId = params.id 
            const user = await User.findOrFail(userId)
            await user.delete()
            return {
                message: 'Usuário deletado com sucesso.'
            }
        } catch (error) {
            response.status(500).json({
                message: 'Erro ao deletar usuário.',
            })
        }
    }
}
