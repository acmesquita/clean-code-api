import request from 'supertest'
import app from '../config/app'

describe('Content-Type Middlewere', () => {
  test('Should return json content-type as default', async () => {
    app.get('/teste_content_type', (req, res) => {
      res.json({})
    })
    await request(app)
      .get('/teste_content_type')
      .expect('content-type', /json/)
  })
})
