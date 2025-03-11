import { Request, Response } from "express";
import { CreateBillUsecase } from "../../_usecases/bill/CreateBillUsecase";
import { CreateBillInstallmentsUsecase } from "../../_usecases/bill/CreateBillInstallmentsUsecase";
import { ListBillUsernameAndYearUsecase } from "../../_usecases/bill/ListBillUsernameAndYearUsecase";
import { ListBillUsernameDateUsecase } from "../../_usecases/bill/ListBillUsernameDateUsecase";
import { ListBillUsernameDateCardUsecase } from "../../_usecases/bill/ListBillUsernameDateCardUsecase";
import { DeleteBillUsecase } from "../../_usecases/bill/DeleteBillUsecase";
import { UpdateBillUsecase } from "../../_usecases/bill/UpdateBillUsecase";
import { ProviderBill } from "../../_usecases/bill/ProviderBill";
import { CreateBillInputDTO, DeleteBillInputDTO, ListUsernameAndYearInputDTO, ListUsernameDateCardInputDTO, ListUsernameDateInputDTO, UpdateBillInputDTO } from "../../_usecases/bill/BillDTO";

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
      ProviderBill.createCreateBillUseCase(), 
      ProviderBill.createCreateBillInstallmentsUsecase(), 
      ProviderBill.listListBillUsernameAndYearUsecase(), 
      ProviderBill.listListBillUsernameDateUsecase(),
      ProviderBill.listListBillUsernameDateCardUsecase(),
      ProviderBill.deleteDeleteBill(),
      ProviderBill.putUpdateBill()
    )
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateBillInputDTO = Object.assign(new CreateBillInputDTO(), req.body)
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
      const dto: ListUsernameAndYearInputDTO = Object.assign(new ListUsernameAndYearInputDTO(), req.params)
      const bills = await this.listUsernameAndYear.execute(dto);
      res.status(200).json({ data: bills });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async findDatabyUsernameAndDate(req: Request, res: Response) {
    try {
      const dto: ListUsernameDateInputDTO = Object.assign(new ListUsernameDateInputDTO(), req.params)
      const bills = await this.listUsernameDate.execute(dto);
      res.status(200).json({ data: bills });
    } catch(err) {
      res.status(400).json(err);
    }
  }

  async findDataByUsernameDateAndCard(req: Request, res: Response) {
    try {
      const dto: ListUsernameDateCardInputDTO = Object.assign(new ListUsernameDateCardInputDTO(), req.params)
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