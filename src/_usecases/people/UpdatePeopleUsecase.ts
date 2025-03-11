import { validate } from "class-validator";
import { IPeopleRepository } from "../../_domain/interfaces/IPeopleRepository";
import { Usecase } from "../usecase";
import { UpdatePeopleInputDTO } from "./PeopleDTO";

export class UpdatePeopleUsecase implements Usecase<UpdatePeopleInputDTO, void> {
  private peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository
  }

  public async execute(input: UpdatePeopleInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const people = await this.peopleRepository.findById(input._id)

    if (!people) {
      throw new Error("Pessoa não cadastrada.")
    }

    await this.peopleRepository.update(input._id, input.name)
  }
}