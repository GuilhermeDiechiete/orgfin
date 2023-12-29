import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm';

export default class UserCreationValidator {
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
    name: schema.string([
      rules.maxLength(20),
      rules.minLength(4)
    ]),
    value: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    payment: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(4),
      rules.maxLength(20),
    ]),
    category: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.maxLength(20),
    ]),
    installments: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),

  });

  public messages = {
    'year.required': 'O ano é obrigatório.',
    'year.minLength': 'O ano deve ter pelo menos 4 caracteres.',
    'year.maxLength': 'O ano não pode ter mais de 4 caracteres.',
    'month.required': 'O mês é obrigatório.',
    'month.unsigned': 'O mês deve ser um número inteiro positivo.',
    'name.maxLength': 'O nome não pode ter mais de 20 caracteres',
    'name.minLength': 'O nome deve ter pelo menos 4 caracteres',
    'value.required': 'O valor é obrigatório.',
    'value.unsigned': 'O valor deve ser um número inteiro positivo.',
    'payment.required': 'O pagamento é obrigatório.',
    'payment.minLength': 'O pagamento deve ter pelo menos 4 caracteres.',
    'payment.maxLength': 'O pagamento não pode ter mais de 20 caracteres.',
    'category.required': 'A categoria é obrigatória.',
    'category.minLength': 'A categoria deve ter pelo menos 2 caracteres.',
    'category.maxLength': 'A categoria não pode ter mais de 20 caracteres.',
    'installments.required': 'As parcelas são obrigatórias.',
    'installments.unsigned': 'As parcelas devem ser um número inteiro positivo.',
  };
}
