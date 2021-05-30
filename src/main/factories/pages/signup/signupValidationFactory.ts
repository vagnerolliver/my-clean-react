import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation'
import { ValidationComposite } from '@/validation/validators'

export const makeSignupValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('name').required().minLength(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().minLength(5).build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password').build()
  ])
}
