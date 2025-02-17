import Database from '../config/database';
import { Card } from '../models/Card';
import { ObjectId } from 'mongodb';
import { ICardCreate } from '../utils/types';

class CardService {
  private db = Database.getInstance().getDb();

  public async createCard(body: ICardCreate): Promise<{ message: string }> {
    try {
      const newCard = new Card(body.name, body.color, body.username);

      const existingCard = await this.db.collection('cards').findOne({
        $or: [{ name: newCard.name }, { username: newCard.username }]
      });

      if (existingCard) {
        throw new Error('Cartão já cadastrado.');
      }

      await this.db.collection('cards').insertOne(newCard.toJson());
      return { message: 'Cartão criado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível criar esse cartão.');
    }
  }

  public async getAllCards(username: string): Promise<{ data: any[] }> {
    try {
      const cards = await this.db.collection("cards").find({ username }).toArray();
      return { data: cards };
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar os cartões.');
    }
  }

  public async updateCard(body: { _id: string; name: string; color: string }): Promise<{ message: string }> {
    try {
      const { _id, name, color } = body;

      const newObjectId = new ObjectId(_id);
      const existingCard = await this.db.collection('cards').findOne({ _id: newObjectId });

      if (!existingCard) {
        throw new Error('Nenhum cartão encontrado.');
      }

      const updatedCard = new Card(name, color, existingCard.username);
      await this.db.collection('cards').updateOne(
        { _id: newObjectId },
        { $set: { name: updatedCard.name, color: updatedCard.color } }
      );

      return { message: 'Cartão atualizado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro ao atualizar o cartão.');
    }
  }

  public async deleteCard(id: string): Promise<{ message: string }> {
    try {
      const newObjectId = new ObjectId(id);
      const existingCard = await this.db.collection('cards').findOne({ _id: newObjectId });

      if (!existingCard) {
        throw new Error('Nenhum cartão encontrado com esse ID.');
      }

      await this.db.collection('cards').deleteOne({ _id: newObjectId });
      return { message: 'Cartão deletado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Erro ao deletar esse cartão.');
    }
  }
}

export default new CardService();