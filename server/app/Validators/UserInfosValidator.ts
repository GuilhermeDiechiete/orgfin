import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    photo_url: schema.string.optional({}, [
        rules.maxLength(150)
    ]),

    full_name: schema.string.optional({}, [
        rules.maxLength(30)
    ]),

    description: schema.string.optional({}, [
      rules.maxLength(50),
    ]),

    profession: schema.string.optional({}, [
        rules.maxLength(20)
    ]),

    phone: schema.string.optional({}, [
    ]),
    date_of_birth: schema.date({}, []),
   
    gender: schema.enum.optional(['Male', 'Female', 'Other'] as const), 

  })


  public messages: CustomMessages = {
    'full_name.maxLength': 'O nome completo não pode ter mais de 30 caracteres.',
    'description.maxLength': 'A descrição não pode ter mais de 50 caracteres.',
    'profession.maxLength': 'A profissão não pode ter mais de 20 caracteres.',
    'phone.unique': 'Este número de telefone já está em uso.',
    'gender.enum': 'O gênero deve ser Male, Female ou Other.',
  }
}
