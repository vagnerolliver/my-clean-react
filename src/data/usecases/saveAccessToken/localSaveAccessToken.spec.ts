import { LocalSaveAccessToken } from './localSaveAccessToken'
import { SetStorageMock } from '@/data/test/mockStorage'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('localSaveAccessToken', () => {
  test('Should call SetStoragge with correct value', async () => {
    const accessToken = faker.datatype.uuid()

    const { sut, setStorageMock } = makeSut()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
