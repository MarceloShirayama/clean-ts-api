import { Collection, MongoClient, MongoClientOptions } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  database: null as unknown as string,

  async connect(uri: string, options?: MongoClientOptions): Promise<void> {
    this.client = new MongoClient(uri, options)
    await this.client.connect()
    this.database = this.client.db().databaseName
    console.info(`Connected successfully to database ${this.database}`)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    console.info(`Disconnected successfully to database ${this.database}`)
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
