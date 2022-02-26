import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const insertResult = await accountCollection.insertOne(accountData)
    const id = insertResult.insertedId
    const account = await accountCollection.findOne({ _id: id })

    const result = {
      id: String(account?._id),
      name: account?.name,
      email: account?.email,
      password: account?.password
    }

    return result
  }
}
