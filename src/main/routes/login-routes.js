import ExpressRouterAdapter from '../adapters/express-router-adapter'
import LoginRouterCompose from '../composers/login-router-compose'
const adapt = ExpressRouterAdapter.adapt

export default async router => {
  router.post('/login', adapt(LoginRouterCompose.compose()))
}
