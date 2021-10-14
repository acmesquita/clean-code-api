import express from 'express'
import { setup } from './setup'

const app = express()

setup(app)

export default app
