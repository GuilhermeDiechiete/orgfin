import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    date: schema.string(),
    type: schema.string(),
    description: schema.string(),
    amount: schema.number(),
    category: schema.string(),
    destiny: schema.string(),
    status: schema.boolean(),
  })

  public messages: CustomMessages = {
    'date.required': 'A data é obrigatória.',
    'type.required': 'O tipo é obrigatório.',
    'description.required': 'A descrição é obrigatória.',
    'amount.required': 'O valor é obrigatório.',
    'category.required': 'A categoria é obrigatória.',
    'destiny.required': 'O destino é obrigatório.',
    'status.required': 'O status é obrigatório.',
  }
}
