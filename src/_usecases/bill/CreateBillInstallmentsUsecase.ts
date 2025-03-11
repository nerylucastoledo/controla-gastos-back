import { validate } from "class-validator";
import { IBillRepository } from "../../_domain/interfaces/IBillRepository";
import { Usecase } from "../usecase";
import { CreateBillInputDTO } from "./BillDTO";
import { Bill } from "../../_domain/_entities/Bill";
import { months } from "../../utils/utils";

export class CreateBillInstallmentsUsecase implements Usecase<CreateBillInputDTO, void> {
  private billRepository: IBillRepository;

  constructor(billRepository: IBillRepository) {
    this.billRepository = billRepository
  }
 
  public async execute(input: CreateBillInputDTO): Promise<void> {
    const errors = await validate(input);

    if (errors.length > 0) {
      throw new Error("Todos os campos precisam estar preenchidos.")
    }

    const billList = this.createBodyInstallment(input);
    await this.billRepository.saveWithInstallments(billList)
  }

  private createBodyInstallment(bill: CreateBillInputDTO): Bill[] {
      const lengthMonth = months.length;
      const month = bill.date.split("20")[0];
      let monthIndex = months.indexOf(month);
      let year = "20" + bill.date.split("20")[1];
  
      let body: Bill[] = [];
  
      if (bill.installments) {
        for (let i = 1; i <= bill.installments; i++) {
          if (monthIndex === lengthMonth) {
            monthIndex = 0;
            year = (Number(year) + 1).toString();
          }

          const newBill = Bill.create(
            bill.username,
            `${months[monthIndex]}${year}`,
            bill.people,
            bill.category,
            bill.value, `${bill.item} ${i} - ${bill.installments}`,
            bill.card
          )
  
          body.push(newBill);
  
          monthIndex++;
        }
      }
  
      return body;
    }
}