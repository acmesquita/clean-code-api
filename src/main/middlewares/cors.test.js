import request from 'supertest'
import app from '../config/app'

describe('App CORS', () => {
  test('Should enable cors', async () => {
    app.get('/teste_cors', (req, res) => {
      res.json({})
    })
    const response = await request(app).get('/teste_cors')

    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})
