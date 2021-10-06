import bcrypt from 'bcrypt'
import { Encrypter } from './encrypter'

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return true if BCrypt return true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hash')

    expect(isValid).toBeTruthy()
  })

  test('Should return false if BCrypt return false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('invalid_value', 'hash')

    expect(isValid).toBeFalsy()
  })

  test('Should call bcrypt with corrects values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hash')

    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hash')
  })
})
