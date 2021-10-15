import { MongoClient } from 'mongodb'

export default class MongoHelper {
  static async connect (uri) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.client.db()
  }

  static async disconnect () {
    await this.client.close()
  }

  static async collection (collectionName) {
    return await this.db.collection(collectionName)
  }
}
