import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class LoginInputDTO {
  @IsNotEmpty({ message: "E-mail não pode ser vazio."})
  @IsString()
  email!: string;

  @IsNotEmpty({ message: "Senha não pode ser vazio."})
  @IsString()
  password!: string;
}

export class RegisterInputDTO {
  @IsNotEmpty({ message: "E-mail não pode ser vazio."})
  @IsString()
  email!: string;

  @IsNotEmpty({ message: "Senha não pode ser vazia."})
  @IsString()
  password!: string;

  @IsNotEmpty({ message: "Salário não pode ser vazio."})
  @IsNumber()
  @Min(1, { message: "Salário deve ser maior que zero." }) 
  salary!: number;

  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;
}