import Database from '../config/database';
import { Card } from '../models/Card';
import { ObjectId } from 'mongodb';
import { ICardCreate } from '../utils/types';
import { validateEntity } from '../utils/Validator';

class CardService {
  private db = Database.getInstance().getDb();

  public async createCard(body: ICardCreate): Promise<{ message: string }> {
    try {
      const card = new Card(body.name, body.color, body.username);
      const validationErrors = await validateEntity(card);

      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      const existingCard = await this.existingCard(card.name, card.username)

      if (existingCard) {
        throw new Error('Cartão já cadastrado.');
      }

      await this.db.collection('cards').insertOne(card.toJson());
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

      if (!_id.length ) {
        throw new Error('ID não pode ser vazio.');
      }

      if (!name.length) {
        throw new Error('Nome não pode ser vazio.');
      }

      if (!color.length) {
        throw new Error('Cor não pode ser vazia.');
      }

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

  private existingCard = async (name: string, username: string) => {
    const cards = await this.db
      .collection('cards')
      .findOne({
        $or: [
          { name: name, username: username }, 
        ]
      });

    return cards;
  }
}

export default new CardService();