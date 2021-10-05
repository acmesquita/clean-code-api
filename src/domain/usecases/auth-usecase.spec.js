import { MissingParamsError } from '../../utils/errors'
import { AuthUseCase } from './auth-usecase'

const makeEncrypterSpy = () => {
  class EncrypterSpy {
    async compare (passowrd, hashedPassword) {
      this.password = passowrd
      this.hashedPassword = hashedPassword

      return this.isValid
    }
  }
  const encryperSpy = new EncrypterSpy()
  encryperSpy.isValid = true

  return encryperSpy
}

const makeLoadUserByEmailRepositorySpy = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    id: 'any_id',
    passowrd: 'hashed_password'
  }
  return loadUserByEmailRepositorySpy
}

const makeTokenGeneratorSpy = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'valid_access_token'
  return tokenGeneratorSpy
}

const makeSut = () => {
  const encryperSpy = makeEncrypterSpy()
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepositorySpy()
  const tokenGeneratorSpy = makeTokenGeneratorSpy()

  const authUserCase = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encryper: encryperSpy,
    tokenGenerator: tokenGeneratorSpy
  })

  return {
    sut: authUserCase,
    loadUserByEmailRepositorySpy,
    encryperSpy,
    tokenGeneratorSpy
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
    const sut = new AuthUseCase({ loadUserByEmailRepository: {} })
    const promise = sut.auth('any_email@email.com', 'any_password')

    expect(promise).rejects.toThrow()
  })

  test('Should throw if no LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@email.com', 'any_password')

    expect(promise).rejects.toThrow()
  })

  test('Should throw if dependences is provider', async () => {
    const sut = new AuthUseCase()
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
    const { sut, encryperSpy } = makeSut()
    encryperSpy.isValid = false
    const accessToken = await sut.auth('valid_email@email', 'invalid_password')

    expect(accessToken).toBeNull()
  })

  test('Should call Encripter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encryperSpy } = makeSut()
    await sut.auth('valid_email@email', 'any_password')

    expect(encryperSpy.password).toBe('any_password')
    expect(encryperSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('Should call TokenGenerator with correct userId', async () => {
    const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('valid_email@email', 'valid_password')

    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('Should return an accessToken if correct credentials are provider', async () => {
    const { sut, tokenGeneratorSpy } = makeSut()
    const accessToken = await sut.auth('valid_email@email', 'valid_password')

    expect(accessToken).toBe(tokenGeneratorSpy.accessToken)
    expect(accessToken).toBeTruthy()
  })
})
