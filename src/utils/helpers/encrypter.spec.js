class Encrypter {
  async compare (password, hashedPassword) {
    return true
  }
}

describe('Encrypter', () => {
  test('Should return true if BCrypt return true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_password', 'hashedPassword')

    expect(isValid).toBeTruthy()
  })
})
