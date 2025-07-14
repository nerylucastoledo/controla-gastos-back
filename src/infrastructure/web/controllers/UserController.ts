import { Request, Response } from "express";
import { DeleteUserInputDTO, UpdateUserInputDTO } from "../../../application/dto/UserDTO";
import { UserFactory } from "../../factories/UserFactory";
import { DeleteUserUsecase } from "../../../application/use_cases/user/DeleteUserUsecase";
import { UpdateUserUsecase } from "../../../application/use_cases/user/UpdateUserUsecase";

export class UserController {
  private constructor(
    private deleteUser: DeleteUserUsecase,
    private updateUser: UpdateUserUsecase
  ) {}
  
  public static builder() {
    return new UserController(
      UserFactory.deleteDeleteUserUseCase(), 
      UserFactory.putPutAllUserUseCase()
    )
  }

  async delete(req: Request, res: Response) {
    try {
      const dto: DeleteUserInputDTO = { username: req.user.uid }
      await this.deleteUser.execute(dto);
      res.status(200).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdateUserInputDTO = { username: req.user.uid, salary: req.body.salary }
      await this.updateUser.execute(dto);
      res.status(200).json({ message: "Salário atualizado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}