import bcrypt from 'bcrypt'

class Encrypter {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

describe('Encrypter', () => {
  test('Should return true if BCrypt return true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'hash')

    expect(isValid).toBeTruthy()
  })

  test('Should return false if BCrypt return false', async () => {
    const sut = new Encrypter()
    bcrypt.isValid = false
    const isValid = await sut.compare('invalid_value', 'hash')

    expect(isValid).toBeFalsy()
  })
})
