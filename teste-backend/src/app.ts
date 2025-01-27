import express from "express";
import path from "path";
import cors from "cors";
import cadastroRoutes from "./routes/cadastro.routes";
import errorHandler from "./middlewares/errorHandler";
import validateRequest from "./middlewares/validateRequest";

const app = express();

// Middleware para CORS (permitindo acesso do front-end)
app.use(cors({ origin: "http://127.0.0.1:5500/src/view/" }));

// Middleware para analisar JSON
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../view")));

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
