import { validate } from "class-validator";
import { IPeopleRepository } from "../../../domain/repositories/IPeopleRepository";
import { Usecase } from "../usecase";
import { CreatePeopleInputDTO } from "../../dto/PeopleDTO";
import { People } from "../../../domain/entities/People";

export class CreatePeopleUsecase implements Usecase<CreatePeopleInputDTO, void> {
  private peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository
  }
 
  public async execute(input: CreatePeopleInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const peopleAlreadyExists = await this.peopleRepository.findByNameAndUsername(input.name, input.username)

    if (peopleAlreadyExists) {
      throw new Error("Pessoa com esse nome já está cadastrado.")
    }

    const people = People.create(input.name, input.username)

    await this.peopleRepository.save(people)
  }
}