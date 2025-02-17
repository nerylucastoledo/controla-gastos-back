// src/models/CardModel.ts

export class Card {
  private readonly _name: string;
  private readonly _color: string;
  private readonly _username: string;

  constructor(name: string, color: string, username: string) {
    this.validateName(name);
    this.validateColor(color);
    this.validateUsername(username);

    this._name = name;
    this._color = color;
    this._username = username;
  }

  public get name(): string {
    return this._name;
  }

  public get color(): string {
    return this._color;
  }

  public get username(): string {
    return this._username;
  }

  public toJson(): object {
    return {
      name: this.name,
      color: this.color,
      username: this.username,
    };
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Nome não pode ser vazio.');
    }
  }

  private validateColor(color: string): void {
    if (!color || color.trim().length === 0) {
      throw new Error('Cor não pode ser vazia.');
    }
  }

  private validateUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('Nome de usuário não pode ser vazio.');
    }
  }
}