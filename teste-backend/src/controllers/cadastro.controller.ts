import { Request, Response } from 'express';
import {
  createAddressService,
  createPersonService,
  getAllAddressesService,
  deactivateAddressService,
  getAllPersonsService,
  deactivatePersonService,
} from '../services/cadastro.service';

export const createCadastro = async (req: Request, res: Response) => {
  try {
    const addressData = req.body.address;
    const personData = req.body.person;

    // Validate address data
    if (!addressData) {
      return res.status(400).json({ message: 'Address data is required' });
    }

    // Create address first
    const address = await createAddressService(addressData);

    // Validate person data
    if (!personData) {
      return res.status(400).json({ message: 'Person data is required' });
    }

    // Add address ID to person data
    personData.addressId = address.id;

    // Create person
    const person = await createPersonService(personData);

    res.status(201).json({ address, person });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
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

export const deactivateAddress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const address = await deactivateAddressService(Number(id));

    if (!address) {
      return res.status(404).json({ message: 'Address not found or already deactivated.' });
    }

    return res.status(200).json({ message: 'Address deactivated successfully.' });
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
