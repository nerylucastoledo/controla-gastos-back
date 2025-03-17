import { validate } from "class-validator";
import { ICardRepository } from "../../../domain/repositories/ICardRepository";
import { Usecase } from "../usecase";
import { DeleteCardInputDTO } from "../../dto/CardDTO";

export class DeleteCardUsecase implements Usecase<DeleteCardInputDTO, void> {
  private cardRepository: ICardRepository;

  constructor(cardRepository: ICardRepository) {
    this.cardRepository = cardRepository
  }
 
  public async execute(input: DeleteCardInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("ID precisa ser enviado.")
    }

    const card = await this.cardRepository.findById(input.id)

    if (!card) {
      throw new Error("Cartão não existe.")
    }

    await this.cardRepository.delete(input.id)
  }
}