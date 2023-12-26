import { schema, CustomMessages, rules, } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

      email: schema.string({ trim: true }, [
        rules.required(),
      ]),
  
      password: schema.string({ trim: true }, [
        rules.required(),
      ]),
  })

  public messages: CustomMessages = {
    'email.required': 'O e-mail é obrigatório.',
    'password.required': 'A senha é obrigatória.',

  }
}
