import request from 'supertest'
import app from './app'

describe('App Setup', () => {
  test('Should disabled x-powered-by header', async () => {
    app.get('/teste_x_powered_by', (req, res) => {
      res.send('test_header')
    })
    const response = await request(app).get('/teste_x_powered_by')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })

  test('Should enable cors', async () => {
    app.get('/teste_cors', (req, res) => {
      res.send('test_header')
    })
    const response = await request(app).get('/teste_cors')

    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-methods']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})
