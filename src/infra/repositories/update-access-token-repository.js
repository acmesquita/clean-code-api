import { MissingParamsError } from '../../utils/errors'

export class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamsError('userId')
    }

    if (!accessToken) {
      throw new MissingParamsError('accessToken')
    }

    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}
