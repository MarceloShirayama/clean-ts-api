import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setUpRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // FastGlob.sync('**/src/main/routes/**routes.ts').map(async (file) =>
  //   (await import(`../../../${file}`)).default(router)
  // )
  readdirSync(path.join(__dirname, '..', 'routes')).map(async (file) => {
    if (!file.includes('.test.')) {
      ;(await import(`../routes/${file}`)).default(router)
    }
  })
}
