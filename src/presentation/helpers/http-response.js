import { MissingParamsError } from './missing-params-error'
import { UnauthorizedErro } from './unauthorized-error'

export class HttpResponse {
  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  }

  static unauthorizedErro () {
    return {
      statusCode: 401,
      body: new UnauthorizedErro()
    }
  }

  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamsError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}
