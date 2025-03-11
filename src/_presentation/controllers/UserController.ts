import { Request, Response } from "express";
import { DeleteUserUsecase } from "../../_usecases/user/DeleteUserUsecase";
import { ProviderUser } from "../../_usecases/user/ProviderUser";
import { UpdateUserUsecase } from "../../_usecases/user/UpdateUserUsecase";
import { DeleteUserInputDTO, UpdateUserInputDTO } from "../../_usecases/user/UserDTO";

export class UserController {
  private constructor(
    private deleteUser: DeleteUserUsecase,
    private updateUser: UpdateUserUsecase
  ) {}
  
  public static builder() {
    return new UserController(
      ProviderUser.deleteDeleteUserUseCase(), 
      ProviderUser.putPutAllUserUseCase()
    )
  }

  async delete(req: Request, res: Response) {
    try {
      const dto: DeleteUserInputDTO = Object.assign(new DeleteUserInputDTO(), req.params)
      await this.deleteUser.execute(dto);
      res.status(200).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdateUserInputDTO = Object.assign(new UpdateUserInputDTO(), req.body)
      await this.updateUser.execute(dto);
      res.status(200).json({ message: "Salário atualizado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}