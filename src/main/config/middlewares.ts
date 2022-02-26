import { Application } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'

export const setUpMiddlewares = (app: Application) => {
  app.use(bodyParser)
  app.use(cors)
}
