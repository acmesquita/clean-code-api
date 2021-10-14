import express from 'express'
import { setup } from './setup'
import { setupRoutes } from './routes'

const app = express()

setup(app)
setupRoutes(app)

export default app
