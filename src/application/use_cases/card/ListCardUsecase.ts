import { ObjectId } from "mongodb";
import { ICardRepository } from "../../../domain/repositories/ICardRepository";
import { Usecase } from "../usecase";
import { ListCardInputDTO } from "../../dto/CardDTO";

export type ListCardOutputDTO = {
  _id: ObjectId;
  name: string;
  color: string;
}

export class ListCardUsecase implements Usecase<ListCardInputDTO, ListCardOutputDTO[]> {
  private cardRepository: ICardRepository

  constructor(cardRepository: ICardRepository) {
    this.cardRepository = cardRepository
  }

  public async execute(input: ListCardInputDTO): Promise<ListCardOutputDTO[]> {
    const cards = await this.cardRepository.listAll(input.username);
    
    const output = cards.map(card => {
      return {
        _id: card.id,
        name: card.name,
        color: card.color
      }
    })
    
    return output;
  }
}