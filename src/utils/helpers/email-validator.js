import validator from 'validator'
import { MissingParamsError } from '../errors'

export class EmailValidator {
  isValid (email) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    return validator.isEmail(email)
  }
}
