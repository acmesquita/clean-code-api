import loginRouter from '../composers/login-router-compose'
import { ExpressRouterAdapter } from '../adapters/express-router-adapter'

export default async router => {
  router.post('/login', ExpressRouterAdapter.adapt(loginRouter))
}
