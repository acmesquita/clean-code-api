import { MissingParamsError } from '../src/utils/errors'

export default {
  isEmailValid: true,
  email: '',
  isEmail (email) {
    if (!email) {
      throw new MissingParamsError('email')
    }
    this.email = email
    return this.isEmailValid
  }
}
