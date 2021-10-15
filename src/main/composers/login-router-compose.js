import { LoginRouter } from '../../presentation/router/login-router'
import { AuthUseCase } from '../../domain/usecases/auth-usecase'
import { EmailValidator } from '../../utils/helpers/email-validator'
import { LoadUserByEmailRepository } from '../../infra/repositories/load-user-by-email-repository'
import { UpdateAccessTokenRepository } from '../../infra/repositories/update-access-token-repository'
import { Encrypter } from '../../utils/helpers/encrypter'
import { TokenGenerator } from '../../utils/helpers/token-generator'
import env from '../config/env'

const loadUserByEmailRepository = new LoadUserByEmailRepository()
const updateAccessTokenRepository = new UpdateAccessTokenRepository()

const encryper = new Encrypter()
const tokenGenerator = new TokenGenerator(env.tokenSecret)

const authUseCase = new AuthUseCase({ loadUserByEmailRepository, updateAccessTokenRepository, encryper, tokenGenerator })
const emailValidator = new EmailValidator()
const loginRouter = new LoginRouter({ authUseCase, emailValidator })

export default loginRouter
