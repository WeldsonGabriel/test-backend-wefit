import { Router } from 'express';
import { createCadastro, getAllAddresses, deactivateAddress, getAllPersons, deactivatePerson, getPersonById, getAddressById, updateCadastro } from '../controllers/cadastro.controller';
import validateRequest from "../middlewares/validateRequest"; // Middleware de validação

const router = Router();

router.post("/cadastro", validateRequest, createCadastro); // Adicionando o middleware
router.get("/addresses", getAllAddresses);
router.put("/addresses/:id", deactivateAddress);
router.get("/addresses/:id", getAddressById);
router.get("/persons", getAllPersons);
router.put("/persons/:id", deactivatePerson);
router.get("/persons/:id", getPersonById);
router.put("/cadastro/update/:id", validateRequest, updateCadastro);

export default router;
