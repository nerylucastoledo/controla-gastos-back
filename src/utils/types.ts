export interface IPeopleCreate {
	name: string;
	username: string;
}

export interface IPeopleUpdate {
  _id: string;
  name: string;
}

export interface ICardCreate {
	name: string;
  color: string;
	username: string;
}

export interface IAuthCreate {
	email: string;
	name: string;
	username: string;
	salary: number;
	password: string;
}

export interface IAuthLogin {
	email: string;
	password: string;
}

export interface IExpenseCreate {
	username: string;
	date: string;
	people: string;
	category: string;
	value: string;
	item: string;
	card: string;
	installments: number;
}

export interface IExpenseUpdate {
	_id: string;
	category: string;
	value: string;
	item: string;
}