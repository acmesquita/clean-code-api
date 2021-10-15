import { MissingParamsError } from '../../utils/errors'
import MongoHelper from '../helpers/mongo-helper'

export class UpdateAccessTokenRepository {
  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamsError('userId')
    }

    if (!accessToken) {
      throw new MissingParamsError('accessToken')
    }
    const userModel = await MongoHelper.collection('users')
    await userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}
