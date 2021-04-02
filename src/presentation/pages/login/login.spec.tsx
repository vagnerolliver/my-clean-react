import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test/'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

const selectors = {
  errorWrap: 'form-status__error-wrap',
  submitButton: 'login__submit',
  emailInput: 'input__email',
  passwordInput: 'input__password',
  emailInputStatus: 'input__email-status',
  passwordInputStatus: 'input__password-status',
  spinnerElement: 'spinner'
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } } = makeSut({ validationError })

    const errorWrap = getByTestId(selectors.errorWrap)
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId(selectors.submitButton) as HTMLButtonElement
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

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId(selectors.emailInput)
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId(selectors.passwordInput)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = sut.getByTestId(selectors.submitButton)
    fireEvent.click(submitButton)
    const spinner = sut.getByTestId(selectors.spinnerElement)
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    const emailInput = getByTestId(selectors.emailInput)
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    const passwordInput = getByTestId(selectors.passwordInput)
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitButton = getByTestId(selectors.submitButton)
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
