import cors from '../middlewares/cors'

export function setup (app) {
  app.disable('x-powered-by')
  app.use(cors)
}
