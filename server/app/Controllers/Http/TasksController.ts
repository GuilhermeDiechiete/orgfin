import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TasksValidator from 'App/Validators/TasksValidator'

export default class TasksController {

  // criar nova transação
  public async store({ request , auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const data = await request.validate(TasksValidator)
      
      await user.related('tasks').create(data)
      return 'Tarefa criada com sucesso.'

    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao criar tarefa.' })
    }
    
  }
  public async index({ auth , response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const tasks = await user.related('tasks').query()
      .where('user_id', user.id)
      return tasks
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return response.status(400).json({ message: error.messages.errors[0].message })
      } 
      return response.status(400).json({ message: 'Erro ao buscar tarefas.' })
    }
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const task = await user.related('tasks').query().where('id', params.id).first()

      await task?.delete()
      
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao deletar tarefa.'
    }
  }

  public async changeStatus({ params, auth, response }: HttpContextContract) {
    try {
      const user = auth.user 
      if(!user){
        return response.status(401).json({ message: 'Não autorizado.'})
      }
      const task = await user.related('tasks').query().where('id', params.id).first()

      if(task && task.status !== undefined) {
        task.status = !task.status;
        await task.save(); // Salvar tarefa atualizada
      }
    } catch (error) {
      if(error?.messages?.errors[0]?.message) {
        return error.messages.errors[0].message
      } 
      return 'Erro ao atualizar status da tarefa.'
    }
  }
}
