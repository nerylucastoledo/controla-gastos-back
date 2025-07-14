export interface IAuthRepository {
  register(email: string, password: string): Promise<void>
  login(email: string, password: string, username: string): Promise<string>
  logout(): Promise<void>
  getToken(): Promise<{ token: string }>
}