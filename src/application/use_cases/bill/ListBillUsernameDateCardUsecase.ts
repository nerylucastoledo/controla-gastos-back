import { Usecase } from "../usecase";
import { IBillRepository } from "../../../domain/repositories/IBillRepository";
import { parseCurrencyString } from "../../../utils/utils";
import { ListUsernameDateCardInputDTO } from "../../dto/BillDTO";

export type ListBillOutputDTO = {
  name: string;
  invoices: {
    _id: string;
    item: string;
    value: string;
    category: string
  }
}

export class ListBillUsernameDateCardUsecase implements Usecase<ListUsernameDateCardInputDTO, ListBillOutputDTO[]> {
  private billRepository: IBillRepository

  constructor(billRepository: IBillRepository) {
    this.billRepository = billRepository
  }

  public async execute(input: ListUsernameDateCardInputDTO): Promise<ListBillOutputDTO[]> {
    const billList = await this.billRepository.getByUsernameDateCard(input.username, input.date, input.card);
    const transformedData = this.transformBillData(billList);
    
    return transformedData;
  }

  private transformBillData(bills: any[]): any[] {
    const groupedData = bills.reduce((acc, bill) => {
      const { people, item, value, id, category } = bill;
      const valueNumber = parseCurrencyString(value);

      if (!acc[people]) {
        acc[people] = {
          name: people,
          invoices: [],
          totalInvoice: 0,
        };
      }

      acc[people].invoices.push({ _id: id, item, value, category });
      acc[people].totalInvoice += valueNumber;

      return acc;
    }, {});

    return Object.values(groupedData);
  }
}