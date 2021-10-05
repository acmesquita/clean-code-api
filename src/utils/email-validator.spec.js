import validator from 'validator'

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true is validator returns true', () => {
    const sut = makeSut()
    const result = sut.isValid('valid_email@email.com')

    expect(result).toBe(true)
  })

  test('Should return fals is validator returns false', () => {
    const sut = makeSut()
    validator.isEmailValid = false
    const result = sut.isValid('invalid_email.com')

    expect(result).toBe(false)
  })
})
