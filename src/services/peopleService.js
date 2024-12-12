const connectDB = require('../config/database');
var ObjectId = require('mongodb').ObjectId; 

class PeopleService {
	static async createPeople(peopleData) {
		const db = await connectDB();

    try {
      const existingPeople = await db
        .collection('peoples')
        .findOne({
          $or: [
            { name: peopleData.name, username: peopleData.username }
          ]
        });

      if (existingPeople) {
        throw new Error('Nome já cadastrado');
      }
      
      await db.collection('peoples').insertOne(peopleData);

      return {
        message: 'Pessoa criada com sucesso!',
        peoples: peopleData
      };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível criar essa pessoa');
    }
	}

	static async getAllPeoples(username) {
    try {
      const db = await connectDB();
      const peoples = await db.collection("peoples").find({ username }).toArray();

      if (!peoples.length) {
        throw new Error('Não foi possível encontrar nenhuma pessoa para este usuário');
      }

      return peoples;

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar as pessoas');
    }
  }

  static async updatePeopleName(id, name) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingPeople = await db
        .collection('peoples')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

        if (!existingPeople) {
          throw new Error('Nenhuma pessoa encontrada');
        }

      await db.collection('peoples').updateOne(
        { _id: newObjectId },
        { $set: { name }}
      );

      return {
        message: 'Nome atualizado com sucesso!',
        people: { name }
      };

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar o nome');
    }
  }

  static async deletePeople(id) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingPeople = await db
        .collection('peoles')
        .find({ id })
        .toArray();

      if (!existingPeople) {
        throw new Error('Nenhum ID encontrado');
      }

      await db.collection('peoples').deleteOne({ _id: newObjectId });

      return {
        message: 'Nome deletado com sucesso!',
      };

    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar esse nome');
    }
  }
}

module.exports = PeopleService;