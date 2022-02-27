export const databaseConfig = {
  mongoUrl:
    String(process.env.MONGO_URL) || 'mongodb://localhost:27017/clean-node-api'
}

export const appConfig = {
  port: Number(process.env.PORT) || 5050
}
