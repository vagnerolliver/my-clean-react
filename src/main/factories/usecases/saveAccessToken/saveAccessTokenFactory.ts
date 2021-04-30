import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/usecases/saveAccessToken/localSaveAccessToken'
import { makeLocalStorageAdapter } from '@/main/factories/cache/localStorageAdapterFactory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
