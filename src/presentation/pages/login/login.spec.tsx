import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

const selectors = {
  errorWrap: 'form-status__error-wrap',
  buttonSubmit: 'submit',
  emailInput: 'email-status',
  passwordInput: 'password-status'
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId(selectors.errorWrap)
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId(selectors.buttonSubmit) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId(selectors.emailInput)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = getByTestId(selectors.passwordInput)
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
