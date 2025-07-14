import { Request, Response } from "express";
import { CreatePeopleUsecase } from "../../../application/use_cases/people/CreatePeopleUsecase";
import { ListPeopleUsecase } from "../../../application/use_cases/people/ListPeopleUsecase";
import { DeletePeopleUsecase } from "../../../application/use_cases/people/DeletePeopleUsecase";
import { UpdatePeopleUsecase } from "../../../application/use_cases/people/UpdatePeopleUsecase";
import { CreatePeopleInputDTO, DeletePeopleInputDTO, ListPeopleInputDTO, UpdatePeopleInputDTO } from "../../../application/dto/PeopleDTO";
import { PeopleFactory } from "../../factories/PeopleFactory";

export class PeopleController {
  private constructor(
    private createPeople: CreatePeopleUsecase, 
    private listPeople: ListPeopleUsecase,
    private deletePeole: DeletePeopleUsecase,
    private updatePeople: UpdatePeopleUsecase
  ) {}
  
  public static builder() {
    return new PeopleController(
      PeopleFactory.createCreatePeopleUseCase(), 
      PeopleFactory.listListAllPeopleUseCase(), 
      PeopleFactory.deleteDeletePeopleUseCase(), 
      PeopleFactory.putPutAllPeopleUseCase()
    )
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreatePeopleInputDTO = Object.assign(new CreatePeopleInputDTO(), req.body)
      await this.createPeople.execute(dto);
      res.status(201).json({ message: "Pessoa criada com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const dto: ListPeopleInputDTO = { username: req.user.uid }
      const peoples = await this.listPeople.execute(dto);
      res.status(200).json({ data: peoples });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const dto: DeletePeopleInputDTO = Object.assign(new DeletePeopleInputDTO(), req.params)
      await this.deletePeole.execute(dto);
      res.status(200).json({ message: "Pessoa deletada com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdatePeopleInputDTO = Object.assign(new UpdatePeopleInputDTO(), req.body)
      await this.updatePeople.execute(dto);
      res.status(200).json({ message: "Pessoa atualizada com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}