import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorHandler } from './src/infrastructure/middleware/errorHandler';
import authMiddleware from './src/infrastructure/middleware/auth';

import { authRoutes } from './src/presentation/routes/AuthRoutes';
import { cardRoutes } from './src/presentation/routes/CardRoutes';
import { billRoutes } from './src/presentation/routes/BillRoutes';
import { peopleRoutes } from './src/presentation/routes/PeopleRoutes';
import { userRoutes } from './src/presentation/routes/UserRoutes';

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(cors({
  origin: ['https://controla-gastos-back.vercel.app', 'http://localhost:3000'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', authMiddleware, peopleRoutes);
app.use('/api', authMiddleware, cardRoutes);
app.use('/api', authMiddleware, billRoutes);
app.use(errorHandler);

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});