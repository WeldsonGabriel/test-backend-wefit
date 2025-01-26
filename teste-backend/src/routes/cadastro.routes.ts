import { Router } from 'express';
import { createCadastro, getAllAddresses, getAllPersons, deactivatePerson, getPersonById, getAddressById, updateCadastro } from '../controllers/cadastro.controller';
import validateRequest from "../middlewares/validateRequest"; // Middleware de validação

const router = Router();

router.post("/cadastro", validateRequest, createCadastro); 
router.get("/addresses", getAllAddresses); 
router.get("/addresses/:id", getAddressById); 
router.get("/persons", getAllPersons); 
router.delete("/persons/deactivate/:id", deactivatePerson);
router.get("/persons/:id", getPersonById); 
router.put("/cadastro/update/:id", validateRequest, updateCadastro);

export default router;
