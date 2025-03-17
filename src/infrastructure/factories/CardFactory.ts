import { CreateCardUsecase } from "../../application/use_cases/card/CreateCardUsecase";
import { DeleteCardUsecase } from "../../application/use_cases/card/DeleteCardUsecase";
import { ListCardUsecase } from "../../application/use_cases/card/ListCardUsecase";
import { UpdateCardUsecase } from "../../application/use_cases/card/UpdateCardUsecase";
import { CardRepositoryMongo } from "../database/CardRepositoryMongo";

class CardFactory {
  private static _cardRespository = new CardRepositoryMongo();

  private static getCardRepository() {
    return this._cardRespository;
  }

  static createCreateCardUseCase() {
    return new CreateCardUsecase(this.getCardRepository());
  }

  static listListAllCardUseCase() {
    return new ListCardUsecase(this.getCardRepository());
  }

  static deleteDeleteCardUseCase() {
    return new DeleteCardUsecase(this.getCardRepository());
  }

  static putPutAllCardUseCase() {
    return new UpdateCardUsecase(this.getCardRepository());
  }
}

export { CardFactory };