import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

let accountCollection: Collection

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
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

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
})
