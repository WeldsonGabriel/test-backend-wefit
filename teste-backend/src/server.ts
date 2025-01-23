import app from "./app";

const port = process.env.PORT || 4568;

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
