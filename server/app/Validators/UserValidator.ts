import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({trim: true}, [
      rules.required(),
      rules.unique({table: 'users', column: 'username'}),
      rules.minLength(5),
    ]),

    email: schema.string({}, [
      rules.required(),
      rules.unique({table: 'users', column: 'email'}),
      rules.email(),
    ]),

    password: schema.string({}, [
      rules.required(),
      rules.minLength(5),
      rules.maxLength(6)
    ])
  })

  public messages: CustomMessages = {
    'username.required': 'O campo de usuário é obrigatório',
    'username.unique': 'O nome de usuário já está em uso',
    'username.minLength': 'O nome de usuário precisa ter mais de 5 caracteres',

    'email.required': 'O e-mail é obrigatório',
    'email.unique': 'O e-mail já existe no sistema',
    'email.email': 'Precisa ser um e-mail valido',
    
    'password.required': 'A senha é obrigatória',
    'password.minLength': 'A senha precisa ter 6 caracteres',
    'password.maxLength': 'A senha precisa ter 6 caracteres'
  }
}

