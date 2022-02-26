import { Application } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'

export const setUpMiddlewares = (app: Application) => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
