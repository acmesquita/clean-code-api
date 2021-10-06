import jwt from 'jsonwebtoken'
import { MissingParamsError } from '../errors'

class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (value) {
    if (!value) {
      throw new MissingParamsError('value')
    }
    return jwt.sign(value, this.secret)
  }
}

const makeSut = () => new TokenGenerator('secret')

describe('TokenGenerator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_value')

    expect(token).toBeNull()
  })

  test('Should return a token if JWT returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_value')
    expect(token).toBe(jwt.token)
  })

  test('Should throws if no value is provider', async () => {
    const sut = makeSut()
    expect(sut.generate()).rejects.toThrow(new MissingParamsError('value'))
  })
})
