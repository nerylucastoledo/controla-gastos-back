import { CreateCardUsecase } from "./CreateCardUsecase";
import { DeleteCardUsecase } from "./DeleteCardUsecase";
import { ListCardUsecase } from "./ListCardUsecase";
import { UpdateCardUsecase } from "./UpdateCardUsecase";
import { CardRepositoryMongo } from "../../infrastructure/repositories/CardRepositoryMongo";

class ProviderCard {
  private static _cardRespository = new CardRepositoryMongo();

  static getCardRepository() {
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

export { ProviderCard };