import { CreatePeopleUsecase } from "../../application/use_cases/people/CreatePeopleUsecase";
import { DeletePeopleUsecase } from "../../application/use_cases/people/DeletePeopleUsecase";
import { ListPeopleUsecase } from "../../application/use_cases/people/ListPeopleUsecase";
import { UpdatePeopleUsecase } from "../../application/use_cases/people/UpdatePeopleUsecase";
import { PeopleRepositoryMongo } from "../database/PeopleRepositoryMongo";

class PeopleFactory {
  private static _peopleRepository = new PeopleRepositoryMongo();

  private static getPeopleRepository() {
    return this._peopleRepository;
  }

  static createCreatePeopleUseCase() {
    return new CreatePeopleUsecase(this.getPeopleRepository());
  }

  static listListAllPeopleUseCase() {
    return new ListPeopleUsecase(this.getPeopleRepository());
  }

  static deleteDeletePeopleUseCase() {
    return new DeletePeopleUsecase(this.getPeopleRepository());
  }

  static putPutAllPeopleUseCase() {
    return new UpdatePeopleUsecase(this.getPeopleRepository());
  }
}

export { PeopleFactory };