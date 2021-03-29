import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'
import Login from './login'
import { ValidationStub } from '@/presentation/test/'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

const selectors = {
  errorWrap: 'form-status__error-wrap',
  buttonSubmit: 'login__submit',
  emailInput: 'input__email',
  passwordInput: 'input__password',
  emailInputStatus: 'input__email-status',
  passwordInputStatus: 'input__password-status'
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut: { getByTestId }, validationStub } = makeSut()

    const errorWrap = getByTestId(selectors.errorWrap)
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId(selectors.buttonSubmit) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId(selectors.emailInputStatus)
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const { sut: { getByTestId }, validationStub } = makeSut()
    const emailInput = getByTestId(selectors.emailInput)
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId(selectors.emailInputStatus)
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const { sut: { getByTestId }, validationStub } = makeSut()
    const passwordInput = getByTestId(selectors.passwordInput)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut: { getByTestId }, validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = getByTestId(selectors.passwordInput)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
