import { ServerError, UnauthorizedErro } from '../errors'

export class HttpResponse {
  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static unauthorizedErro () {
    return {
      statusCode: 401,
      body: new UnauthorizedErro().message
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      body: error.message
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError().message
    }
  }
}
