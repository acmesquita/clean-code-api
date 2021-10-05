import { MissingParamsError } from '../../utils/errors'

export class AuthUseCase {
  constructor (loadUserByEmailRepository, encryper) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encryper = encryper
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    if (!password) {
      throw new MissingParamsError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) {
      return null
    }

    await this.encryper.compare(password, user.password)

    return null
  }
}
