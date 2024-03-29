import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email()
    ]),
    password: schema.string({ trim: true })
  })

  
  public messages: CustomMessages = {
    'email.required': 'Digite o e-mail.',
    'email.email': 'Formato de e-mail invalido.',

    'password.required': 'Digite a senha.'
  }
}
