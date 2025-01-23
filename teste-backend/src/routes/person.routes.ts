import { Router } from 'express';

const router = Router();

router.get("/person", (req, res) => {
  // Lógica para obter pessoas
  res.send("Lista de pessoas");
});

router.post("/person", (req, res) => {
  // Lógica para criar uma nova pessoa
  res.send("Pessoa criada");
});

export default router;
