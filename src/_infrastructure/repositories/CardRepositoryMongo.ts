import { ObjectId } from "mongodb";
import { Card } from "../../_domain/_entities/Card";
import Database from "../../config/database";
import { ICardRepository } from "../../_domain/interfaces/ICardRepository";

export class CardRepositoryMongo implements ICardRepository {
  private db = Database.getInstance().getDb();

  public async save(card: Card): Promise<void> {
    const data = {
      _id: card.id,
      name: card.name,
      color: card.color,
      username: card.username
    }

    await this.db
      .collection('cards')
      .insertOne(data);
  }

  public async findByNameAndUsername(name: string, username: string): Promise<Card | null> {
    const card = await this.db
      .collection('cards')
      .findOne({
        $or: [
          { name: name, username: username }, 
        ]
      });

    if (!card) return null

    const newCard = Card.with({
      _id: card._id,
      name: card.name,
      color: card.color,
      username: card.username
    })

    return newCard;
  }

  async findById(id: string): Promise<Card | null> {
    const newObjectId = new ObjectId(id);
    const card = await this.db
      .collection('cards')
      .findOne({ _id: newObjectId });

    if (!card) return null

    const newCard = Card.with({
      _id: card._id,
      name: card.name,
      color: card.color,
      username: card.username
    })

    return newCard;
  }

  public async listAll(username: string): Promise<Card[]> {
    const cards = await this.db
      .collection("cards")
      .find({ username })
      .toArray();

    const cardList = cards.map(item => {
      const card = Card.with({
        _id: item._id,
        name: item.name,
        color: item.color,
        username: item.username
      })
      return card
    })

    return cardList;
  }

  async delete(id: string): Promise<void> {
    const newObjectId = new ObjectId(id);
    await this.db
      .collection('cards')
      .deleteOne({ _id: newObjectId });
  }

  async update(id: string, name: string, color: string): Promise<void> {
    const newObjectId = new ObjectId(id);

    await this.db
      .collection('cards')
      .updateOne(
        { _id: newObjectId },
        { $set: { name, color } }
      );
  }
}