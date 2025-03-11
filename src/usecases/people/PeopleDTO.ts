import { IsNotEmpty, IsString } from "class-validator";

export class CreatePeopleInputDTO {
  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;
}

export class ListPeopleInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string
}

export class DeletePeopleInputDTO {
  @IsNotEmpty({ message: "ID não pode ser vazio."})
  @IsString()
  id!: string;
}

export class UpdatePeopleInputDTO {
  @IsNotEmpty({ message: "ID não pode ser vazio."})
  @IsString()
  _id!: string;
  
  @IsNotEmpty({ message: "Nome não pode ser vazio."})
  @IsString()
  name!: string;
}