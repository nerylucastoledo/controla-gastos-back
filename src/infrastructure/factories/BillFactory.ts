import { CreateBillInstallmentsUsecase } from "../../application/use_cases/bill/CreateBillInstallmentsUsecase";
import { CreateBillUsecase } from "../../application/use_cases/bill/CreateBillUsecase";
import { DeleteBillUsecase } from "../../application/use_cases/bill/DeleteBillUsecase";
import { ListBillUsernameAndYearUsecase } from "../../application/use_cases/bill/ListBillUsernameAndYearUsecase";
import { ListBillUsernameDateCardUsecase } from "../../application/use_cases/bill/ListBillUsernameDateCardUsecase";
import { ListBillUsernameDateUsecase } from "../../application/use_cases/bill/ListBillUsernameDateUsecase";
import { UpdateBillUsecase } from "../../application/use_cases/bill/UpdateBillUsecase";
import { BillRepositoryMongo } from "../database/BillRepositoryMongo";
import { CardRepositoryMongo } from "../database/CardRepositoryMongo";

class BillFactory {
  private static _billRespository = new BillRepositoryMongo();
  private static _cardRespository = new CardRepositoryMongo();

  private static getBillRepository() {
    return this._billRespository;
  }

  private static getCardRepository() {
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

export { BillFactory };