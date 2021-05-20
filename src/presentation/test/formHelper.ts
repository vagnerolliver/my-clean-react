import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`input__${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const populateField = (sut: RenderResult, fieldName: string, value: string = faker.random.word()): void => {
  const input = sut.getByTestId(`input__${fieldName}`)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
