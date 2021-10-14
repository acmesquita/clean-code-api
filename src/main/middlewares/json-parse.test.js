import request from 'supertest'
import app from '../config/app'

describe('App Json Parcer', () => {
  test('Should parser body as json', async () => {
    app.post('/teste_json_parser', (req, res) => {
      res.json(req.body)
    })
    await request(app)
      .post('/teste_json_parser')
      .send({ name: 'teste' })
      .expect({ name: 'teste' })
  })
})
