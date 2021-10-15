import MongoHelper from '../infra/helpers/mongo-helper'
import app from './config/app'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => console.log('Server running'))
  })
  .catch(console.error)
