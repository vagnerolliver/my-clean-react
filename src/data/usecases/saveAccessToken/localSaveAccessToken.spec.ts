import { LocalSaveAccessToken } from './localSaveAccessToken'
import { SetStorageSpy } from '@/data/test/mockStorage'
import faker from 'faker'

describe('localSaveAccessToken', () => {
  test('Should call SetStoragge with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
