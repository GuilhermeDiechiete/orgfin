import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class UserCreationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true}, [
      rules.required(),
      rules.maxLength(20),
      rules.minLength(4),
      rules.regex(/^[a-zA-Z0-9_]+$/),
      rules.unique({ table: 'users', column: 'username'})
    ]),

    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),

    password: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(6),
      rules.maxLength(6),
    ]),

    confirmPassword: schema.string({}, [rules.confirmed('password')]),

  })


  public messages: CustomMessages = {
    'username.required': 'O nome de usuário é obrigatório.',
    'username.minLength': 'O nome de usuário deve ter pelo menos 4 caracteres.',
    'username.maxLength': 'O nome de usuário não pode ter mais de 20 caracteres.',
    'username.regex': 'O nome de usuário deve conter apenas letras, números e sublinhados.',
    'username.unique': 'Este nome de usuário já está em uso.',
    'email.required': 'O e-mail é obrigatório.',
    'email.email': 'Por favor, insira um endereço de e-mail válido.',
    'email.unique': 'Este e-mail já está em uso.',
    'password.required': 'A senha é obrigatória.',
    'password.minLength': 'A senha deve ter pelo menos 8 caracteres.',
    'password.maxLength': 'A senha deve ter no maximo 8 caracteres.',
    'confirmPassword.confirmed': 'A confirmação da senha não coincide com a senha.',
  }
}
