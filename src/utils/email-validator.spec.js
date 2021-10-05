class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('Email Validator', () => {
  test('Should return true is validator returns true', () => {
    const sut = new EmailValidator()
    const result = sut.isValid('valid_email@email.com')

    expect(result).toBe(true)
  })
})
