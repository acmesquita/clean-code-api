import { MissingParamsError } from '../../utils/errors'
import { AuthUseCase } from './auth-usecase'

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {}

  const authUserCase = new AuthUseCase(loadUserByEmailRepositorySpy)

  return {
    sut: authUserCase,
    loadUserByEmailRepositorySpy
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provider', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamsError('email'))
  })

  test('Should throw if no password is provider', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@email.com')
    expect(promise).rejects.toThrow(new MissingParamsError('password'))
  })

  test('Should call load LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@email.com', 'any_password')

    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@email.com', 'any_password')

    expect(promise).rejects.toThrow()
  })

  test('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@email.com', 'any_password')

    expect(promise).rejects.toThrow()
  })

  test('Should return null if an invalid email is provider', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@email', 'any_password')

    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provider', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('valid_email@email', 'invalid_password')

    expect(accessToken).toBeNull()
  })
})
