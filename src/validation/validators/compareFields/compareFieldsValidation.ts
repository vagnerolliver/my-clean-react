import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly valueToCompare: string) {}

  validate (value: string): Error {
    return this.valueToCompare !== value ? new InvalidFieldError() : null
  }
}
