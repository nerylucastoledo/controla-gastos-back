import { Bill } from "../entities/Bill"

export interface IBillRepository {
  save(bill: Bill): Promise<void>
  saveWithInstallments(bill: Bill[]): Promise<void>
  findById(id: string): Promise<Bill | null>
  getByUsernameAndDate(username: string, date: string): Promise<Bill[] | []>
  getByUsernameDateCard(username: string, date: string, card: string): Promise<Bill[] | []>
  getByUsernameYear(username: string, year: string): Promise<Bill[] | []>
  delete(id: string): Promise<void>
  update(id: string, category: string, value: string, item: string): Promise<void>
}