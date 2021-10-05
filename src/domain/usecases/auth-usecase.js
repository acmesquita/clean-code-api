import { MissingParamsError } from '../../utils/errors'

export class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, passowrd) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    if (!passowrd) {
      throw new MissingParamsError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) {
      return null
    }

    return null
  }
}
