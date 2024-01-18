import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.unique({ table: 'categories', column: 'name' }),
      rules.minLength(4),
      rules.maxLength(15)
    ]),
    
  })

  public messages: CustomMessages = {
    'name.required': 'Adicione o nome da categoria.',
    'name.unique': 'Categoria já existe na lista.',
    'name.minLength': 'O nome das categorias devem ter mais de 4 caracteres.',
    'name.maxLength': 'O nome das categorias devem ter menos de 15 caracteres.'
  }
}
