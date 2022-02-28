import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../../protocols'

export class LoginController implements Controller {
  // TODO: implement dependency injection mandatory
  constructor(private readonly emailValidator?: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

    this.emailValidator?.isValid(email)

    return httpResponse
  }
}
