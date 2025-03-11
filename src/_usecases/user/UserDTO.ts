import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateUserInputDTO {
  @IsString()
  email!: string;

  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;

  @IsNotEmpty({ message: "Salário não pode ser vazio." })
  @IsNumber()
  @Min(1, { message: "Salário deve ser maior que zero." }) 
  salary!: number;
}

export class UpdateUserInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;

  @IsNotEmpty({ message: "Salário não pode ser vazio." })
  @IsNumber()
  @Min(1, { message: "Salário deve ser maior que zero." }) 
  salary!: number;
}

export class DeleteUserInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;
}