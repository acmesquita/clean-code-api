import validator from 'validator'

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should return true is validator returns true', () => {
    const sut = new EmailValidator()
    const result = sut.isValid('valid_email@email.com')

    expect(result).toBe(true)
  })

  test('Should return fals is validator returns false', () => {
    const sut = new EmailValidator()
    validator.isEmailValid = false
    const result = sut.isValid('invalid_email.com')

    expect(result).toBe(false)
  })
})
