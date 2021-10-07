import { MongoClient } from 'mongodb'
import { LoadUserByEmailRepository } from './load-user-by-email-repository'

let connection, db

const makeSut = () => {
  const userModel = db.collection('users')

  return {
    sut: new LoadUserByEmailRepository(userModel),
    userModel
  }
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('user').deleteMany()
  })

  afterAll(async () => {
    await connection.close()
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
