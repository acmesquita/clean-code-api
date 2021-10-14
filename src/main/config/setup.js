import cors from '../middlewares/cors'
import { json } from '../middlewares/json-parse'

export function setup (app) {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(json())
}
