import prisma from '../models/cadastro.model';
import { Prisma } from '@prisma/client';
import { deactivatePerson } from '../repositories/cadastro.repository';

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
    const existingIndividual = await prisma.individual.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (existingIndividual) {
      throw new Error('CPF já cadastrado!');
    }

    return await prisma.individual.create({
      data: {
        ...data,
        personId: personId
      }
    });
  } catch (error) {
    console.error('Error in createIndividualService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Este CPF já está cadastrado.');
      }
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw error;
  }
};

export const createCompanyService = async (personId: number, data: { cnpj: string, responsibleCpf: string }) => {
  try {
    // Check if the responsible CPF is already registered
    const responsiblePerson = await prisma.individual.findUnique({
      where: {
        cpf: data.responsibleCpf,
      },
    });

    if (!responsiblePerson) {
      throw new Error('CPF do responsável não está cadastrado no sistema.');
    }

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

export const getAllAddressesService = async (isActive: boolean = true) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { isActive }
    });
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

export const getAddressByIdService = async (id: number, isActive: boolean = true) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id, isActive }
    });
    return address;
  } catch (error) {
    console.error('Error in getAddressByIdService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to fetch address');
  }
};

export const getAllPersonsService = async (isActive: boolean = true) => {
  try {
    const persons = await prisma.person.findMany({
      where: { isActive }
    });
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

export const getInactivePersonsService = async () => {
  try {
    const persons = await prisma.person.findMany({
      where: { isActive: false }
    });
    return persons;
  } catch (error) {
    console.error('Error in getInactivePersonsService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to fetch inactive persons');
  }
};

export const getPersonByIdService = async (id: number, isActive: boolean = true) => {
  try {
    const person = await prisma.person.findUnique({
      where: { id, isActive }
    });
    return person;
  } catch (error) {
    console.error('Error in getPersonByIdService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to fetch person');
  }
};

export const getInactivePersonByIdService = async (id: number) => {
  try {
    const person = await prisma.person.findUnique({
      where: { id, isActive: false }
    });
    return person;
  } catch (error) {
    console.error('Error in getInactivePersonByIdService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to fetch inactive person by ID');
  }
};

export const updateCadastroService = async (id: number, data: { name?: string, email?: string, phone?: string, mobile?: string, termsAccepted?: boolean, type?: string }) => {
  try {
    const cadastro = await prisma.person.update({
      where: { id },
      data
    });
    return cadastro;
  } catch (error) {
    console.error('Error in updateCadastroService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to update cadastro');
  }
};

export const updateIndividualService = async (personId: number, data: { cpf?: string }) => {
  try {
    const individual = await prisma.individual.update({
      where: { personId },
      data
    });
    return individual;
  } catch (error) {
    console.error('Error in updateIndividualService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to update individual');
  }
};

export const updateCompanyService = async (personId: number, data: { cnpj?: string, responsibleCpf?: string }) => {
  try {
    const company = await prisma.company.update({
      where: { personId },
      data
    });
    return company;
  } catch (error) {
    console.error('Error in updateCompanyService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to update company');
  }
};

export const deactivatePersonService = async (id: number) => {
  return await deactivatePerson(id.toString());
};

export const reactivatePersonService = async (id: number) => {
  try {
    const person = await prisma.person.update({
      where: { id, isActive: false },
      data: { isActive: true }
    });
    return person;
  } catch (error) {
    console.error('Error in reactivatePersonService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw new Error('Failed to reactivate person');
  }
};

export const deletePersonByIdService = async (id: number) => {
  try {
    // Delete related addresses
    await prisma.address.deleteMany({
      where: { personId: id }
    });

    // Delete related individual or company records
    await prisma.individual.deleteMany({
      where: { personId: id }
    });
    await prisma.company.deleteMany({
      where: { personId: id }
    });

    // Delete the person
    await prisma.person.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error in deletePersonByIdService:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }
    throw error;
  }
};
