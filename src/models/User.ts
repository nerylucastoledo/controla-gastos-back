import { validateSalary } from "../utils/utils";

export class User {
  private _email: string;
  private _name: string;
  private _username: string;
  private _salary: number;

  constructor(email: string, name: string, username: string, salary: number) {
    this.validateEmail(email);
    this.validateName(name);
    this.validateUsername(username);
    validateSalary(salary);

    this._email = email;
    this._name = name;
    this._username = username;
    this._salary = salary;
  }

  get getEmail(): string {
    return this._email;
  }

  get getName(): string {
    return this._name;
  }

  get getUsername(): string {
    return this._username;
  }

  get getSalary(): number {
    return this._salary;
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
      throw new Error('O username não pode ser vazio.');
    }
  }

  public toJson(): object {
    return {
      email: this.getEmail,
      name: this.getName,
      username: this.getUsername,
      salary: this.getSalary,
    };
  }
}