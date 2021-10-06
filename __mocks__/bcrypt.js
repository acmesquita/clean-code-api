import { MissingParamsError } from '../src/utils/errors'

export default {
  isValid: true,
  value: '',
  hash: '',
  async compare (value, hash) {
    if (!value) {
      throw new MissingParamsError('value')
    }
    if (!hash) {
      throw new MissingParamsError('hash')
    }
    this.value = value
    this.hash = hash
    return this.isValid
  }
}
