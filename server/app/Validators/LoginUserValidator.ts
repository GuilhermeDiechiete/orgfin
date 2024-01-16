import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.required()]),
  })

  public messages: CustomMessages = {
    'email.required': 'O campo de e-mail é obrigatório.',
    'email.email': 'Por favor, insira um endereço de e-mail válido.',

    'password.required': 'O campo de senha é obrigatório.',
  }
}
