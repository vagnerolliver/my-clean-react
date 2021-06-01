import { RemoteAddAccount } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axiosHttpClientFactory'
import { makeApiUrl } from '@/main/factories/http/apiUrlFactory'
import { AddAccount } from '@/domain/usecases'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
