import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UserIncomesValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    year: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(4),
      rules.maxLength(4),
    ]),
    month: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    workplace: schema.string([
        rules.maxLength(20),
        rules.minLength(4),
    ]),
    description: schema.string([
      rules.maxLength(20),
      rules.minLength(4),
    ]),
    value: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    date: schema.date.optional({}),
  })

  public messages = {
    'year.required': 'O campo ano é obrigatório.',
    'year.minLength': 'O campo ano deve ter pelo menos 4 caracteres.',
    'year.maxLength': 'O campo ano não pode ter mais de 4 caracteres.',
    'month.required': 'O campo mês é obrigatório.',
    'month.unsigned': 'O campo mês deve ser um número inteiro positivo.',
    'workplace.maxLength': 'O campo local de trabalho não pode ter mais de 20 caracteres.',
    'workplace.minLength': 'O campo local de trabalho deve ter pelo menos 4 caracteres.',
    'description.maxLength': 'O campo descrição não pode ter mais de 20 caracteres.',
    'description.minLength': 'O campo descrição deve ter pelo menos 4 caracteres.',
    'value.required': 'O campo valor é obrigatório.',
    'value.unsigned': 'O campo valor deve ser um número positivo.',
    'date.date': 'O campo data deve ser uma data válida.',
  }
}