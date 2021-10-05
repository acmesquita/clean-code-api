import { HttpResponse } from '../helpers/http-response'
import { MissingParamsError, InvalidParamsError } from '../../utils/errors'

export class LoginRouter {
  constructor (authUserCase, emailValidator) {
    this.authUserCase = authUserCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamsError('email'))
      }

      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamsError('email'))
      }

      if (!password) {
        return HttpResponse.badRequest(new MissingParamsError('password'))
      }

      const accessToken = await this.authUserCase.auth(email, password)

      if (!accessToken) {
        return HttpResponse.unauthorizedErro()
      }

      return HttpResponse.ok({ accessToken })
    } catch (error) {
      // console.error(error) - Criando log
      return HttpResponse.serverError()
    }
  }
}
