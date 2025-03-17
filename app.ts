import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authMiddleware from './src/middleware/auth';

import { authRoutes } from './src/infrastructure/web/routes/AuthRoutes';
import { cardRoutes } from './src/infrastructure/web/routes/CardRoutes';
import { billRoutes } from './src/infrastructure/web/routes/BillRoutes';
import { peopleRoutes } from './src/infrastructure/web/routes/PeopleRoutes';
import { userRoutes } from './src/infrastructure/web/routes/UserRoutes';

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

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});