import { validate } from "class-validator";
import { Usecase } from "../usecase";
import { RegisterInputDTO } from "../../dto/AuthDTO";
import { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export class AuthRegisterUsecase implements Usecase<RegisterInputDTO, void> {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;

  constructor(authRepository: IAuthRepository, userRepository: IUserRepository) {
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  public async execute(input: RegisterInputDTO): Promise<void> {
    try {
      const errors = await validate(input);
      if (errors.length > 0) {
        throw new Error("Todos os campos precisam estar preenchidos.")
      }

      const existingUser = await this.userRepository.findByEmail(input.email)

      if (existingUser) {
        throw new Error("Usuário já cadastrado com esse e-mail.")
      }

      const user = User.create(input.name, input.email, input.salary, input.username, input.password)

      await this.userRepository.save(user)
      await this.authRepository.register(user.email, user.password);
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi criar a conta. Tente novamente');
    }
  }
}
