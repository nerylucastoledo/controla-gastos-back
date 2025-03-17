import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCardInputDTO {
  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Cor não pode ser vazia."})
  @IsString()
  @MinLength(4, { message: "Cor deve começar com # e ter no minimo 4 valores."})
  color!: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;
}

export class ListCardInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string
}

export class DeleteCardInputDTO {
  @IsNotEmpty({ message: "ID não pode ser vazio."})
  @IsString()
  id!: string;
}

export class UpdateCardInputDTO {
  @IsNotEmpty({ message: "ID não pode ser vazio."})
  @IsString()
  _id!: string;
  
  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Cor não pode ser vazia."})
  @IsString()
  @MinLength(4, { message: "Cor deve começar com # e ter no minimo 4 valores."})
  color!: string;
}