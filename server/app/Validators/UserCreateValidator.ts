import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}),
    confirmPassword: schema.string({}, [rules.confirmed('password')]),
  })

  public messages: CustomMessages = {
    'email.required': 'O campo de e-mail é obrigatório.',
    'email.email': 'Por favor, insira um endereço de e-mail válido.',
    'email.unique': 'Este e-mail já está em uso.',
    'password.required': 'O campo de senha é obrigatório.',
    'confirmPassword.confirmed': 'As senhas não coincidem',
  }
}
