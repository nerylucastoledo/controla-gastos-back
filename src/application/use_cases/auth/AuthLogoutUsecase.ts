import { Usecase } from "../usecase";
import { IAuthRepository } from "../../../domain/repositories/IAuthRepository";

export class AuthLogoutUsecase implements Usecase<void, void> {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  public async execute(): Promise<void> {
    try {
      await this.authRepository.logout();
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível desloga. Tente novamente');
    }
  }
}
