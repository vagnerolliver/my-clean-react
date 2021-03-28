import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

const selectors = {
  errorWrap: 'form-status__error-wrap',
  buttonSubmit: 'submit'
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId(selectors.errorWrap)
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId(selectors.buttonSubmit) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
