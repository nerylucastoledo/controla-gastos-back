import { IsNotEmpty, IsString } from 'class-validator';
import { IExpenseCreate } from '../utils/types';

export class Bill {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  private readonly _username: string;

  @IsNotEmpty({ message: "Date não pode ser vazio."})
  @IsString()
  private readonly _date: string;

  @IsNotEmpty({ message: "Pessoa não pode ser vazia."})
  @IsString()
  private readonly _people: string;

  @IsNotEmpty({ message: "Categoria não pode ser vazia."})
  @IsString()
  private readonly _category: string;

  @IsNotEmpty({ message: "Valor não pode ser vazio."})
  @IsString()
  private readonly _value: string;

  @IsNotEmpty({ message: "Item não pode ser vazio."})
  @IsString()
  private readonly _item: string;

  @IsNotEmpty({ message: "Cartão não pode ser vazio."})
  @IsString()
  private readonly _card: string;

  constructor(username: string, date: string, people: string, category: string, value: string, item: string, card: string) {
    this._username = username;
    this._date = date;
    this._people = people;
    this._category = category;
    this._value = value;
    this._item = item;
    this._card = card;
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

  public toJson(): IExpenseCreate {
    return {
      username: this.username,
      date: this.date,
      people: this.people,
      category: this.category,
      value: this.value,
      item: this.item,
      card: this.card,
    };
  }
}