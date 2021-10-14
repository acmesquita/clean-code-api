import cors from '../middlewares/cors'
import jsonParser from '../middlewares/json-parse'
import contentType from '../middlewares/content-type'

export function setup (app) {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
  app.use(contentType)
}
