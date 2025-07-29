import { Request, Response } from "express";
import { CreateCardInputDTO, DeleteCardInputDTO, ListCardInputDTO, UpdateCardInputDTO } from "../../../application/dto/CardDTO";
import { CardFactory } from "../../factories/CardFactory";
import { CreateCardUsecase } from "../../../application/use_cases/card/CreateCardUsecase";
import { ListCardUsecase } from "../../../application/use_cases/card/ListCardUsecase";
import { DeleteCardUsecase } from "../../../application/use_cases/card/DeleteCardUsecase";
import { UpdateCardUsecase } from "../../../application/use_cases/card/UpdateCardUsecase";

export class CardController {
  private constructor(
    private createCard: CreateCardUsecase, 
    private listCard: ListCardUsecase,
    private deleteCard: DeleteCardUsecase,
    private updateCard: UpdateCardUsecase
  ) {}
  
  public static builder() {
    return new CardController(
      CardFactory.createCreateCardUseCase(), 
      CardFactory.listListAllCardUseCase(), 
      CardFactory.deleteDeleteCardUseCase(), 
      CardFactory.putPutAllCardUseCase()
    )
  }

  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      body.username = req.user.uid

      const dto: CreateCardInputDTO = Object.assign(new CreateCardInputDTO(), body)
      await this.createCard.execute(dto);
      res.status(201).json({ message: "Cartão criado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const dto: ListCardInputDTO = { username: req.user.uid }
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