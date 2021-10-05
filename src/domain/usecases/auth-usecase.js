import { MissingParamsError } from '../../utils/errors'

export class AuthUseCase {
  constructor (loadUserByEmailRepository, encryper, tokenGenerator) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encryper = encryper
    this.tokenGenerator = tokenGenerator
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

    const isValid = await this.encryper.compare(password, user.password)

    if (!isValid) {
      return null
    }

    return await this.tokenGenerator.generate(user.id)
  }
}
