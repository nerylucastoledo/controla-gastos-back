import { ObjectId } from "mongodb";

export type BillProps = {
  _id: ObjectId;
  username: string;
  date: string;
  people: string;
  category: string;
  value: string;
  item: string;
  card: string;
}

export class Bill {
  private readonly _id: ObjectId;
  private readonly _username: string;
  private readonly _date: string;
  private readonly _people: string;
  private readonly _category: string;
  private readonly _value: string;
  private readonly _item: string;
  private readonly _card: string;

  private constructor(props: BillProps) {
    this._id = props._id
    this._username = props.username;
    this._date = props.date;
    this._people = props.people;
    this._category = props.category;
    this._value = props.value;
    this._item = props.item;
    this._card = props.card;
  }

  public static create(username: string, date: string, people: string, category: string, value: string, item: string, card: string) {
    return new Bill({
      _id: new ObjectId(),
      username,
      date,
      people,
      category,
      value,
      item,
      card,
    })
  }
  
  public static with(props: BillProps) {
    return new Bill(props)
  }

  public get id(): ObjectId {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }

  public get date(): string {
    return this._date;
  }

  public get people(): string {
    return this._people;
  }

  public get category(): string {
    return this._category;
  }

  public get value(): string {
    return this._value;
  }

  public get item(): string {
    return this._item;
  }

  public get card(): string {
    return this._card;
  }
}