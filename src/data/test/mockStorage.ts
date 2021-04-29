import { SetStorage } from '@/data/protocols/cache/setStorage'

export class SetStorageSpy implements SetStorage {
  key: string
  value: string

  async set (key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}
