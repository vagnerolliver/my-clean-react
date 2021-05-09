import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compareFieldsValidation'
import faker from 'faker'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column())

describe('CompareFieldsValidation', () => {
  test('Should return error if field is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
