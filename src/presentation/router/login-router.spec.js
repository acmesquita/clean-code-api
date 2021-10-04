import { MissingParamsError } from '../helpers/missing-params-error'
import { LoginRouter } from './login-router'

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('email'))
  })

  test('Should return 400 if no passowrd is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no body is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route({})

    expect(httpResponse.statusCode).toBe(500)
  })
})
