import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  it('Should return a token on sign success', async () => {
    const sut = makeSut()
    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce(() => Promise.resolve('any_token'))

    const accessToken = await sut.encrypt('any_id')

    expect(accessToken).toBe('any_token')
  })
})
