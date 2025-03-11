import { Usecase } from "../usecase";
import { ListUsernameDateInputDTO, UpdateBillInputDTO } from "./BillDTO";
import { IBillRepository } from "../../_domain/interfaces/IBillRepository";
import { validate } from "class-validator";
import { ObjectId } from "mongodb";

export type ListBillOutputDTO = {
  username: string;
  date: string;
  people: string;
  category: string;
  value: string;
  item: string;
  card: string;
}

export class UpdateBillUsecase implements Usecase<UpdateBillInputDTO, void> {
  private billRepository: IBillRepository

  constructor(billRepository: IBillRepository) {
    this.billRepository = billRepository
  }

  public async execute(input: UpdateBillInputDTO): Promise<void> {
    const errors = await validate(input);
    
    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const existingBill = await this.billRepository.findById(input._id);

    if (!existingBill) {
      throw new Error('Nenhum gasto encontrado.');
    }

   await this.billRepository.update(input._id, input.category, input.value, input.item);
  }
}