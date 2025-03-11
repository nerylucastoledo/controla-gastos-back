import { PeopleRepositoryMongo } from "../../infrastructure/repositories/PeopleRepositoryMongo";
import { CreatePeopleUsecase } from "./CreatePeopleUsecase";
import { DeletePeopleUsecase } from "./DeletePeopleUsecase";
import { ListPeopleUsecase } from "./ListPeopleUsecase";
import { UpdatePeopleUsecase } from "./UpdatePeopleUsecase";

class ProviderPeople {
  private static _peopleRepository = new PeopleRepositoryMongo();

  static getPeopleRepository() {
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

export { ProviderPeople };