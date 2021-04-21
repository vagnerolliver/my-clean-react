import { RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axiosHttpClientFactory'
import { makeApiUrl } from '@/main/factories/http/apiUrlFactory'
import { Authentication } from '@/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
