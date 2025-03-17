import { DeleteUserUsecase } from "../../application/use_cases/user/DeleteUserUsecase";
import { UpdateUserUsecase } from "../../application/use_cases/user/UpdateUserUsecase";
import { UserRepositoryMongo } from "../database/UserRepositoryMongo";

class UserFactory {
  private static _userRepository = new UserRepositoryMongo();

  private static getUserRepository() {
    return this._userRepository;
  }

  static deleteDeleteUserUseCase() {
    return new DeleteUserUsecase(this.getUserRepository());
  }

  static putPutAllUserUseCase() {
    return new UpdateUserUsecase(this.getUserRepository());
  }
}

export { UserFactory };