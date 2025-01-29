const connectDB = require('../config/database');
const { validateFields } = require('../utils/utils');
var ObjectId = require('mongodb').ObjectId; 

class CardService {
	static async createCard(body) {
		const db = await connectDB();

    try {
      const { name, color, username } = body;

      if (!validateFields(name)) {
        throw new Error('Nome não pode ser vazio.');
      }

      if (!validateFields(color)) {
        throw new Error('Cor não pode ser vazia.');
      }

      if (!validateFields(username)) {
        throw new Error('Nome de usuário não pode ser vazio.');
      }

      const existingCard = await db
        .collection('cards')
        .findOne({
          $or: [
            { name, username }
          ]
        });

      if (existingCard) {
        throw new Error('Cartão já cadastrado! Cadastre outro.');
      }
      
      await db.collection('cards').insertOne(body);

      return { message: 'Cartão criado com sucesso!'};
    } catch (error) {
      throw new Error(error.message || 'Não foi possível criar esse cartão.');
    }
	}

	static async getAllCards(username) {
    try {
      const db = await connectDB();
      const cards = await db
        .collection("cards")
        .find({ username })
        .toArray();

      return { data: cards };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os cartões.');
    }
  }

  static async updateCard(body) {
    const db = await connectDB();

    try {
      const { _id, name, color } = body;

      if (!validateFields(_id)) {
        throw new Error('ID não pode ser vazio.');
      }

      if (!validateFields(name)) {
        throw new Error('Nome não pode ser vazio.');
      }

      if (!validateFields(color)) {
        throw new Error('Cor não pode ser vazia.');
      }

      const newObjectId = ObjectId.createFromHexString(_id)
      const existingCard = await db
        .collection('cards')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

      if (!existingCard) {
        throw new Error('Nenhum cartão encontrado.');
      }

      await db
        .collection('cards')
        .updateOne(
          { _id: newObjectId },
          { $set: { name, color }}
        );

      return { message: 'Cartão atualizado com sucesso.' };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar o cartão.');
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
        throw new Error('Nenhum ID encontrado.');
      }

      await db
        .collection('cards')
        .deleteOne({ 
          _id: newObjectId 
        });

      return { message: 'Cartão deletado com sucesso.'};
    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar esse cartão.');
    }
  }
}

module.exports = CardService;