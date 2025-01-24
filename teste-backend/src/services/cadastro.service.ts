import prisma from '../models/cadastro.model';
import { Prisma } from '@prisma/client';

export const createPersonService = async (data: { name: string, email: string, confirmEmail: string, phone?: string, mobile?: string, termsAccepted: boolean, type: string }) => {
  try {
    return await prisma.person.create({
      data
    });
  } catch (error) {
    console.error('Error in createPersonService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw error;
  }
};

export const createIndividualService = async (personId: number, data: { cpf: string }) => {
  try {
    return await prisma.individual.create({
      data: {
        ...data,
        personId: personId
      }
    });
  } catch (error) {
    console.error('Error in createIndividualService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw error;
  }
};

export const createCompanyService = async (personId: number, data: { cnpj: string, responsibleCpf: string }) => {
  try {
    return await prisma.company.create({
      data: {
        ...data,
        personId: personId
      }
    });
  } catch (error) {
    console.error('Error in createCompanyService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw error;
  }
};

export const createAddressService = async (personId: number, data: { street: string, number: string, complement?: string, neighborhood: string, city: string, state: string, postalCode: string }) => {
  try {
    return await prisma.address.create({
      data: {
        ...data,
        personId: personId
      }
    });
  } catch (error) {
    console.error('Error in createAddressService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw error;
  }
};

export const getAllAddressesService = async () => {
  try {
    const addresses = await prisma.address.findMany();
    return addresses;
  } catch (error) {
    console.error('Error in getAllAddressesService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
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
    console.error('Error in deactivateAddressService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to deactivate address');
  }
};

export const getAllPersonsService = async () => {
  try {
    const persons = await prisma.person.findMany();
    return persons;
  } catch (error) {
    console.error('Error in getAllPersonsService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
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
    console.error('Error in deactivatePersonService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to deactivate person');
  }
};
