require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoute');
const peopleRoutes = require('./src/routes/peopleRoute');
const categorysRoute = require('./src/routes/categoryRoute');
const cardsRoute = require('./src/routes/cardRoute');
const expensesRoute = require('./src/routes/expenseRoute');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', peopleRoutes);
app.use('/api', categorysRoute);
app.use('/api', cardsRoute);
app.use('/api', expensesRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost.com:${port}`);
});