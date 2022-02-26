import supertest from 'supertest'
import { app } from '../config/app'

describe('Content type middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await supertest(app)
      .get('/test_content_type')
      .expect('Content-Type', /json/)
  })

  it('Should return xml content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.setHeader('Content-Type', 'application/xml')
      res.send('')
    })

    await supertest(app)
      .get('/test_content_type_xml')
      .expect('Content-Type', /xml/)
  })
})
