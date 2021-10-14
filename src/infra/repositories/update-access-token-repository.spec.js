import MongoHelper from '../helpers/mongo-helper'

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

let db

const makeUserModel = async () => {
  const userModel = db.collection('users')
  await userModel.insertOne({
    email: 'valid_email@mail.com',
    name: 'any_name',
    password: 'hashed_password'
  })

  const fakeUser = await userModel.findOne({ email: 'valid_email@mail.com' })

  return {
    userModel,
    fakeUser
  }
}

const makeSut = async () => {
  const { userModel, fakeUser } = await makeUserModel()

  return {
    sut: new UpdateAccessTokenRepository(userModel),
    userModel,
    fakeUser
  }
}

describe('UpdateAccessTokenRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('user').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel, fakeUser } = await makeSut()

    await sut.update(fakeUser._id, 'valid_token')

    const updatedFakeUser = await userModel.findOne({ _id: fakeUser._id })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no UserModel is provider', async () => {
    const { fakeUser } = await makeUserModel()
    const sut = new UpdateAccessTokenRepository()

    const promise = sut.update(fakeUser._id, 'valid_token')

    expect(promise).rejects.toThrow()
  })
})
