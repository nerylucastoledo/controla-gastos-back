const connectDB = require('../config/database');
const { validateFields } = require('../utils/utils');
var ObjectId = require('mongodb').ObjectId; 

class PeopleService {
	static async createPeople(body) {
		const db = await connectDB();

    try {
      const { name, username } = body;

      if (!validateFields(name)) {
        throw new Error('Nome não pode ser vazio.');
      }

      if (!validateFields(username)) {
        throw new Error('Nome de usuário não pode ser vazio.');
      }

      const existingPeople = await db
        .collection('peoples')
        .findOne({
          $or: [
            { name, username }
          ]
        });

      if (existingPeople) {
        throw new Error('Nome já cadastrado! Cadastre outro.');
      }
      
      await db.collection('peoples').insertOne(body);

      return { message: 'Pessoa criada com sucesso!'};
    } catch (error) {
      throw new Error(error.message || 'Não foi possível criar essa pessoa.');
    }
	}

	static async getAllPeoples(username) {
    const db = await connectDB();

    try {
      const peoples = await db
        .collection("peoples")
        .find({ username })
        .toArray();

      return { data: peoples };
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar as pessoas.');
    }
  }

  static async updatePeopleName(body) {
    const db = await connectDB();

    try {
      const { _id, name } = body;

      if (!validateFields(_id)) {
        throw new Error('ID não pode ser vazio.');
      }

      if (!validateFields(name)) {
        throw new Error('Nome não pode ser vazio.');
      }

      const newObjectId = ObjectId.createFromHexString(_id)
      const existingPeople = await db
        .collection('peoples')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

      if (!existingPeople) {
        throw new Error('Nenhum nome encontrado.');
      }

      await db
        .collection('peoples')
        .updateOne(
          { _id: newObjectId },
          { $set: { name }}
        );

      return { message: 'Nome atualizado com sucesso.' };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar o nome.');
    }
  }

  static async deletePeople(id) {
    const db = await connectDB();

    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingPeople = await db
        .collection('peoples')
        .find({ _id: newObjectId })
        .toArray();

      if (!existingPeople.length) {
        throw new Error('Nenhum ID encontrado.');
      }

      await db
        .collection('peoples')
        .deleteOne({ 
          _id: newObjectId 
        });

      return { message: 'Nome deletado com sucesso.' };
    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar esse nome.');
    }
  }
}

module.exports = PeopleService;