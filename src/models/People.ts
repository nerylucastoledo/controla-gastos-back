export class People {
  private readonly _name: string;
  private readonly _username: string;

  constructor(name: string, username: string) {
    this.validateName(name);
    this.validateUsername(username);

    this._name = name;
    this._username = username;
  }

  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }

  public toJson(): object {
    return {
      name: this.name,
      username: this.username,
    };
  }

  private validateName(name: string): void {
    if (!name || name.length < 3) {
      throw new Error('O nome deve ter pelo menos 3 letras.');
    }
  }

  private validateUsername(username: string): void {
    if (!username || username.trim().length === 0) {
      throw new Error('O nome de usuário não pode ser vazio.');
    }
  }
}