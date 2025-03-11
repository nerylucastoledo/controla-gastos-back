import { ObjectId } from "mongodb";

export type UserProps = {
  _id: ObjectId;
  name: string;
  email: string;
  salary: number;
  username: string;
  password: string;
}

export class User {
  private _id: ObjectId;
  private _name: string;
  private _email: string;
  private _salary: number;
  private _username: string;
  private _password: string;

  private constructor(props: UserProps) {
    this._id = props._id;
    this._name = props.name;
    this._email = props.email;
    this._salary = props.salary;
    this._username = props.username;
    this._password = props.password;
  }

  public static create(name: string, email: string, salary: number, username: string, password: string) {
    return new User({
      _id: new ObjectId(),
      name,
      email,
      salary,
      username,
      password,
    })
  }

  public static with(props: UserProps) {
    return new User(props)
  } 

  public get id(): ObjectId {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get salary(): number {
    return this._salary;
  }

  public get username(): string {
    return this._username;
  }

  public get password(): string {
    return this._password;
  }
}