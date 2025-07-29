import { Request, Response } from "express";
import { CreateBillInputDTO, DeleteBillInputDTO, ListUsernameAndYearInputDTO, ListUsernameDateCardInputDTO, ListUsernameDateInputDTO, UpdateBillInputDTO } from "../../../application/dto/BillDTO";
import { BillFactory } from "../../factories/BillFactory";
import { CreateBillUsecase } from "../../../application/use_cases/bill/CreateBillUsecase";
import { CreateBillInstallmentsUsecase } from "../../../application/use_cases/bill/CreateBillInstallmentsUsecase";
import { ListBillUsernameAndYearUsecase } from "../../../application/use_cases/bill/ListBillUsernameAndYearUsecase";
import { ListBillUsernameDateUsecase } from "../../../application/use_cases/bill/ListBillUsernameDateUsecase";
import { ListBillUsernameDateCardUsecase } from "../../../application/use_cases/bill/ListBillUsernameDateCardUsecase";
import { DeleteBillUsecase } from "../../../application/use_cases/bill/DeleteBillUsecase";
import { UpdateBillUsecase } from "../../../application/use_cases/bill/UpdateBillUsecase";

export class BillController {
  private constructor(
    private createBill: CreateBillUsecase, 
    private createBillInstallments: CreateBillInstallmentsUsecase,
    private listUsernameAndYear: ListBillUsernameAndYearUsecase,
    private listUsernameDate: ListBillUsernameDateUsecase,
    private listUsernameDateCard: ListBillUsernameDateCardUsecase,
    private deleteBill: DeleteBillUsecase,
    private updateBill: UpdateBillUsecase
  ) {}
  
  public static builder() {
    return new BillController(
      BillFactory.createCreateBillUseCase(), 
      BillFactory.createCreateBillInstallmentsUsecase(), 
      BillFactory.listListBillUsernameAndYearUsecase(), 
      BillFactory.listListBillUsernameDateUsecase(),
      BillFactory.listListBillUsernameDateCardUsecase(),
      BillFactory.deleteDeleteBill(),
      BillFactory.putUpdateBill()
    )
  }

  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      body.username = req.user.uid

      const dto: CreateBillInputDTO = Object.assign(new CreateBillInputDTO(), body)
      if (dto.installments > 1) {
        await this.createBillInstallments.execute(dto);
        
        res.status(201).json({ message: "Gastos criado com sucesso." }).send();
        return;
      }
      
      await this.createBill.execute(dto);
      res.status(201).json({ message: "Gasto criado com sucesso." }).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async findByusernameAndYear(req: Request, res: Response) {
    try {
      const dto: ListUsernameAndYearInputDTO = { username: req.user.uid, year: req.params.year }
      const bills = await this.listUsernameAndYear.execute(dto);
      res.status(200).json({ data: bills });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async findDatabyUsernameAndDate(req: Request, res: Response) {
    try {
      const dto: ListUsernameDateInputDTO = { username: req.user.uid, date: req.params.date }
      const bills = await this.listUsernameDate.execute(dto);
      res.status(200).json({ data: bills });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async findDataByUsernameDateAndCard(req: Request, res: Response) {
    try {
      const dto: ListUsernameDateCardInputDTO = { username: req.user.uid, date: req.params.date, card: req.params.card }
      const bills = await this.listUsernameDateCard.execute(dto);
      res.status(200).json({ data: bills });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const dto: DeleteBillInputDTO = Object.assign(new DeleteBillInputDTO(), req.params)
      await this.deleteBill.execute(dto);
      res.status(200).json({ message: "Gasto deletado com sucesso."}).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdateBillInputDTO = Object.assign(new UpdateBillInputDTO(), req.body)
      await this.updateBill.execute(dto);
      res.status(200).json({ message: "Gasto atualizado com sucesso."}).send();
    } catch(err) {
      res.status(400).json({ message: (err as Error).message });
    }
  }
}