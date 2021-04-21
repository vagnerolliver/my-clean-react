import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './input'
import { FormContext } from '@/presentation/contexts'

const selectors = {
  input: 'input__field'
}

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId(selectors.input) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
