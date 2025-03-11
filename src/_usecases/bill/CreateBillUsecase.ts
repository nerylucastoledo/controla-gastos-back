import { validate } from "class-validator";
import { Card } from "../../_domain/_entities/Card";
import { IBillRepository } from "../../_domain/interfaces/IBillRepository";
import { Usecase } from "../usecase";
import { CreateBillInputDTO } from "./BillDTO";
import { Bill } from "../../_domain/_entities/Bill";

export class CreateBillUsecase implements Usecase<CreateBillInputDTO, void> {
  private billRepository: IBillRepository;

  constructor(billRepository: IBillRepository) {
    this.billRepository = billRepository
  }
 
  public async execute(input: CreateBillInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const bill = Bill.create(input.username, input.date, input.people, input.category, input.value, input.item, input.card)

    await this.billRepository.save(bill)
  }
}