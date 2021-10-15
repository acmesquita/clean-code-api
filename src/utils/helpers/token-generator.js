import jwt from 'jsonwebtoken'
import { MissingParamsError } from '../errors'

export class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (value) {
    if (!this.secret) {
      throw new MissingParamsError('secret')
    }

    if (!value) {
      throw new MissingParamsError('value')
    }

    return jwt.sign({ value }, this.secret)
  }
}
