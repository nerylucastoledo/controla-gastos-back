const connectDB = require('../config/database');
var ObjectId = require('mongodb').ObjectId; 

class CardService {
	static async createCard(cardData) {
		const db = await connectDB();

    try {
      const existingCard = await db
        .collection('cards')
        .findOne({
          $or: [
            { name: cardData.name, username: cardData.username }
          ]
        });

      if (existingCard) {
        throw new Error('Cartão já cadastrado');
      }
      
      await db.collection('cards').insertOne(cardData);

      return {
        message: 'Cartão criado com sucesso!',
        cards: cardData
      };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível criar esse cartão');
    }
	}

	static async getAllCards(username) {
    try {
      const db = await connectDB();
      const cards = await db.collection("cards").find({ username }).toArray();

      if (!cards.length) {
        throw new Error('Não foi possível encontrar nenhum cartão para este usuário');
      }

      return cards;

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os cartões');
    }
  }

  static async updateCard(id, name, color) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingCard = await db
        .collection('cards')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

        if (!existingCard) {
          throw new Error('Nenhum cartão encontrado');
        }

      await db.collection('cards').updateOne(
        { _id: newObjectId },
        { $set: { name, color }}
      );

      return {
        message: 'Cartão atualizado com sucesso!',
        card: { name }
      };

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar o cartão');
    }
  }

  static async deleteCard(id) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingCard = await db
        .collection('cards')
        .find({ _id: newObjectId })
        .toArray();

      if (!existingCard.length) {
        throw new Error('Nenhum ID encontrado');
      }

      await db.collection('cards').deleteOne({ _id: newObjectId });

      return {
        message: 'Cartão deletado com sucesso!',
      };

    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar esse cartão');
    }
  }
}

module.exports = CardService;