import { User } from "../entities/User"

export interface IUserRepository {
  save(user: User): Promise<void>
  findByUsername(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(username: string): Promise<void>
  update(username: string, salary: number): Promise<void>
}