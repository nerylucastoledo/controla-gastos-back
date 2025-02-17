// src/models/BillModel.ts

import { IExpenseCreate } from '../utils/types';

export class Bill {
  private readonly _username: string;
  private readonly _date: string;
  private readonly _people: string;
  private readonly _category: string;
  private readonly _value: string;
  private readonly _item: string;
  private readonly _card: string;

  constructor(username: string, date: string, people: string, category: string, value: string, item: string, card: string) {
    this.validateUsername(username);
    this.validateDate(date);
    this.validatePeople(people);
    this.validateCategory(category);
    this.validateValue(value);
    this.validateItem(item);
    this.validateCard(card);

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

  private validateUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('O nome de usuário não pode ser vazio.');
    }
  }

  private validateDate(date: string): void {
    if (!date) {
      throw new Error('A data não pode ser vazia.');
    }
  }

  private validatePeople(people: string): void {
    if (!people) {
      throw new Error('A pessoa não pode ser vazia.');
    }
  }

  private validateCategory(category: string): void {
    if (!category) {
      throw new Error('A categoria não pode ser vazia.');
    }
  }

  private validateValue(value: string): void {
    if (!value) {
      throw new Error('O valor não pode ser vazio.');
    }
  }

  private validateItem(item: string): void {
    if (!item) {
      throw new Error('Item não pode ser vazio.');
    }
  }

  private validateCard(card: string): void {
    if (!card) {
      throw new Error('O cartão não pode ser vazio.');
    }
  }
}