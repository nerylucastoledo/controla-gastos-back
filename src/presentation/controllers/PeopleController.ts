import { Request, Response } from "express";
import { CreatePeopleUsecase } from "../../usecases/people/CreatePeopleUsecase";
import { ListPeopleUsecase } from "../../usecases/people/ListPeopleUsecase";
import { DeletePeopleUsecase } from "../../usecases/people/DeletePeopleUsecase";
import { UpdatePeopleUsecase } from "../../usecases/people/UpdatePeopleUsecase";
import { ProviderPeople } from "../../usecases/people/ProviderPeople";
import { CreatePeopleInputDTO, DeletePeopleInputDTO, ListPeopleInputDTO, UpdatePeopleInputDTO } from "../../usecases/people/PeopleDTO";

export class PeopleController {
  private constructor(
    private createPeople: CreatePeopleUsecase, 
    private listPeople: ListPeopleUsecase,
    private deletePeole: DeletePeopleUsecase,
    private updatePeople: UpdatePeopleUsecase
  ) {}
  
  public static builder() {
    return new PeopleController(
      ProviderPeople.createCreatePeopleUseCase(), 
      ProviderPeople.listListAllPeopleUseCase(), 
      ProviderPeople.deleteDeletePeopleUseCase(), 
      ProviderPeople.putPutAllPeopleUseCase()
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
      const dto: ListPeopleInputDTO = Object.assign(new ListPeopleInputDTO(), req.params)
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