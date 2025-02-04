const connectDB = require('../config/database');
var ObjectId = require('mongodb').ObjectId;
const { months, parseCurrencyString, validateFields } = require("../utils/utils");

function transformExpensesData(expenses) {
  const groupedData = expenses.reduce((acc, expense) => {
    const { people, item, value, _id, category } = expense;
    const valueNumber = parseCurrencyString(value)

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
};


const createBodyInstallment = (data) => {
  const lengthMonth = months.length
  const month = data.date.split("20")[0]
  let monthIndex = months.indexOf(month)
  let year = "20" + data.date.split("20")[1]
  
  let body = [];
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

const validateExpense = (body) => {
  const { username, date, people, category, value, item, card, installments } = body;

  if (!validateFields(username)) {
    return 'Username não pode ser vazio.';
  }

  if (!validateFields(date)) {
    return 'Data não pode ser vazia.';
  }

  if (!validateFields(people)) {
    return 'Pessoa não pode ser vazia.';
  }
  
  if (!validateFields(category)) {
    return 'Categoria não pode ser vazia.';
  }

  if (!validateFields(value)) {
    return 'Valor não pode ser vazio.';
  }

  if (!validateFields(item)) {
   return 'Item não pode ser vazio.';
  }

  if (!validateFields(card)) {
    return 'Cartão não pode ser vazio.';
  }

  if (installments < 1) {
    return 'Quantidade de parcela não pode ser 0.';
  }

  return false;
}

const sortedByMonth = (data) => {
  return data.sort((a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  });
}

const groupExpenses = (data) => {
  const newData =  data.reduce((acc, expense) => {
    let monthName = expense.date.replace(/[0-9]/g, '');
    const value = parseCurrencyString(expense.value);

    if (monthName === "Março") {
      monthName = "Marco"
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

class ExpenseService {
	static async createExpense(body) {
		const db = await connectDB();

    try {
      const hasInvalidData = validateExpense(body)

      if (hasInvalidData) {
        throw new Error(hasInvalidData);
      }

      delete body.installments
      await db
        .collection('bill')
        .insertOne(body);

      
      return { message: 'Gasto cadastrado com sucesso.' };

    } catch (error) {
      throw new Error(error.message || 'Não foi possível cadastrar esse gasto.');
    }
	}

  static async createExpensesInstallments(body) {
		const db = await connectDB();

    try {
      const hasInvalidData = validateExpense(body)

      if (hasInvalidData) {
        throw new Error(hasInvalidData);
      }

      const newData = createBodyInstallment(body);
      await db
        .collection('bill')
        .insertMany(newData);

      return { message: 'Gasto cadastrado com sucesso.' };
    } catch (error) {
      throw new Error(error.message || 'Não foi possível cadastrar esse gasto.');
    }
	}

	static async findDatabyUsernameAndDate(username, date) {
    const db = await connectDB();
    
    try {
      const expenses = await db
        .collection("bill")
        .find({ username, date })
        .toArray();

      return { data: expenses };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os gastos.');
    }
  }

  static async findDataByUsernameDateAndCard({ username, date, card }) {
    const db = await connectDB();

    try {
      const expenses = await db
        .collection("bill")
        .find({ username, date, card })
        .toArray();

      const transformedData = transformExpensesData(expenses);
      return { data: transformedData };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os gastos.');
    }
  }

  static async findDataByUsernameAndYear({ username, year }) {
    const db = await connectDB();

    try {
      const expenses = await db.
        collection("bill")
        .find({ 
          username, 
          people: "Eu",
          date: { $regex : year }
        })
        .toArray();

      if (!expenses.length) return { data: expenses };

      const groupedExpenses = groupExpenses(expenses)
      const sortedData = sortedByMonth(groupedExpenses)

      return { data: sortedData };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao buscar os gastos');
    }
  }

  static async updateExpense(body) {
    const db = await connectDB();

    try {
      const { _id, category, value, item } = body;

      if (!validateFields(_id)) {
        throw new Error('ID não pode ser vazio.');
      }

      if (!validateFields(category)) {
       throw new Error('Categoria não pode ser vazia.');
      }

      if (!validateFields(value)) {
        throw new Error('Valor não pode ser vazio.');
      }

      if (!validateFields(item)) {
        throw new Error('Item não pode ser vazio.');
      }

      const newObjectId = ObjectId.createFromHexString(_id)
      const existingExpense = await db
        .collection('bill')
        .findOne({
          $or: [ { _id: newObjectId } ]
        })

        if (!existingExpense) {
          throw new Error('Nenhum gasto encontrado.');
        }

      await db
        .collection('bill')
        .updateOne(
          { _id: newObjectId },
          { $set: {
            category,
            value,
            item
          }}
        );

      return { message: 'Gasto atualizado com sucesso.' };
    } catch (error) {
      throw new Error(error.message || 'Ocorreu um erro ao atualizar o gasto.');
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
        throw new Error('Nenhum ID encontrado.');
      }

      await db
        .collection('bill')
        .deleteOne({ _id: newObjectId });

      return { message: 'Gasto deletado com sucesso.' };
    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar esse gasto.');
    }
  }
}

module.exports = ExpenseService;