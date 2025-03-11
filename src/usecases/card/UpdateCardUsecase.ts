import { validate } from "class-validator";
import { ICardRepository } from "../../domain/interfaces/ICardRepository";
import { Usecase } from "../usecase";
import { UpdateCardInputDTO } from "./CardDTO";

export class UpdateCardUsecase implements Usecase<UpdateCardInputDTO, void> {
  private cardRepository: ICardRepository;

  constructor(cardRepository: ICardRepository) {
    this.cardRepository = cardRepository
  }

  public async execute(input: UpdateCardInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const card = await this.cardRepository.findById(input._id)

    if (!card) {
      throw new Error("Cartão não existe.")
    }

    await this.cardRepository.update(input._id, input.name, input.color)
  }
}