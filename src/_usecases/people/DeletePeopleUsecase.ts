import { validate } from "class-validator";
import { IPeopleRepository } from "../../_domain/interfaces/IPeopleRepository";
import { Usecase } from "../usecase";
import { DeletePeopleInputDTO } from "./PeopleDTO";

export class DeletePeopleUsecase implements Usecase<DeletePeopleInputDTO, void> {
  private peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository
  }
 
  public async execute(input: DeletePeopleInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("ID precisa ser enviado.")
    }

    const people = await this.peopleRepository.findById(input.id)

    if (!people) {
      throw new Error("Pessoa não cadastrada.")
    }

    await this.peopleRepository.delete(input.id)
  }
}