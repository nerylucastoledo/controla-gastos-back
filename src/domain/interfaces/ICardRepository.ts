import { Card } from "../entities/Card";

export interface ICardRepository {
  save(card: Card): Promise<void>
  findByNameAndUsername(name: string, username: string): Promise<Card | null>
  findById(id: string): Promise<Card | null>
  listAll(username: string): Promise<Card[]>
  delete(id: string): Promise<void>
  update(id: string, name: string, color: string): Promise<void>
}