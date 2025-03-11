import Firebase from "../../config/firebase";
import { IAuthRepository } from "../../_domain/interfaces/IAuthRepository";

export class AuthRepositoryFirebase implements IAuthRepository {
  public async register(email: string, password: string): Promise<void> {
    await Firebase.registerUser(email, password);
  }

  public async logout(): Promise<void> {
    await Firebase.logoutUser();
  }

  public async getToken(): Promise<{ token: string }> {
    const token = Firebase.getToken();
    return { token: token };
  }

  public async login(email: string, password: string): Promise<string> {
    const idToken = await Firebase.loginUser(email, password);
    return idToken;
  }
}