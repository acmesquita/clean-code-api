import { LoadUserByEmailRepository } from './load-user-by-email-repository'
import MongoHelper from '../helpers/mongo-helper'

let db

const makeSut = () => {
  const userModel = db.collection('users')

  return {
    sut: new LoadUserByEmailRepository(userModel),
    userModel
  }
}

describe('LoadUserByEmailRepository', () => {
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

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')

    expect(user).toBeNull()
  })

  test('Should return user if user is found', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      password: 'hashed_password'
    })

    const user = await sut.load('valid_email@mail.com')

    expect(user.password).toBe('hashed_password')
  })
})
