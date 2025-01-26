import { Router } from 'express';
import { createCadastro, getAllAddresses, getAllPersons, getInactivePersons, getInactivePersonById, deactivatePerson, getPersonById, getAddressById, updateCadastro, reactivatePerson, deletePersonById } from '../controllers/cadastro.controller';
import validateRequest from "../middlewares/validateRequest"; // Middleware de validação

const router = Router();

router.post("/cadastro", validateRequest, createCadastro);

router.get("/addresses", getAllAddresses);
router.get("/addresses/:id", getAddressById);
router.get("/persons", getAllPersons);
router.get("/persons/inactive", getInactivePersons);
router.get("/persons/inactive/:id", getInactivePersonById);
router.get("/persons/:id", getPersonById);

router.put("/cadastro/update/:id", validateRequest, updateCadastro);

router.delete("/persons/deactivate/:id", deactivatePerson);
router.delete("/persons/permanent/:id", deletePersonById); 

router.patch("/persons/reactivate/:id", reactivatePerson);

export default router;
