export default {
  token: '',
  secret: '',
  async sign (value, secret) {
    this.value = value
    this.secret = secret
    return this.token
  }
}
