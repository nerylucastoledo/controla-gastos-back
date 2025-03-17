import { Request, Response } from "express";

import { LoginInputDTO, RegisterInputDTO } from "../../../application/dto/AuthDTO";
import { AuthFactory } from "../../factories/AuthFactory";
import { AuthRegisterUsecase } from "../../../application/use_cases/auth/AuthRegisterUsercase";
import { AuthLoginUsecase } from "../../../application/use_cases/auth/AuthLoginUsercase";
import { AuthLogoutUsecase } from "../../../application/use_cases/auth/AuthLogoutUsecase";
import { AuthTokenUsecase } from "../../../application/use_cases/auth/AuthTokenUsecase";

export class AuthController {
  private constructor(
    private register: AuthRegisterUsecase,
    private login: AuthLoginUsecase,
    private logout: AuthLogoutUsecase,
    private token: AuthTokenUsecase
  ) {}
  
  public static builder() {
    return new AuthController(
      AuthFactory.registerAuthUseCase(), 
      AuthFactory.loginAuthUsecase(),
      AuthFactory.logoutAuthUsecase(),
      AuthFactory.tokenAuthUsecase()
    )
  }

  async authRegister(req: Request, res: Response) {
    try {
      const dto: RegisterInputDTO = Object.assign(new RegisterInputDTO(), req.body)
      await this.register.execute(dto);
      res.status(201).json({ message: "Usuário cadastrado com sucesso." });
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async authLogin(req: Request, res: Response) {
    try {
      const dto: LoginInputDTO = Object.assign(new LoginInputDTO(), req.body)
      const output = await this.login.execute(dto);
      res.status(200).json(output).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async authLogout(req: Request, res: Response) {
    try {
      await this.logout.execute();
      res.status(200).json({}).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async authToken(req: Request, res: Response) {
    try {
      const token = await this.token.execute();
      res.status(200).json(token).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}