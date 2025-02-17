import Database from '../config/database';
import { Bill } from '../models/Bill';
import { ObjectId } from 'mongodb';
import { IExpenseCreate, IExpenseUpdate } from '../utils/types';
import { parseCurrencyString, validateFields } from '../utils/utils';
import { months } from '../utils/utils';

interface Expense {
  month: string;
  value: number;
}

class ExpenseService {
  private db = Database.getInstance().getDb();

  public async createExpense(body: IExpenseCreate): Promise<{ message: string }> {
    try {
      const newExpense = new Bill(body.username, body.date, body.people, body.category, body.value, body.item, body.card);

      await this.db.collection('bill').insertOne(newExpense.toJson());
      return { message: 'Gasto cadastrado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível cadastrar esse gasto.');
    }
  }

  public async createExpensesInstallments(body: IExpenseCreate): Promise<{ message: string }> {
    try {
      const newExpense = new Bill(body.username, body.date, body.people, body.category, body.value, body.item, body.card);

      const installmentsData = this.createBodyInstallment(newExpense);
      await this.db.collection('bill').insertMany(installmentsData);

      return { message: 'Gastos cadastrados com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Não foi possível cadastrar esses gastos.');
    }
  }

  public async findDatabyUsernameAndDate(username: string, date: string): Promise<{ data: any[] }> {
    try {
      const expenses = await this.db.collection("bill").find({ username, date }).toArray();
      return { data: expenses };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro ao buscar os gastos.');
    }
  }

  public async findDataByUsernameDateAndCard(username: string, date: string, card: string): Promise<{ data: any[] }> {
    try {
      const expenses = await this.db.collection("bill").find({ username, date, card }).toArray();
      const transformedData = this.transformExpensesData(expenses);
      return { data: transformedData };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro ao buscar os gastos.');
    }
  }

  public async findDataByUsernameAndYear(username: string, year: string): Promise<{ data: any[] }> {
    try {
      const expenses = await this.db.collection("bill").find({ 
          username, 
          people: "Eu",
          date: { $regex : year }
        }).toArray();

      if (!expenses.length) return { data: expenses };

      const groupedExpenses = this.groupExpenses(expenses);
      const sortedData = this.sortedByMonth(groupedExpenses);

      return { data: sortedData };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro ao buscar os gastos');
    }
  }

  public async updateExpense(body: IExpenseUpdate): Promise<{ message: string }> {
    try {
      const { _id, category, value, item } = body;

      if (!validateFields(_id)) {
        throw new Error('ID não pode ser vazio.');
      }

      const newObjectId = new ObjectId(_id);
      const existingExpense = await this.db.collection('bill').findOne({ _id: newObjectId });

      if (!existingExpense) {
        throw new Error('Nenhum gasto encontrado.');
      }

      const updatedExpense = new Bill(existingExpense.username, existingExpense.date, existingExpense.people, category, value, item, existingExpense.card);
      await this.db.collection('bill').updateOne(
        { _id: newObjectId },
        { $set: updatedExpense.toJson() }
      );

      return { message: 'Gasto atualizado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Ocorreu um erro ao atualizar o gasto.');
    }
  }

  public async deleteExpense(id: string): Promise<{ message: string }> {
    try {
      const newObjectId = new ObjectId(id);
      const existingExpense = await this.db.collection('bill').findOne({ _id: newObjectId });

      if (!existingExpense) {
        throw new Error('Nenhum gasto encontrado com esse ID.');
      }

      await this.db.collection('bill').deleteOne({ _id: newObjectId });
      return { message: 'Gasto deletado com sucesso.' };
    } catch (error) {
      throw new Error((error as Error).message || 'Erro ao deletar esse gasto.');
    }
  }

  private transformExpensesData(expenses: any[]): any[] {
    const groupedData = expenses.reduce((acc, expense) => {
      const { people, item, value, _id, category } = expense;
      const valueNumber = parseCurrencyString(value);

      if (!acc[people]) {
        acc[people] = {
          name: people,
          invoices: [],
          totalInvoice: 0,
        };
      }

      acc[people].invoices.push({ item, value, _id, category });
      acc[people].totalInvoice += valueNumber;

      return acc;
    }, {});

    return Object.values(groupedData);
  }

  private createBodyInstallment(bill: IExpenseCreate): IExpenseCreate[] {
    const lengthMonth = months.length;
    const month = bill.date.split("20")[0];
    let monthIndex = months.indexOf(month);
    let year = "20" + bill.date.split("20")[1];

    let body: any[] = [];

    if (bill.installments) {
      for (let i = 1; i <= bill.installments; i++) {
        if (monthIndex === lengthMonth) {
          monthIndex = 0;
          year = (Number(year) + 1).toString();
        }

        body.push({
          username: bill.username,
          date: `${months[monthIndex]}${year}`,
          people: bill.people,
          category: bill.category,
          value: bill.value,
          item: `${bill.item} ${i} - ${bill.installments}`,
          card: bill.card
        });

        monthIndex++;
      }
    }

    return body;
  }

  private sortedByMonth(data: any[]): any[] {
    return data.sort((a, b) => {
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
  }

  private groupExpenses(data: any[]): any[] {
    const newData = data.reduce((acc: Expense[], expense) => {
      let monthName = expense.date.replace(/[0-9]/g, '');
      const value = parseCurrencyString(expense.value);

      if (monthName === "Março") {
        monthName = "Marco";
      }

      const existingMonth = acc.find(item => item.month === monthName);

      if (existingMonth) {
        existingMonth.value += value;
      } else {
        acc.push({
          month: monthName,
          value
        });
      }

      return acc;
    }, []);

    return newData;
  }
}

export default new ExpenseService();