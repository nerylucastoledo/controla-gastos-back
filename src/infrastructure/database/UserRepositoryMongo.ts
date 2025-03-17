import Database from "./index";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class UserRepositoryMongo implements IUserRepository {
  private db = Database.getInstance().getDb();

  public async save(user: User): Promise<void> {
    const data = {
      _id: user.id,
      email: user.email,
      password: user.password,
      salary: user.salary,
      name: user.name,
      username: user.username,
    }

    await this.db
      .collection('users')
      .insertOne(data);
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.db
      .collection('users')
      .findOne({
        $or: [
          { username }, 
        ]
      });

    if (!user) return null

    const newUser = User.with({
      _id: user._id,
      name: user.name,
      email: user.email,
      salary: user.salary,
      username: user.username,
      password: user.password
    })

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.db
      .collection('users')
      .findOne({
        $or: [
          { email }, 
        ]
      });

    if (!user) return null

    const newUser = User.with({
      _id: user._id,
      name: user.name,
      email: user.email,
      salary: user.salary,
      username: user.username,
      password: user.password
    })

    return newUser;
  }

  async delete(username: string): Promise<void> {
    await this.db
      .collection('users')
      .deleteOne({ username });
  }

  async update(username: string, salary: number): Promise<void> {
    await this.db
      .collection('users')
      .updateOne(
      { username },
      { $set: { salary } }
    );
  }
}