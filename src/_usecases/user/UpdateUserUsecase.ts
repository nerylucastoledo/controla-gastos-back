import { validate } from "class-validator";
import { Usecase } from "../usecase";
import { UpdateUserInputDTO } from "./UserDTO";
import { IUserRepository } from "../../_domain/interfaces/IUserRepository";

export class UpdateUserUsecase implements Usecase<UpdateUserInputDTO, void> {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute(input: UpdateUserInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const people = await this.userRepository.findByUsername(input.username)

    if (!people) {
      throw new Error("Usuário não cadastrado.")
    }

    await this.userRepository.update(input.username, input.salary)
  }
}