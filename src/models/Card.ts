import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class Card {
  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  private readonly _name: string;

  @IsNotEmpty({ message: "Cor não pode ser vazia."})
  @IsString()
  @MinLength(4, { message: "Cor deve começar com # e ter no minimo 4 valores."})
  private readonly _color: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  private readonly _username: string;

  constructor(name: string, color: string, username: string) {
    this._name = name;
    this._color = color;
    this._username = username;
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

  public toJson(): object {
    return {
      name: this.name,
      color: this.color,
      username: this.username,
    };
  }
}