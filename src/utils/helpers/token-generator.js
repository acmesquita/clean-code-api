import jwt from 'jsonwebtoken'
import { MissingParamsError } from '../errors'

export class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (value) {
    if (!value) {
      throw new MissingParamsError('value')
    }
    return jwt.sign(value, this.secret)
  }
}
