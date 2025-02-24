import { isNumber } from 'class-validator';
import Database from '../config/database';

class UserService {
  private db = Database.getInstance().getDb();

  public async updateSalary(username: string, salary: number): Promise<{ message: string }> {
    try {
      if (!username.length ) {
        throw new Error('Username não pode ser vazio.');
      }

      if (!isNumber(salary) || salary <= 0) {
        throw new Error('Salário deve ser maior que zero.');
      }

      await this.ensureUserExists(username);
      await this.db.collection('users').updateOne(
        { username },
        { $set: { salary } }
      );
  
      return { message: 'Salário atualizado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async deleteUser(username: string): Promise<{ message: string }> {
    try {
      await this.ensureUserExists(username);
      await this.db.collection('users').deleteOne({ username });

      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  private async ensureUserExists(username: string): Promise<void> {
    const existingUser = await this.db.collection('users').findOne({ username });

    if (!existingUser) {
      throw new Error('Nenhum usuário encontrado.');
    }
  }
}

export default new UserService();