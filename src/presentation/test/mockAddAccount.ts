import { AddAccountParams, AddAccount } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsAddAccount = 0

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsAddAccount++
    return this.account
  }
}
