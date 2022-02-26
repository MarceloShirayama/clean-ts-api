import { Application } from 'express'
import { bodyParser } from '../middlewares/body-parser'

export const setUpMiddlewares = (app: Application) => {
  app.use(bodyParser)
}
