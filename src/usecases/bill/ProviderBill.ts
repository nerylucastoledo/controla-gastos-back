import { BillRepositoryMongo } from "../../infrastructure/repositories/BillRepositoryMongo";
import { CardRepositoryMongo } from "../../infrastructure/repositories/CardRepositoryMongo";
import { CreateBillInstallmentsUsecase } from "./CreateBillInstallmentsUsecase";
import { CreateBillUsecase } from "./CreateBillUsecase";
import { DeleteBillUsecase } from "./DeleteBillUsecase";
import { ListBillUsernameAndYearUsecase } from "./ListBillUsernameAndYearUsecase";
import { ListBillUsernameDateCardUsecase } from "./ListBillUsernameDateCardUsecase";
import { ListBillUsernameDateUsecase } from "./ListBillUsernameDateUsecase";
import { UpdateBillUsecase } from "./UpdateBillUsecase";

class ProviderBill {
  private static _billRespository = new BillRepositoryMongo();
  private static _cardRespository = new CardRepositoryMongo();

  static getBillRepository() {
    return this._billRespository;
  }

  static getCardRepository() {
    return this._cardRespository;
  }

  static createCreateBillUseCase() {
    return new CreateBillUsecase(this.getBillRepository());
  }

  static createCreateBillInstallmentsUsecase() {
    return new CreateBillInstallmentsUsecase(this.getBillRepository());
  }

  static listListBillUsernameAndYearUsecase() {
    return new ListBillUsernameAndYearUsecase(this.getBillRepository());
  }

  static listListBillUsernameDateUsecase() {
    return new ListBillUsernameDateUsecase(this.getBillRepository(), this.getCardRepository());
  }

  static listListBillUsernameDateCardUsecase() {
    return new ListBillUsernameDateCardUsecase(this.getBillRepository());
  }

  static deleteDeleteBill() {
    return new DeleteBillUsecase(this.getBillRepository());
  }

  static putUpdateBill() {
    return new UpdateBillUsecase(this.getBillRepository());
  }
}

export { ProviderBill };