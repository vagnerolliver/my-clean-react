import { LocalStorageAdapter } from './localStorageAdapter'
import faker from 'faker'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct params', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.database.column()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
