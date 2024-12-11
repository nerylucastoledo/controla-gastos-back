const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db("controlaGastos");
      console.log('MongoDB conectado com sucesso!');
    }
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    throw error;
  }
}

module.exports = connectDB;