import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class TransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    date: schema.date(),

    type: schema.enum(['expense', 'income', 'investment']),

    description: schema.string({ trim: true}, [
      rules.maxLength(30),
      rules.minLength(5),
    ]),

    amount: schema.number([
      rules.unsigned()
    ]),

    installment: schema.number.optional([

    ]),

    total_installments: schema.number.optional([

    ]),
    category: schema.string.optional({ trim: true }),

    account: schema.string({ trim: true }),

    destiny: schema.string({ trim: true }),

    status: schema.boolean.optional()

  })

  public messages: CustomMessages = {
    'date.required': 'Selecione a data.',
    'date.date': 'O campo data deve ser uma data válida.',

    'type.required': 'Selecione o tipo de transação.',
    'type.enum': 'O campo tipo deve ser "despesa", "renda" ou "investimento".',

    'description.required': 'Adicione uma descrição.',
    'description.maxLength': 'A descrição não pode ter mais de 30 caracteres.',
    'description.minLength': 'A descrição deve ter pelo menos 5 caracteres.',

    'amount.required': 'Adicione o valor da transação.',
    'amount.unsigned': 'O valor deve ser um número positivo.',

    

    'account.required': 'Selecione a conta de saída.',
    'destiny.required': 'Adicione um destino para o valor.'
  }
}
