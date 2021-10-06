class TokenGenerator {
  async generate (value) {
    return null
  }
}

describe('TokenGenerator', () => {
  test('Should return null if JWT returns null', async () => {
    const sut = new TokenGenerator()
    const token = await sut.generate('any_value')

    expect(token).toBeNull()
  })
})
