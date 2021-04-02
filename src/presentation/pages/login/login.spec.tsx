import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'
import Login from './login'
import { ValidationStub } from '@/presentation/test/'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut
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
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })

    const errorWrap = getByTestId(selectors.errorWrap)
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId(selectors.buttonSubmit) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId(selectors.emailInputStatus)
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })

    const emailInput = getByTestId(selectors.emailInput)
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId(selectors.emailInputStatus)
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })
    const passwordInput = getByTestId(selectors.passwordInput)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut: { getByTestId } } = makeSut()
    const emailInput = getByTestId(selectors.emailInput)
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = getByTestId(selectors.emailInputStatus)
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut: { getByTestId } } = makeSut()
    const passwordInput = getByTestId(selectors.passwordInput)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
