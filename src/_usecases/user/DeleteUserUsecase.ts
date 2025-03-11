import { validate } from "class-validator";
import { Usecase } from "../usecase";
import { DeleteUserInputDTO } from "./UserDTO";
import { IUserRepository } from "../../_domain/interfaces/IUserRepository";

export class DeleteUserUsecase implements Usecase<DeleteUserInputDTO, void> {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }
 
  public async execute(input: DeleteUserInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Username precisa ser enviado.")
    }

    const people = await this.userRepository.findByUsername(input.username)

    if (!people) {
      throw new Error("Usuário não cadastrado.")
    }

    await this.userRepository.delete(input.username)
  }
}