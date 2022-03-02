import { Collection } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

let accountCollection: Collection

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  })

  it('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccount())

    expect(account).toHaveProperty('id')
    expect(account).toHaveProperty('name', 'any_name')
    expect(account).toHaveProperty('email', 'any_email@mail.com')
    expect(account).toHaveProperty('password', 'any_password')
  })

  it('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeTruthy()
    expect(account).toHaveProperty('id')
    expect(account).toHaveProperty('name', 'any_name')
    expect(account).toHaveProperty('email', 'any_email@mail.com')
    expect(account).toHaveProperty('password', 'any_password')
  })

  it('Should return null if loadByEmail null', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')

    expect(account).toBeFalsy()
    expect(account).toBeNull()
  })

  it('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    let account

    const res = await accountCollection.insertOne(makeFakeAccount())
    const id = res.insertedId

    account = await accountCollection.findOne({ _id: id })

    expect(account).toHaveProperty('name', 'any_name')
    expect(account).toHaveProperty('email', 'any_email@mail.com')
    expect(account).toHaveProperty('password', 'any_password')
    expect(account).not.toHaveProperty('accessToken', 'any_token')

    await sut.updateAccessToken(id, 'any_token')

    account = await accountCollection.findOne({ _id: id })

    expect(account).toHaveProperty('name', 'any_name')
    expect(account).toHaveProperty('email', 'any_email@mail.com')
    expect(account).toHaveProperty('password', 'any_password')
    expect(account).toHaveProperty('accessToken', 'any_token')
  })
})
