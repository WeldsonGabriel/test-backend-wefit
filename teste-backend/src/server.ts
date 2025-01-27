import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log(`Tentando iniciar o servidor na porta ${PORT}`); // Log de debug

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "desenvolvimento"}`);
  console.log(`API acessível em http://localhost:${PORT}`);
});
