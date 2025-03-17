import { AuthRepositoryFirebase } from "../database/AuthRepositoryFirebase";
import { UserRepositoryMongo } from "../database/UserRepositoryMongo";
import { AuthLoginUsecase } from "../../application/use_cases/auth/AuthLoginUsercase";
import { AuthLogoutUsecase } from "../../application/use_cases/auth/AuthLogoutUsecase";
import { AuthRegisterUsecase } from "../../application/use_cases/auth/AuthRegisterUsercase";
import { AuthTokenUsecase } from "../../application/use_cases/auth/AuthTokenUsecase";

class AuthFactory {
  private static _authRepository = new AuthRepositoryFirebase();
  private static _userRepository = new UserRepositoryMongo();

  private static getAuthRepository() {
    return this._authRepository;
  }

  private static getUserRepository() {
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

export { AuthFactory };