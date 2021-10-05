import validator from 'validator'
import { EmailValidator } from './email-validator'

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true is validator returns true', () => {
    const sut = makeSut()
    const result = sut.isValid('valid_email@email.com')

    expect(result).toBe(true)
  })

  test('Should return false is validator returns false', () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const result = sut.isValid('invalid_email.com')

    expect(result).toBe(false)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    sut.isValid('any_email@email.com')

    expect(validator.email).toBe('any_email@email.com')
  })
})
