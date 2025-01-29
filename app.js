require('dotenv').config();

const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const authMiddleware = require('./src/middleware/auth')

const userRoutes = require('./src/routes/userRoute');
const peopleRoutes = require('./src/routes/peopleRoute');
const cardsRoute = require('./src/routes/cardRoute');
const expensesRoute = require('./src/routes/expenseRoute');
const authRoute = require('./src/routes/authRoute');

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', authRoute);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', authMiddleware, peopleRoutes);
app.use('/api', authMiddleware, cardsRoute);
app.use('/api', authMiddleware, expensesRoute);

app.listen(port, () => console.log(`Servidor rodando em http://localhost.com:${port}`));