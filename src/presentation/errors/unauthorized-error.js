export class UnauthorizedErro extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedErro'
  }
}
