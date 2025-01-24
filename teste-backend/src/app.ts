import express from "express";
import cadastroRoutes from "./routes/cadastro.routes";
import errorHandler from "./middlewares/errorHandler";
import validateRequest from "./middlewares/validateRequest";

const app = express();

// Middlewares globais
app.use(express.json());
app.use(validateRequest);

// Rotas principais
app.use("/api/cadastro", cadastroRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporta a aplicação para ser usada no `server.ts`
export default app;
