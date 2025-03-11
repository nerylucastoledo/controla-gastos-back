import { UserRepositoryMongo } from "../../_infrastructure/repositories/UserRepositoryMongo";
import { DeleteUserUsecase } from "./DeleteUserUsecase";
import { UpdateUserUsecase } from "./UpdateUserUsecase";

class ProviderUser {
  private static _userRepository = new UserRepositoryMongo();

  static getUserRepository() {
    return this._userRepository;
  }

  static deleteDeleteUserUseCase() {
    return new DeleteUserUsecase(this.getUserRepository());
  }

  static putPutAllUserUseCase() {
    return new UpdateUserUsecase(this.getUserRepository());
  }
}

export { ProviderUser };