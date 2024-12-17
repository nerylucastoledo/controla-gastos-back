const connectDB = require('../config/database');
var ObjectId = require('mongodb').ObjectId;
const { months } = require("../utils/utils");

const createBodyInstallment = (data) => {
  let body = [];
  const month = data.date.split("20")[0]
  let year = "20" + data.date.split("20")[1]
  const lengthMonth = months.length
  let monthIndex = months.indexOf(month)


  for(let i = 1; i <= data.installments; i++) {
    if (monthIndex === lengthMonth) {
      monthIndex = 0;
      year = Number(year) + 1
    }

    body.push({
      username: data.username, 
      date: `${months[monthIndex]}${year}`, 
      people: data.people, 
      category: data.category, 
      value: data.value, 
      item: `${data.item} ${i} - ${data.installments}`, 
      card: data.card
    })

    monthIndex++;
  }

  return body;
}

class ExpenseService {
	static async createExpense(expenseData) {
		const db = await connectDB();

    try {
      delete expenseData.installments
      await db.collection('bill').insertOne(expenseData);

      return {
        message: 'Gastos cadastrados com sucesso!',
        expense: expenseData
      };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível cadastrar esse gasto');
    }
	}

  static async createExpensesInstallments(expenseData) {
		const db = await connectDB();

    try {
      const newData = createBodyInstallment(expenseData);
      await db.collection('bill').insertMany(newData)

      return {
        message: 'Gasto cadastrado com sucesso!',
        expense: newData
      };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível cadastrar esse gasto');
    }
	}

	static async findDatabyUsernameAndDate(username, date) {
    try {
      const db = await connectDB();
      const expenses = await db.collection("bill").find({ username, date }).toArray();

      if (!expenses.length) {
        throw new Error('Não foi possível encontrar nenhum gasto para este usuário');
      }

      return expenses;

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os gastos');
    }
  }

  static async findDataByUsernameAndYear(username, year) {
    try {
      const db = await connectDB();
      const expenses = await db.collection("bill").find({ 
        username, 
        people: "Eu",
        date: { $regex : year }
      })
      .toArray();

      if (!expenses.length) {
        throw new Error('Não foi possível encontrar nenhum gasto para este ano e usuário');
      }

      return expenses;

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os gastos');
    }
  }

  static async updateExpense(id, category, value, item) {
    const db = await connectDB();

    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingExpense = await db
        .collection('bill')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

        if (!existingExpense) {
          throw new Error('Nenhum gasto encontrado');
        }

      await db.collection('bill').updateOne(
        { _id: newObjectId },
        { $set: {
          category,
          value,
          item
        }}
      );

      return {
        message: 'Gasto atualizado com sucesso!',
        expense: { category, value, item }
      };

    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar o gasto');
    }
  }

  static async deleteExpense(id) {
    const db = await connectDB();
    try {
      const newObjectId = ObjectId.createFromHexString(id)
      const existingExpense = await db
        .collection('bill')
        .find({ _id: newObjectId })
        .toArray();

      if (!existingExpense.length) {
        throw new Error('Nenhum ID encontrado');
      }

      await db.collection('bill').deleteOne({ _id: newObjectId });

      return {
        message: 'Gasto deletado com sucesso!',
      };

    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar esse gasto');
    }
  }
}

module.exports = ExpenseService;