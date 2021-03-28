import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}
class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
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
    const { sut: { getByTestId } } = makeSut()
    const errorWrap = getByTestId(selectors.errorWrap)
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId(selectors.buttonSubmit) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId(selectors.emailInputStatus)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = getByTestId(selectors.passwordInputStatus)
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    const emailInput = getByTestId(selectors.emailInput)
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  test('Should call Validation with correct password', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    const passwordInput = getByTestId(selectors.passwordInput)
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
})
