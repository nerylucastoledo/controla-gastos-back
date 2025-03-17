import { ObjectId } from "mongodb";
import Database from "./index";
import { IPeopleRepository } from "../../domain/repositories/IPeopleRepository";
import { People } from "../../domain/entities/People";

export class PeopleRepositoryMongo implements IPeopleRepository {
  private db = Database.getInstance().getDb();

  public async save(people: People): Promise<void> {
    const data = {
      _id: people.id,
      name: people.name,
      username: people.username
    }

    await this.db
      .collection('peoples')
      .insertOne(data);
  }

  public async findByNameAndUsername(name: string, username: string): Promise<People | null> {
    const people = await this.db
      .collection('peoples')
      .findOne({
        $or: [
          { name: name, username: username }, 
        ]
      });

    if (!people) return null

    const newPeople = People.with({
      _id: people._id,
      name: people.name,
      username: people.username
    })

    return newPeople;
  }

  async findById(id: string): Promise<People | null> {
    const newObjectId = new ObjectId(id);
    const people = await this.db
      .collection('peoples')
      .findOne({ _id: newObjectId });

    if (!people) return null

    const newPeople = People.with({
      _id: people._id,
      name: people.name,
      username: people.username
    })

    return newPeople;
  }

  public async listAll(username: string): Promise<People[]> {
    const peoples = await this.db
      .collection("peoples")
      .find({ username })
      .toArray();

    const peopleList = peoples.map(item => {
      const people = People.with({
        _id: item._id,
        name: item.name,
        username: item.username
      })
      return people
    })

    return peopleList;
  }

  async delete(id: string): Promise<void> {
    const newObjectId = new ObjectId(id);
    await this.db
      .collection('peoples')
      .deleteOne({ _id: newObjectId });
  }

  async update(id: string, name: string): Promise<void> {
    const newObjectId = new ObjectId(id);

    await this.db
      .collection('peoples')
      .updateOne(
        { _id: newObjectId },
        { $set: { name } }
      );
  }
}