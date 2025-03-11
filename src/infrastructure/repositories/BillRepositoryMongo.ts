import { ObjectId } from "mongodb";
import Database from "../../config/database";
import { IPeopleRepository } from "../../domain/interfaces/IPeopleRepository";
import { People } from "../../domain/entities/People";
import { IBillRepository } from "../../domain/interfaces/IBillRepository";
import { Bill } from "../../domain/entities/Bill";

export class BillRepositoryMongo implements IBillRepository {
  private db = Database.getInstance().getDb();

  public async save(bill: Bill): Promise<void> {
    const data = {
      _id: bill.id,
      username: bill.username,
      date: bill.date,
      people: bill.people,
      category: bill.category,
      value: bill.value,
      item: bill.item,
      card: bill.card,
    }

    await this.db
      .collection('bill')
      .insertOne(data);
  }

  public async saveWithInstallments(bill: Bill[]): Promise<void> {
    const data = bill.map(item => {
      return {
        _id: item.id,
        username: item.username,
        date: item.date,
        people: item.people,
        category: item.category,
        value: item.value,
        item: item.item,
        card: item.card,
      }
    })

    await this.db
      .collection('bill')
      .insertMany(data);
  }

  async findById(id: string): Promise<Bill | null> {
    const newObjectId = new ObjectId(id);
    const bill = await this.db
      .collection('bill')
      .findOne({ _id: newObjectId });

    if (!bill) return null

    const newBill = Bill.with({
      _id: bill.id,
      username: bill.username,
      date: bill.date,
      people: bill.people,
      category: bill.category,
      value: bill.value,
      item: bill.item,
      card: bill.card,
    })

    return newBill;
  }

  public async getByUsernameAndDate(username: string, date: string): Promise<Bill[] | []> {
    const bills = await this.db
      .collection("bill")
      .find({ username, date })
      .toArray();

    if (!bills.length) return []

    const billList = bills.map(item => {
      const bill = Bill.with({
        _id: item._id,
        username: item.name,
        date: item.date,
        people: item.people,
        category: item.category,
        value: item.value,
        item: item.item,
        card: item.card,
      })
      return bill
    })

    return billList;
  }

  public async getByUsernameDateCard(username: string, date: string, card: string): Promise<Bill[] | []> {
    const bills = await this.db
      .collection("bill")
      .find({ username, date, card })
      .toArray();

    if (!bills.length) return []

    const billList = bills.map(item => {
      const bill = Bill.with({
        _id: item._id,
        username: item.name,
        date: item.date,
        people: item.people,
        category: item.category,
        value: item.value,
        item: item.item,
        card: item.card,
      })
      return bill
    })

    return billList;
  }

  public async getByUsernameYear(username: string, year: string): Promise<Bill[] | []> {
    const bills = await this.db
      .collection("bill")
      .find({ 
        username, 
        people: "Eu",
        date: { $regex : year }
      })
      .toArray();

    if (!bills.length) return []

    const billList = bills.map(item => {
      const bill = Bill.with({
        _id: item._id,
        username: item.name,
        date: item.date,
        people: item.people,
        category: item.category,
        value: item.value,
        item: item.item,
        card: item.card,
      })
      return bill
    })

    return billList;
  }

  async delete(id: string): Promise<void> {
    const newObjectId = new ObjectId(id);
    await this.db
      .collection('bill')
      .deleteOne({ _id: newObjectId });
  }

  async update(id: string, category: string, value: string, item: string): Promise<void> {
    const newObjectId = new ObjectId(id);

    const data = {
      category,
      value,
      item
    }

    await this.db
      .collection('bill')
      .updateOne(
        { _id: newObjectId },
        { $set: { ...data } }
      );
  }
}