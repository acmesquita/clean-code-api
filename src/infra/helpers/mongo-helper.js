import { MongoClient } from 'mongodb'

export default class MongoHelper {
  static async connect (uri, dbName) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.client.db(dbName)
  }

  static async disconnect () {
    await this.client.close()
  }
}