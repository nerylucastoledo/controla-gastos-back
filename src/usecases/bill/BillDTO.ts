import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBillInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string;

  @IsNotEmpty({ message: "Data não pode ser vazia."})
  @IsString()
  date!: string;

  @IsNotEmpty({ message: "Pessoa não pode ser vazia."})
  @IsString()
  people!: string;

  @IsNotEmpty({ message: "Categoria não pode ser vazia."})
  @IsString()
  category!: string;

  @IsNotEmpty({ message: "Valor não pode ser vazio."})
  @IsString()
  value!: string;

  @IsNotEmpty({ message: "Item não pode ser vazio."})
  @IsString()
  item!: string;

  @IsNotEmpty({ message: "Cartão não pode ser vazio."})
  @IsString()
  card!: string;

  @IsNotEmpty({ message: "Parcelamento não pode ser 0."})
  @IsNumber()
  installments!: number;
}

export class ListUsernameDateInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string

  @IsNotEmpty({ message: "Data não pode ser vazia."})
  @IsString()
  date!: string;
}

export class ListUsernameAndYearInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string

  @IsNotEmpty({ message: "Ano não pode ser vazio."})
  @IsString()
  year!: string;
}

export class ListUsernameDateCardInputDTO {
  @IsNotEmpty({ message: "Username não pode ser vazio."})
  @IsString()
  username!: string

  @IsNotEmpty({ message: "Data não pode ser vazia."})
  @IsString()
  date!: string;

  @IsNotEmpty({ message: "Cartão não pode ser vazio."})
  @IsString()
  card!: string;
}

export class DeleteBillInputDTO {
  @IsNotEmpty({ message: "ID não pode ser vazio."})
  @IsString()
  id!: string;
}

export class UpdateBillInputDTO {
  @IsNotEmpty({ message: "ID não pode ser vazio."})
  @IsString()
  _id!: string;
  
  @IsNotEmpty({ message: "Categoria não pode ser vazia."})
  @IsString()
  category!: string;

  @IsNotEmpty({ message: "Valor não pode ser vazio."})
  @IsString()
  value!: string;

  @IsNotEmpty({ message: "Item não pode ser vazio."})
  @IsString()
  item!: string;
}