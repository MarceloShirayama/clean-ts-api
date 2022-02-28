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
      const { email, password } = httpRequest.body

      if (!email) {
        return badRequest(new MissingParamError('email'))
      }

      if (!password) {
        return badRequest(new MissingParamError('password'))
      }
      const httpResponse = {
        statusCode: 200,
        body: httpRequest.body
      }

      const isValid = this.emailValidator?.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication?.auth(email, password)

      return httpResponse
    } catch (error: any) {
      return serverError(error)
    }
  }
}
