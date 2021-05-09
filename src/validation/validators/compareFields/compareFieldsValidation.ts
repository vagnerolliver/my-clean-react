import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/fieldValidation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly value: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
