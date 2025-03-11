import { ObjectId } from "mongodb";

export type PeopleProps = {
  _id: ObjectId;
  name: string;
  username: string;
}

export class People {
  private readonly _id: ObjectId;
  private readonly _name: string;
  private readonly _username: string;

  private constructor(props: PeopleProps) {
    this._id = props._id
    this._name = props.name;
    this._username = props.username;
  }

  public static create(name: string, username: string) {
    return new People({
      _id: new ObjectId(),
      name: name,
      username: username
    })
  }

  public static with(props: PeopleProps) {
    return new People(props)
  } 

  public get id(): ObjectId {
    return this._id
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }
}