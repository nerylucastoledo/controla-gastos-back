import { validate } from "class-validator";
import { Usecase } from "../usecase";
import { IBillRepository } from "../../../domain/repositories/IBillRepository";
import { DeleteBillInputDTO } from "../../dto/BillDTO";

export class DeleteBillUsecase implements Usecase<DeleteBillInputDTO, void> {
  private billRepository: IBillRepository;

  constructor(billRepository: IBillRepository) {
    this.billRepository = billRepository
  }
 
  public async execute(input: DeleteBillInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("ID precisa ser enviado.")
    }

    const bill = await this.billRepository.findById(input.id)

    if (!bill) {
      throw new Error("Gasto não existe.")
    }

    await this.billRepository.delete(input.id)
  }
}