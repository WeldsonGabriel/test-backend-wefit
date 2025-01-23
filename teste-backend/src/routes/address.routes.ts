import { Router } from 'express';

const router = Router();

router.get("/address", (req, res) => {
  // Lógica para obter endereços
  res.send("Lista de endereços");
});

router.post("/address", (req, res) => {
  // Lógica para criar um novo endereço
  res.send("Endereço criado");
});

export default router;
