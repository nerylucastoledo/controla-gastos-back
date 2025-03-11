import { validate } from "class-validator";
import { Usecase } from "../usecase";
import { LoginInputDTO } from "./AuthDTO";
import { IAuthRepository } from "../../domain/interfaces/IAuthRepository";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export type LoginOutputDTO = {
  message: string;
  token: string;
  username: string;
  salary: number;
}

export class AuthLoginUsecase implements Usecase<LoginInputDTO, LoginOutputDTO> {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;

  constructor(authRepository: IAuthRepository, userRepository: IUserRepository) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  public async execute(input: LoginInputDTO): Promise<LoginOutputDTO> {
    try {
      const errors = await validate(input);

      if (errors.length > 0) {
        throw new Error("Todos os campos precisam estar preenchidos.")
      }

      const existingUser = await this.userRepository.findByEmail(input.email)

      if (!existingUser) {
        throw new Error("Usuário não cadastrado.")
      }

      const idToken = await this.authRepository.login(input.email, input.password);

      return {
        message: "Acesso liberado. Redirecionando",
        token: idToken,
        username: existingUser.username,
        salary: existingUser.salary,
      };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi acessar a conta. Tente novamente');
    }
  }
}
