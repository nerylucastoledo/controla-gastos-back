import { Usecase } from "../usecase";
import { IAuthRepository } from "../../_domain/interfaces/IAuthRepository";

export type AuthTokenOutputDTO = {
  token: string;
}

export class AuthTokenUsecase implements Usecase<void, AuthTokenOutputDTO> {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  public async execute(): Promise<AuthTokenOutputDTO> {
    try {
      const token = await this.authRepository.getToken();
      return token
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível obter o token. Tente novamente');
    }
  }
}
