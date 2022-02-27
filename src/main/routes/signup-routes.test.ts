import supertest from 'supertest'
import { app } from '../config/app'

describe('SignUp routes', () => {
  it('Should return an account on success', async () => {
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
