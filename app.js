require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoute');
const peopleRoutes = require('./src/routes/peoplesRoute');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', peopleRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost.com:${port}`);
});