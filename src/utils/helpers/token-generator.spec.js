import jwt from 'jsonwebtoken'
import { MissingParamsError } from '../errors'
import { TokenGenerator } from './token-generator'

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

  test('Should call validator with correct value', async () => {
    const sut = makeSut()
    await sut.generate('any_value')

    expect(jwt.value).toBe('any_value')
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should throws if no value is provider', async () => {
    const sut = makeSut()
    expect(sut.generate()).rejects.toThrow(new MissingParamsError('value'))
  })

  test('Should throws if no secret is provider', async () => {
    const sut = new TokenGenerator()
    expect(sut.generate()).rejects.toThrow(new MissingParamsError('secret'))
  })
})
