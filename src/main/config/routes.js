import { Router } from 'express'
import fg from 'fast-glob'
const router = Router()

export function setupRoutes (app) {
  app.use('/api', router)
  fg.sync('**/src/main/routes/**.js').forEach(async path => {
    const { default: route } = await import(`../../../${path}`)
    route(router)
  })
}
