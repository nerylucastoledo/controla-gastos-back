import { validate } from "class-validator";
import { Card } from "../../../domain/entities/Card";
import { ICardRepository } from "../../../domain/repositories/ICardRepository";
import { Usecase } from "../usecase";
import { CreateCardInputDTO } from "../../dto/CardDTO";

export class CreateCardUsecase implements Usecase<CreateCardInputDTO, void> {
  private cardRepository: ICardRepository;

  constructor(cardRepository: ICardRepository) {
    this.cardRepository = cardRepository
  }
 
  public async execute(input: CreateCardInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const cardAlreadyExists = await this.cardRepository.findByNameAndUsername(input.name, input.username)

    if (cardAlreadyExists) {
      throw new Error("Cartão com nome já cadastrado.")
    }

    const card = Card.create(input.name, input.color, input.username)

    await this.cardRepository.save(card)
  }
}