import { People } from "../_entities/People"

export interface IPeopleRepository {
  save(people: People): Promise<void>
  findByNameAndUsername(name: string, username: string): Promise<People | null>
  findById(id: string): Promise<People | null>
  listAll(username: string): Promise<People[]>
  delete(id: string): Promise<void>
  update(id: string, name: string): Promise<void>
}