export class Auth {
  private readonly _email: string;
  private readonly _name: string;
  private readonly _username: string;
  private readonly _salary: number;
  private readonly _password: string;

  constructor(email: string, name: string, username: string, salary: number, password: string) {
    this.validateEmail(email);
    this.validateName(name);
    this.validateUsername(username);
    this.validateSalary(salary);
    this.validatePassword(password);

    this._email = email;
    this._name = name;
    this._username = username;
    this._salary = salary;
    this._password = password;
  }

  public get email(): string {
    return this._email;
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }

  public get salary(): number {
    return this._salary;
  }

  public get password(): string {
    return this._password;
  }

  public toJson(): object {
    return {
      email: this.email,
      name: this.name,
      username: this.username,
      salary: this.salary,
      passwrod: this.password
    };
  }

  private validateEmail(email: string): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new Error('Email inválido.');
    }
  }

  private validateName(name: string): void {
    if (name.length < 3) {
      throw new Error('O nome deve ter pelo menos 3 letras.');
    }
  }

  private validateUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('O nome de usuário não pode ser vazio.');
    }
  }

  private validateSalary(salary: number): void {
    if (salary < 0) {
      throw new Error('Salário não pode ser negativo.');
    }
  }

  private validatePassword(password: string): void {
    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }
  }
}