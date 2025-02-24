import { IsNotEmpty, IsString } from "class-validator";

export class People {
  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  private readonly _name: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  private readonly _username: string;

  constructor(name: string, username: string) {
    this._name = name;
    this._username = username;
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }

  public toJson(): object {
    return {
      name: this.name,
      username: this.username,
    };
  }
}