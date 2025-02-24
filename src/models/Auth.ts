import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class Auth {
  @IsNotEmpty({ message: "E-mail não pode ser vazio."})
  @IsString()
  private readonly _email: string;

  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  private readonly _name: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  private readonly _username: string;

  @IsNotEmpty({ message: "Salário não pode ser vazio." })
  @IsNumber()
  @Min(1, { message: "Salário deve ser maior que zero." }) 
  private readonly _salary: number;

  @IsNotEmpty({ message: "Senha não pode ser vazia." })
  @IsString()
  private readonly _password: string;

  constructor(email: string, name: string, username: string, salary: number, password: string) {
    this._email = email;
    this._name = name;
    this._username = username;
    this._salary = salary;
    this._password = password;
  }

  public get email(): string {
    return this._email;
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }

  public get salary(): number {
    return this._salary;
  }

  public get password(): string {
    return this._password;
  }

  public toJson(): object {
    return {
      email: this.email,
      name: this.name,
      username: this.username,
      salary: this.salary,
      passwrod: this.password
    };
  }
}