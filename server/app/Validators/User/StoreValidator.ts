import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    username: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.minLength(5),
      rules.unique({ table: 'users', column: 'username' })
    ]),

    email: schema.string({ trim: true}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),

    password: schema.string({ trim: true }, [
      rules.maxLength(6),
      rules.minLength(6)
    ]),

    confirmPassword: schema.string({ trim: true }, [
      rules.confirmed('password')
    ])
  })

  public messages: CustomMessages = {
    'username.required': 'O nome de usuário é obrigatório.',
    'username.maxLength': 'O nome de usuário deve ter no maximo 6 caracteres.',
    'username.minLength': 'O nome de usuário deve ter no minimo 6 caracteres.',
    'username.unique': 'O nome de usuário já está em uso.',

    'email.required': 'O e-mail é obrigatório.',
    'email.email': 'Formato de e-mail invalido.',
    'email.unique': 'E-mail já está em uso.',

    'password.required': 'A senha é obrigatória.',
    'password.maxLength': 'A senha deve ter no maximo 6 caracteres.',
    'password.minLength': 'A senha deve ter no minimo 6 caracteres.',
    'password.confirmed': 'As senhas não conferem.'

  }
}
