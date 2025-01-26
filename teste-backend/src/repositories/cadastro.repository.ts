import prisma from '../models/cadastro.model';

export const createAddress = async (addressData: any) => {
  return await prisma.address.create({ data: addressData });
};

export const createPerson = async (personData: any) => {
  return await prisma.person.create({ data: personData });
};

export const getAllAddresses = async () => {
  return await prisma.address.findMany();
};

export const getAllPersons = async () => {
  return await prisma.person.findMany();
};

export const deactivatePerson = async (id: string) => {
  return await prisma.person.update({
    where: { id: Number(id) },
    data: { isActive: false },
  });
};
