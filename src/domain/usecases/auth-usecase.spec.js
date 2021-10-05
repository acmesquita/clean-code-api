import { MissingParamsError } from '../../utils/errors'

class AuthUseCase {
  async auth (email, passowrd) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    if (!passowrd) {
      throw new MissingParamsError('password')
    }
  }
}
describe('AuthUseCase', () => {
  test('Should throw if no email is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamsError('email'))
  })

  test('Should throw if no password is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@email.com')
    expect(promise).rejects.toThrow(new MissingParamsError('password'))
  })
})
