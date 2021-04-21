import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Input from './input'
import { FormContext } from '@/presentation/contexts'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(`input__${field}`) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(`input__${field}`) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
