import { FieldValidation } from '@/validation/protocols/fieldValidation'
import { InvalidFieldError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}
