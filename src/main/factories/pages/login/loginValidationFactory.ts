import { ValidationBuilder } from '@/validation/validators/builder/validation'
import { ValidationComposite } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])
}
