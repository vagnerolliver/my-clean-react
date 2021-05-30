import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldToCompore: string) {}

  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompore] ? new InvalidFieldError() : null
  }
}
