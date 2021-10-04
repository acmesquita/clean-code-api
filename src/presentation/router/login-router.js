import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
  constructor (authUserCase) {
    this.authUserCase = authUserCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest('email')
      }

      if (!password) {
        return HttpResponse.badRequest('password')
      }

      const accessToken = this.authUserCase.auth(email, password)

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
