import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    date: schema.string(),

    description: schema.string({}, [
      rules.maxLength(15),
      rules.minLength(4)
    ]),

    installment: schema.number(),
    max_installment: schema.number(),

    amount: schema.number(),

    type: schema.enum(['output', 'input', 'investment']),
    local: schema.string(),
    
    category: schema.string(),
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

    'description.maxLength': 'A descrição não pode ter mais de 15 caracteres.',
    'description.minLength': 'A descrição deve ter pelo menos 4 caracteres.',
    'installment.number': 'A quantidade de parcelas deve ser um número.',
    'max_installment.number': 'O número máximo de parcelas deve ser um número.',
    'amount.number': 'O valor deve ser um número.',
    'type.enum': 'O tipo deve ser "output", "input" ou "investment".',
  }
}
