import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import { appConfig, databaseConfig } from './config/env'
;(async () => {
  try {
    await MongoHelper.connect(databaseConfig.mongoUrl)
    const { app } = await import('./config/app')
    app.listen(app.get('port'), () => {
      console.log(`Server running at http://localhost:${appConfig.port}`)
    })
  } catch (error: any) {
    if (error.message.includes('ECONNREFUSED')) {
      console.error('Error: MongoDB server not running')
    } else {
      console.error(error)
    }
  }
})()
