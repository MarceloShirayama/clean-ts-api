import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../../protocols'

export class LoginController implements Controller {
  // TODO: implement dependency injection mandatory
  constructor(
    private readonly emailValidator?: EmailValidator,
    private readonly authentication?: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator?.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const token = await this.authentication?.auth(email, password)
      console.log(token)

      const httpResponse = {
        statusCode: 200,
        body: httpRequest.body
      }

      return httpResponse
    } catch (error: any) {
      return serverError(error)
    }
  }
}
