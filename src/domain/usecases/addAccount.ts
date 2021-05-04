import { AccountModel } from '@/domain/models'

export type AccountParams = {
  name: string
  email: string
  password: string
  passowordConfirmation: string
}

export interface Authentication {
  auth: (params: AccountParams) => Promise<AccountModel>
}
