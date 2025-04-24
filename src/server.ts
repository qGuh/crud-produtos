import 'reflect-metadata';
import express from 'express';
import produtoRoutes from './routes/produtoRoutes';

const app = express();

app.use(express.json());
app.use('/produtos', produtoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
