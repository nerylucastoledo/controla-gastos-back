import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class User {
  @IsNotEmpty({ message: "E-mail não pode ser vazio."})
  @IsString()
  private _email: string;

  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  private _name: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  private _username: string;

  @IsNotEmpty({ message: "Salário não pode ser vazio." })
  @IsNumber()
  @Min(1, { message: "Salário deve ser maior que zero." }) 
  private _salary: number;

  constructor(email: string, name: string, username: string, salary: number) {
    this._email = email;
    this._name = name;
    this._username = username;
    this._salary = salary;
  }

  public get getEmail(): string {
    return this._email;
  }

  public get getName(): string {
    return this._name;
  }

  public get getUsername(): string {
    return this._username;
  }

  public get getSalary(): number {
    return this._salary;
  }
}