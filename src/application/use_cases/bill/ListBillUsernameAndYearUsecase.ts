import { Usecase } from "../usecase";
import { IBillRepository } from "../../../domain/repositories/IBillRepository";
import { months, parseCurrencyString } from "../../../utils/utils";
import { ListUsernameAndYearInputDTO } from "../../dto/BillDTO";

export type ListBillOutputDTO = {
  month: string;
  value: number;
}

export class ListBillUsernameAndYearUsecase implements Usecase<ListUsernameAndYearInputDTO, ListBillOutputDTO[]> {
  private billRepository: IBillRepository

  constructor(billRepository: IBillRepository) {
    this.billRepository = billRepository
  }

  public async execute(input: ListUsernameAndYearInputDTO): Promise<ListBillOutputDTO[]> {
    const billList = await this.billRepository.getByUsernameYear(input.username, input.year);

    if (!billList.length) return []

    const groupedBills = this.groupBills(billList);
    const output = this.sortedByMonth(groupedBills);
    
    return output;
  }

  private groupBills(data: any[]): any[] {
    const newData = data.reduce((acc: ListBillOutputDTO[], bill) => {
      let monthName = bill.date.replace(/[0-9]/g, '');
      const value = parseCurrencyString(bill.value);

      if (monthName === "Março") {
        monthName = "Marco";
      }

      const existingMonth = acc.find(item => item.month === monthName);

      if (existingMonth) {
        existingMonth.value += value;
      } else {
        acc.push({
          month: monthName,
          value
        });
      }

      return acc;
    }, []);

    return newData;
  }

  private sortedByMonth(data: any[]): any[] {
    return data.sort((a, b) => {
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
  }
}