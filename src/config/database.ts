import { MongoClient } from 'mongodb';

class Database {
  private static instance: Database;
  private client: MongoClient;
  private dbName: string = 'controlaGastos';
  private uri: string | undefined;

  private constructor() {
    this.uri = process.env.MONGODB_URI;
    this.client = new MongoClient(this.uri!);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('MongoDB conectado com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', (error as Error).message);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log('Conexão com o MongoDB encerrada.');
    } catch (error) {
      console.error('Erro ao encerrar a conexão com o MongoDB:', (error as Error).message);
      throw error;
    }
  }

  public getDb() {
    return this.client.db(this.dbName);
  }
}

export default Database;