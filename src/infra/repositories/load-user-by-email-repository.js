import { MissingParamsError } from '../../utils/errors'
import MongoHelper from '../helpers/mongo-helper'

export class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamsError('email')
    }

    const userModel = await MongoHelper.collection('users')
    const user = await userModel.findOne({ email }, {
      projection: {
        _id: 1,
        password: 1
      }
    })
    return user
  }
}
