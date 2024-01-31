import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true}, [
      rules.maxLength(15),
      rules.minLength(2)
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'Digite o nome da categoria',
    'name.maxLength': 'O nome deve ter no maximo 15 caracteres.',
    'name.minLength': 'O nome deve ter no minimo 2 caracteres.'
  }
}
