import { ObjectId } from "mongodb";

export type CardProps = {
  _id: ObjectId;
  name: string;
  color: string;
  username: string;
}

export class Card {
  private readonly _id: ObjectId;
  private readonly _name: string;
  private readonly _color: string;
  private readonly _username: string;

  private constructor(props: CardProps) {
    this._id = props._id
    this._name = props.name;
    this._color = props.color;
    this._username = props.username;
  }

  public static create(name: string, color: string, username: string) {
    return new Card({
      _id: new ObjectId(),
      name: name,
      color: color,
      username: username
    })
  }

  public static with(props: CardProps) {
    return new Card(props)
  }

  get id(): ObjectId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get color(): string {
    return this._color;
  }

  get username(): string {
    return this._username;
  }
}