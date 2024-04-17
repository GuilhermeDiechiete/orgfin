import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class TasksValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    date: schema.date(),

    status: schema.boolean.optional(),

    name: schema.string({ trim: true}, [
        rules.maxLength(15),
        rules.minLength(2)
      ]),

    description: schema.string({ trim: true}, [
      rules.maxLength(30),
      rules.minLength(5),
    ]),
  })

  public messages: CustomMessages = {
    'date.required': 'Selecione a data.',
    'date.date': 'O campo data deve ser uma data válida.',

    'name.required': 'Digite o nome da categoria',
    'name.maxLength': 'O nome deve ter no maximo 15 caracteres.',
    'name.minLength': 'O nome deve ter no minimo 2 caracteres.',

    'description.required': 'Adicione uma descrição.',
    'description.maxLength': 'A descrição não pode ter mais de 30 caracteres.',
    'description.minLength': 'A descrição deve ter pelo menos 5 caracteres.'
  }
}