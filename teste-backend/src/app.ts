import express from "express";
import address from "./routes/address.routes";
import person from "./routes/person.routes";

const app = express();

// Middlewares
app.use(express.json());

const port = process.env.PORT || 4568;

// Rotas
app.use(address);
app.use(person);

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});

// Exporta a aplicação para ser usada no `server.ts`
export default app;
