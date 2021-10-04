import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
  constructor (authUserCase) {
    this.authUserCase = authUserCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUserCase || !this.authUserCase.auth) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }

    if (!password) {
      return HttpResponse.badRequest('password')
    }

    const accessToken = this.authUserCase.auth(email, password)

    if (accessToken) {
      return HttpResponse.ok(accessToken)
    }
    return HttpResponse.unauthorizedErro()
  }
}
