import dotenv from 'dotenv'

dotenv.config()

const username = process.env.MONGO_USERNAME || ''
const password = process.env.MONGO_PASSWORD || ''
const database = process.env.MONGO_DATABASE || 'clean-node-api'
const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || '27017'

export const databaseConfig = {
  mongoUrl:
    `mongodb://${username}:${password}@${host}:${port}/${database}` ||
    'mongodb://localhost:27017'
}

export const appConfig = {
  port: Number(process.env.PORT) || 5050
}

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'tj67O==5H'
}
