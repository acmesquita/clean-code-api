import request from 'supertest'
import MongoHelper from '../../infra/helpers/mongo-helper'
import app from '../config/app'
import bcrypt from 'bcrypt'

let userModel

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.collection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid credential are provider', async () => {
    await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: bcrypt.hashSync('hashed_password', 10)
    })

    console.log(bcrypt.hashSync('hashed_password', 10))

    await request(app).post('/api/login').send({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    }).expect(200)
  })

  test('Should return 401 when invalid credential are provider', async () => {
    await request(app).post('/api/login').send({
      email: 'invalid_email@mail.com',
      password: 'hashed_password'
    }).expect(401)
  })
})
