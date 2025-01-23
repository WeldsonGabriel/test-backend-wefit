import prisma from '../models/cadastro.model';

export const createAddressService = async (addressData: any) => {
  try {
    const address = await prisma.address.create({ data: addressData });
    return address;
  } catch (error) {
    throw new Error('Failed to create address');
  }
};

export const createPersonService = async (personData: any) => {
  try {
    const person = await prisma.person.create({ data: personData });
    return person;
  } catch (error) {
    throw new Error('Failed to create person');
  }
};

export const getAllAddressesService = async () => {
  try {
    const addresses = await prisma.address.findMany();
    return addresses;
  } catch (error) {
    throw new Error('Failed to fetch addresses');
  }
};

export const deactivateAddressService = async (id: number) => {
  try {
    const address = await prisma.address.update({
      where: { id },
      data: { isActive: false },
    });
    return address;
  } catch (error) {
    throw new Error('Failed to deactivate address');
  }
};

export const getAllPersonsService = async () => {
  try {
    const persons = await prisma.person.findMany();
    return persons;
  } catch (error) {
    throw new Error('Failed to fetch persons');
  }
};

export const deactivatePersonService = async (id: number) => {
  try {
    const person = await prisma.person.update({
      where: { id },
      data: { isActive: false },
    });
    return person;
  } catch (error) {
    throw new Error('Failed to deactivate person');
  }
};
