import React from 'react'
import faker from 'faker'
import { Signup } from '@/presentation/pages'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { FormHelper as Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Signup
      validation={validationStub}
    />
  )
  return {
    sut
  }
}

const selectors = {
  form: 'signup__form',
  submitButton: 'signup__submit',
  signupLinkElement: 'signup__signup',
  errorWrap: 'form-status__error-wrap',
  mainError: 'form-status__main-error',
  emailInputStatus: 'input__email-status',
  passwordInputStatus: 'input__password-status',
  spinnerElement: 'spinner'
}

const populateField = (sut: RenderResult, fieldName: string, value: string = faker.random.word()): void => {
  const input = sut.getByTestId(`input__${fieldName}`)
  fireEvent.input(input, { target: { value } })
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, selectors.errorWrap, 0)
    Helper.testButtonIsDisabled(sut, selectors.submitButton, true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'Campo Obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo Obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo Obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
