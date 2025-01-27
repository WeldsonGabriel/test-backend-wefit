import express from "express";
import cadastroRoutes from "./routes/cadastro.routes";
import errorHandler from "./middlewares/errorHandler";
import validateRequest from "./middlewares/validateRequest";

const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Middleware de validação global
app.use(validateRequest);

// Rotas
app.use(cadastroRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta a aplicação para ser usada no `server.ts`
export default app;
