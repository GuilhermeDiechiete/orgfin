import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class UserCreationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true}, [
      rules.required(),
      rules.minLength(4),
      rules.maxLength(20),

    ]),
  })


  public messages: CustomMessages = {
    'name.required': 'O nome é obrigatório.',
    'name.minLength': 'O nome de deve ter pelo menos 2 caracteres.',
    'name.maxLength': 'O nome de não pode ter mais de 15 caracteres.',
  

  }
}