import express from "express";
import cadastro from "./routes/cadastro.routes";
import errorHandler from "./middlewares/errorHandler";
import validateRequest from "./middlewares/validateRequest";

const app = express();

// Middlewares
app.use(express.json());
app.use(validateRequest);

// Rotas
app.use(cadastro);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta a aplicação para ser usada no `server.ts`
export default app;
