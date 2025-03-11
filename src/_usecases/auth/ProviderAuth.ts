import { AuthRepositoryFirebase } from "../../_infrastructure/repositories/AuthRepositoryFirebase";
import { UserRepositoryMongo } from "../../_infrastructure/repositories/UserRepositoryMongo";
import { AuthLoginUsecase } from "./AuthLoginUsercase";
import { AuthLogoutUsecase } from "./AuthLogoutUsecase";
import { AuthRegisterUsecase } from "./AuthRegisterUsercase";
import { AuthTokenUsecase } from "./AuthTokenUsecase";

class ProviderAuth {
  private static _authRepository = new AuthRepositoryFirebase();
  private static _userRepository = new UserRepositoryMongo();

  static getAuthRepository() {
    return this._authRepository;
  }

  static getUserRepository() {
    return this._userRepository;
  }

  static registerAuthUseCase() {
    return new AuthRegisterUsecase(this.getAuthRepository(), this.getUserRepository());
  }

  static loginAuthUsecase() {
    return new AuthLoginUsecase(this.getAuthRepository(), this.getUserRepository());
  }

  static logoutAuthUsecase() {
    return new AuthLogoutUsecase(this.getAuthRepository());
  }

  static tokenAuthUsecase() {
    return new AuthTokenUsecase(this.getAuthRepository());
  }
}

export { ProviderAuth };