import { ObjectId } from "mongodb";
import { IPeopleRepository } from "../../../domain/repositories/IPeopleRepository";
import { Usecase } from "../usecase";
import { ListPeopleInputDTO } from "../../dto/PeopleDTO";

export type ListPeopleOutputDTO = {
  _id: ObjectId;
  name: string;
}

export class ListPeopleUsecase implements Usecase<ListPeopleInputDTO, ListPeopleOutputDTO[]> {
  private peopleRepository: IPeopleRepository

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository
  }

  public async execute(input: ListPeopleInputDTO): Promise<ListPeopleOutputDTO[]> {
    const peoples = await this.peopleRepository.listAll(input.username);
    
    const output = peoples.map(people => {
      return {
        _id: people.id,
        name: people.name,
      }
    })
    
    return output;
  }
}