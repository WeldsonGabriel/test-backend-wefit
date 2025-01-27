// src/services/individualService.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Função para criar um 'individual', recebendo um personId e dados
export const createIndividualService = async (personId: number, data: { cpf: string }) => {
  try {
    // Validação para garantir que o CPF não esteja vazio
    if (!data.cpf) {
      throw new Error('CPF é obrigatório');
    }

    // Verificando se o CPF já está cadastrado no banco
    const existingIndividual = await prisma.individual.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (existingIndividual) {
      throw new Error('CPF já cadastrado!');
    }

    // Criando o 'individual' no banco de dados
    return await prisma.individual.create({
      data: {
        ...data,  // Desestruturando o 'data' para enviar para o Prisma
        personId: personId,  // Relacionando a pessoa (personId)
      },
    });
  } catch (error) {
    // Capturando o erro e tratando casos específicos do Prisma
    console.error('Error in createIndividualService:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Caso o erro seja relacionado ao CPF duplicado
        throw new Error('Este CPF já está cadastrado.');
      }

      // Caso seja outro erro do Prisma, podemos retornar detalhes mais específicos
      const prismaError = error as Prisma.PrismaClientKnownRequestError;
      throw new Error(`Prisma error: ${prismaError.code} - ${prismaError.meta?.modelName}`);
    }

    // Caso não seja erro do Prisma, lançamos o erro genérico
    throw error;
  }
};
