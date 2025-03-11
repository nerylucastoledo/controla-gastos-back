import { Request, Response } from "express";
import { CreateCardUsecase } from "../../usecases/card/CreateCardUsecase";
import { DeleteCardUsecase } from "../../usecases/card/DeleteCardUsecase";
import { UpdateCardUsecase } from "../../usecases/card/UpdateCardUsecase";
import { ListCardUsecase } from "../../usecases/card/ListCardUsecase";
import { CreateCardInputDTO, DeleteCardInputDTO, ListCardInputDTO, UpdateCardInputDTO } from "../../usecases/card/CardDTO";
import { ProviderCard } from "../../usecases/card/ProviderCard";

export class CardController {
  private constructor(
    private createCard: CreateCardUsecase, 
    private listCard: ListCardUsecase,
    private deleteCard: DeleteCardUsecase,
    private updateCard: UpdateCardUsecase
  ) {}
  
  public static builder() {
    return new CardController(
      ProviderCard.createCreateCardUseCase(), 
      ProviderCard.listListAllCardUseCase(), 
      ProviderCard.deleteDeleteCardUseCase(), 
      ProviderCard.putPutAllCardUseCase()
    )
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateCardInputDTO = Object.assign(new CreateCardInputDTO(), req.body)
      await this.createCard.execute(dto);
      res.status(201).json({ message: "Cartão criado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const dto: ListCardInputDTO = Object.assign(new ListCardInputDTO(), req.params)
      const cards = await this.listCard.execute(dto);
      res.status(200).json({ data: cards });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const dto: DeleteCardInputDTO = Object.assign(new DeleteCardInputDTO(), req.params)
      await this.deleteCard.execute(dto);
      res.status(200).json({ message: "Cartão deletado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdateCardInputDTO = Object.assign(new UpdateCardInputDTO(), req.body)
      await this.updateCard.execute(dto);
      res.status(200).json({ message: "Cartão atualizado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}