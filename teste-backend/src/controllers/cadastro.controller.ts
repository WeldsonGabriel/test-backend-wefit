import { Request, Response } from 'express';
import {
  createAddressService,
  createPersonService,
  createIndividualService,
  createCompanyService,
  getAllAddressesService,
  getAllPersonsService,
  getInactivePersonsService,
  getInactivePersonByIdService,
  deactivatePersonService,
  getPersonByIdService,
  getAddressByIdService,
  updateCadastroService,
  updateIndividualService,
  updateCompanyService
} from '../services/cadastro.service';

export const createCadastro = async (req: Request, res: Response) => {
  try {
    const { name, email, confirmEmail, phone, mobile, termsAccepted, type, addresses, cpf, cnpj, responsibleCpf } = req.body;

    if (!name || !email || !confirmEmail || !termsAccepted || !type) {
      return res.status(400).json({ message: 'Name, email, confirmEmail, terms acceptance, and type are required' });
    }

    if (email !== confirmEmail) {
      return res.status(400).json({ message: 'Email and confirmEmail do not match' });
    }

    const newPerson = await createPersonService({ name, email, confirmEmail, phone, mobile, termsAccepted, type }) as unknown as { id: number };

    if (addresses && addresses.length > 0) {
      for (const address of addresses) {
        await createAddressService(newPerson.id, address);
      }
    }

    if (type === 'INDIVIDUAL' && cpf) {
      await createIndividualService(newPerson.id, { cpf });
    } else if (type === 'COMPANY' && cnpj && responsibleCpf) {
      await createCompanyService(newPerson.id, { cnpj, responsibleCpf });
    } else {
      return res.status(400).json({ message: 'Invalid data for the specified type' });
    }

    return res.status(201).json(newPerson);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getAllAddresses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const addresses = await getAllAddressesService();
    return res.status(200).json(addresses);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getAllPersons = async (req: Request, res: Response): Promise<Response> => {
  try {
    const persons = await getAllPersonsService();
    return res.status(200).json(persons);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getInactivePersons = async (req: Request, res: Response): Promise<Response> => {
  try {
    const persons = await getInactivePersonsService();
    return res.status(200).json(persons);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getInactivePersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person = await getInactivePersonByIdService(Number(id));
    if (!person) {
      return res.status(404).json({ message: 'Inactive person not found' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person = await getPersonByIdService(Number(id));
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const address = await getAddressByIdService(Number(id));
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateCadastro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, mobile, termsAccepted, type, addresses, cnpj, responsibleCpf } = req.body;

    if (!name || !email || !termsAccepted || !type) {
      return res.status(400).json({ message: 'Name, email, terms acceptance, and type are required' });
    }

    const updatedPerson = await updateCadastroService(Number(id), { name, email, phone, mobile, termsAccepted, type });

    if (addresses && addresses.length > 0) {
      for (const address of addresses) {
        await createAddressService(updatedPerson.id, address);
      }
    }

    if (type === 'INDIVIDUAL') {
      await updateIndividualService(updatedPerson.id, {});
    } else if (type === 'COMPANY' && cnpj && responsibleCpf) {
      await updateCompanyService(updatedPerson.id, { cnpj, responsibleCpf });
    } else {
      return res.status(400).json({ message: 'Invalid data for the specified type' });
    }

    return res.status(200).json(updatedPerson);
  } catch (error) {
    console.error('Error in updateCadastro:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deactivatePerson = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const person = await deactivatePersonService(Number(id));

    if (!person) {
      return res.status(404).json({ message: 'Person not found or already deactivated.' });
    }

    return res.status(200).json({ message: 'Person deactivated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

