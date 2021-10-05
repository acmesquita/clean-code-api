import { InvalidParamsError } from '../../presentation/errors'

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new InvalidParamsError('email')
    }
  }
}
describe('AuthUseCase', () => {
  test('Should throw if no email is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow()
  })
})
