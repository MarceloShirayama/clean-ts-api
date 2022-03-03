import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import supertest from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
      await supertest(app)
        .post('/api/signup')
        .send({
          name: 'John Doe',
          email: 'john_email@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const password = await hash('123456', 12)
      const fakeAccount = {
        name: 'John Doe',
        email: 'john@mail.com',
        password
      }
      await accountCollection.insertOne(fakeAccount)
      await accountCollection.findOne({
        email: fakeAccount.email
      })

      await supertest(app)
        .post('/api/login')
        .send({
          email: fakeAccount.email,
          password: '123456'
        })
        .expect(200)
    })

    it('Should return 401 with invalid credentials', async () => {
      const response = await supertest(app).post('/api/login').send({
        email: 'john@mail.com',
        password: '123456'
      })

      expect(response.statusCode).toEqual(401)
      expect(response.body.error).toEqual('Unauthorized')
    })
  })
})
