import React from 'react'
import faker from 'faker'
import { Signup } from '@/presentation/pages'
import { render, RenderResult, cleanup, waitFor, fireEvent } from '@testing-library/react'
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

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.internet.email(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  passwordConfirmation = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation)
  const form = sut.getByTestId(selectors.form)
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, selectors.errorWrap, 0)
    Helper.testButtonIsDisabled(sut, selectors.submitButton, true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  test('Should show valid email error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid passwordConfirmation error if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, selectors.submitButton, false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, selectors.spinnerElement)
  })
})
