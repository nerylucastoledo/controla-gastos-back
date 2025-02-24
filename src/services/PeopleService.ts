import Database from '../config/database';
import { People } from '../models/People';
import { ObjectId } from 'mongodb';
import { IPeopleCreate, IPeopleUpdate } from '../utils/types';
import { validateEntity } from '../utils/Validator';

class PeopleService {
  private db = Database.getInstance().getDb();

  public async createPeople(body: IPeopleCreate): Promise<{ message: string }> {
    try {
      const newPeople = new People(body.name, body.username);

      const validationErrors = await validateEntity(newPeople);
      
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      const existingPeople = await this.existingPeople(newPeople.name, newPeople.username)

      if (existingPeople) {
        throw new Error('Nome ou username já cadastrado! Cadastre outro.');
      }

      await this.db.collection('peoples').insertOne(newPeople.toJson());
      return { message: 'Pessoa criada com sucesso!' };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível criar essa pessoa.');
    }
  }

  public async getAllPeoples(username: string): Promise<{ data: any[] }> {
    try {
      const peoples = await this.db.collection("peoples").find({ username }).toArray();
      return { data: peoples };
    } catch (error) {
      throw new Error('Ocorreu um erro ao buscar as pessoas.');
    }
  }

  public async updatePeopleName(body: IPeopleUpdate): Promise<{ message: string }> {
    try {
      const { _id, name } = body;

      if (!_id.length ) {
        throw new Error('ID não pode ser vazio.');
      }

      if (!name.length) {
        throw new Error('Nome não pode ser vazio.');
      }

      const newObjectId = new ObjectId(_id);
      const existingPeople = await this.db.collection('peoples').findOne({ _id: newObjectId });

      if (!existingPeople) {
        throw new Error('Nenhuma pessoa encontrada.');
      }

      const updatedPeople = new People(name, existingPeople.username);
      await this.db.collection('peoples').updateOne(
        { _id: newObjectId },
        { $set: { name: updatedPeople.name } }
      );

      return { message: 'Nome atualizado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro ao atualizar o nome.');
    }
  }

  public async deletePeople(id: string): Promise<{ message: string }> {
    try {
      const newObjectId = new ObjectId(id);
      const existingPeople = await this.db.collection('peoples').findOne({ _id: newObjectId });

      if (!existingPeople) {
        throw new Error('Nenhuma pessoa encontrada com esse ID.');
      }

      await this.db.collection('peoples').deleteOne({ _id: newObjectId });
      return { message: 'Pessoa deletada com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Erro ao deletar essa pessoa.');
    }
  }

  private existingPeople = async (name: string, username: string) => {
    const cards = await this.db
      .collection('users')
      .findOne({
        $or: [
          { name: name, username: username }, 
        ]
      });

    return cards;
  }
}

export default new PeopleService();