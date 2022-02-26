import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = new MongoClient(process.env.MONGO_URL as string)
    await this.client.connect()
    console.info('Connected successfully to server')
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    console.info('Disconnected successfully from server')
  }
}
