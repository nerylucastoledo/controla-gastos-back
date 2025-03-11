import { Usecase } from "../usecase";
import { ListUsernameDateInputDTO } from "./BillDTO";
import { IBillRepository } from "../../_domain/interfaces/IBillRepository";
import { ICardRepository } from "../../_domain/interfaces/ICardRepository";
import { ListCardOutputDTO } from "../card/ListCardUsecase";
import { ObjectId } from "mongodb";

export type BillOutputDTO = {
  id: ObjectId;
  username: string;
  date: string;
  people: string;
  category: string;
  value: string;
  item: string;
  card: string;
}

export type ListBillOutputDTO = {
  expenses: BillOutputDTO[],
  cards: ListCardOutputDTO[]
}
export class ListBillUsernameDateUsecase implements Usecase<ListUsernameDateInputDTO, ListBillOutputDTO> {
  private billRepository: IBillRepository
  private cardRepository: ICardRepository

  constructor(billRepository: IBillRepository, cardRepository: ICardRepository) {
    this.billRepository = billRepository
    this.cardRepository = cardRepository
  }

  public async execute(input: ListUsernameDateInputDTO): Promise<ListBillOutputDTO> {
    const billList = await this.billRepository.getByUsernameAndDate(input.username, input.date);
    const cardList = await this.cardRepository.listAll(input.username);
    
    const outputBill: BillOutputDTO[] = billList.map(bill => {
      return {
        id: bill.id,
        username: bill.username,
        date: bill.date,
        people: bill.people,
        category: bill.category,
        value: bill.value,
        item: bill.item,
        card: bill.card,
      }
    })

    const outputCards: ListCardOutputDTO[] = cardList.map(card => {
      return {
        _id: card.id,
        color: card.color,
        name: card.name
      }
    })
    
    return {
      expenses: outputBill,
      cards: outputCards,
    }
  }
}