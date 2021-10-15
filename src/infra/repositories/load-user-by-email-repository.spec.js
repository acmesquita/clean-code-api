import { LoadUserByEmailRepository } from './load-user-by-email-repository'
import MongoHelper from '../helpers/mongo-helper'
import { MissingParamsError } from '../../utils/errors'

let db

const makeSut = async () => {
  const userModel = await db.collection('users')

  return {
    sut: new LoadUserByEmailRepository(),
    userModel
  }
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = await makeSut()
    const user = await sut.load('invalid_email@mail.com')

    expect(user).toBeNull()
  })

  test('Should return user if user is found', async () => {
    const { sut, userModel } = await makeSut()
    await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      password: 'hashed_password'
    })

    const user = await sut.load('valid_email@mail.com')

    expect(user.password).toBe('hashed_password')
  })

  test('Should throw if no email is provider to load method', () => {
    const sut = new LoadUserByEmailRepository()
    expect(sut.load()).rejects.toThrow(new MissingParamsError('email'))
  })
})
