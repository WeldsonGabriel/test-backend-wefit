import { Router } from 'express';
import { createCadastro, getAllAddresses, deactivateAddress, getAllPersons, deactivatePerson } from '../controllers/cadastro.controller';

const router = Router();

router.post("/cadastro", createCadastro);

router.get("/cadastro/addresses", getAllAddresses);
router.put("/cadastro/addresses/:id", deactivateAddress);

router.get("/cadastro/persons", getAllPersons);
router.put("/cadastro/persons/:id", deactivatePerson);

export default router;
