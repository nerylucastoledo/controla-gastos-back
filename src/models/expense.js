const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: String, required: true },
  item: { type: String, required: true },
  value: { type: String, required: true },
  card: { type: String, required: true },
  category: { type: String, required: true },
  people: { type: String, required: true },
});

module.exports = mongoose.model('Expense', expenseSchema);