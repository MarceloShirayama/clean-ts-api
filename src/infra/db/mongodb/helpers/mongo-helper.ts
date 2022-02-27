import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = new MongoClient(process.env.MONGO_URL as string)
    await this.client.connect()
    console.info('Connected successfully database')
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    console.info('Disconnected successfully database')
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },

  map(collection: any): AccountModel {
    return {
      id: String(collection._id),
      name: collection.name,
      email: collection.email,
      password: collection.password
    }
  }
}
