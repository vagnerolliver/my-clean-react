import React from 'react'
import { Signup } from '@/presentation/pages'
import { render, RenderResult } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <Signup />
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
  emailInput: 'input__email',
  passwordInput: 'input__password',
  emailInputStatus: 'input__email-status',
  passwordInputStatus: 'input__password-status',
  spinnerElement: 'spinner'
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`input__${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    testChildCount(sut, selectors.errorWrap, 0)
    testButtonIsDisabled(sut, selectors.submitButton, true)
    const validationError = 'Campo Obrigatório'
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
