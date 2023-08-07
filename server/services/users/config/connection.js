require('dotenv').config()
const { MongoClient } = require('mongodb');

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.DATABASE_URI

const client = new MongoClient(uri);

class MongoClientConnection {
  static db = undefined
  static userCollection = undefined
  static async connect() {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    this.db = client.db('P3C2')
    this.userCollection = this.db.collection('Users')
  }
}

module.exports = MongoClientConnection
