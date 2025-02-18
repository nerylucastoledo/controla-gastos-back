import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authMiddleware from './src/middleware/auth';
import userRoutes from './src/routes/UserRoute';
import peopleRoutes from './src/routes/PeopleRoute';
import cardsRoute from './src/routes/CardRoute';
import expensesRoute from './src/routes/ExpenseRoute';
import authRoute from './src/routes/AuthRoute';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: ['https://lucas-controla-gastos.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', authRoute);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', authMiddleware, peopleRoutes);
app.use('/api', authMiddleware, cardsRoute);
app.use('/api', authMiddleware, expensesRoute);

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});