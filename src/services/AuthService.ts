import Database from '../config/database';
import { Auth } from '../models/Auth';
import Firebase from '../config/firebase';
import { IAuthCreate, IAuthLogin } from '../utils/types';

const auth = Firebase.getAuthInstance();

class AuthService {
	private db = Database.getInstance().getDb();

  public async registerUser(body: IAuthCreate): Promise<{ message: string }> {

    try {
      const newUser = new Auth(body.email, body.name, body.username, body.salary, body.password);

      const existingUser = await this.db.collection("users").findOne({ email: newUser.email });
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

      const user = await this.db.collection("users").findOne({ email });
      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      return {
        message: "Usuário logado com sucesso!",
        token: idToken,
        username: user.username,
        salary: user.salary,
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
}

export default new AuthService();