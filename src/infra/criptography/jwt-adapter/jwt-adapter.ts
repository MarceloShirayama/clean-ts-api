import { sign } from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/criptography'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string | null> {
    const accessToken = await sign({ id: value }, this.secret)

    return accessToken
  }
}
