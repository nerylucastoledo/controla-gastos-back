import Database from '../config/database';
import { Auth } from '../models/Auth';
import Firebase from '../config/firebase';
import { IAuthCreate, IAuthLogin } from '../utils/types';
import { validateEntity } from '../utils/Validator';

const auth = Firebase.getAuthInstance();

class AuthService {
	private db = Database.getInstance().getDb();

  public async registerUser(body: IAuthCreate): Promise<{ message: string }> {

    try {
      const newUser = new Auth(body.email, body.name, body.username, body.salary, body.password);
      const validationErrors = await validateEntity(newUser);

      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }

      const existingUser = await this.existingUser(newUser.email)

      if (existingUser) {
        throw new Error('Email já está em uso.');
      }

      await this.db.collection('users').insertOne(newUser.toJson());
      await Firebase.registerUser(newUser.email, newUser.password);

      return { message: 'Usuário criado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível cadastrar esse usuário.');
    }
  }

  public async loginUser(body: IAuthLogin): Promise<{ message: string, token: string, username: string, salary: number }> {
    try {
      const { email, password } = body;

      const idToken = await Firebase.loginUser(email, password);

      const existingUser = await this.existingUser(email)

      if (!existingUser) {
        throw new Error("Usuário não encontrado.");
      }

      return {
        message: "Usuário logado com sucesso!",
        token: idToken,
        username: existingUser.username,
        salary: existingUser.salary,
      };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi acessar a conta. Tente novamente');
    }
  }

  public async logoutUser(): Promise<{ message: string }> {
    try {
      await Firebase.logoutUser();
      return { message: 'Usuário deslogado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro interno');
    }
  }

  public async token(): Promise<{ token: any }> {
    try {
      const token = Firebase.getToken();
      return { token: token };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro interno');
    }
  }

  private existingUser = async (email: string) => {
    const cards = await this.db
      .collection('users')
      .findOne({
        $or: [
          { name: email }, 
        ]
      });

    return cards;
  }
}

export default new AuthService();