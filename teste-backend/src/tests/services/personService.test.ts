// src/tests/services/individualService.test.ts
import { createIndividualService } from '../../services/personService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Configuração do banco de dados, se necessário
});

afterAll(async () => {
  // Limpeza após os testes
  await prisma.$disconnect();
});

describe('createIndividualService', () => {
  it('deve criar um individual corretamente e salvar no banco de dados', async () => {
    const personId = 1;  // Exemplo de personId
    const data = { cpf: '12345678901' };  // CPF válido

    const individual = await createIndividualService(personId, data);

    expect(individual).toHaveProperty('id');
    expect(individual.cpf).toBe(data.cpf);
    expect(individual.personId).toBe(personId);
  });

  it('deve lançar um erro se o CPF já estiver cadastrado', async () => {
    const personId = 1;
    const data = { cpf: '12345678901' };  // CPF duplicado para o teste

    // Tentando criar um individual com o mesmo CPF deve gerar erro
    await createIndividualService(personId, data); // Primeiro inserção bem-sucedida

    await expect(createIndividualService(personId, data)).rejects.toThrow('Este CPF já está cadastrado.');
  });

  it('deve lançar um erro se o CPF não for informado', async () => {
    const personId = 1;
    const data = { cpf: '' };  // CPF vazio

    await expect(createIndividualService(personId, data)).rejects.toThrow('CPF é obrigatório');
  });

  it('deve lançar um erro específico do Prisma quando houver uma violação de unicidade (P2002)', async () => {
    const personId = 1;
    const data = { cpf: '12345678901' };  // CPF que já existe no banco

    try {
      await createIndividualService(personId, data);
    } catch (error) {
      if (error instanceof Error && error.message === 'Este CPF já está cadastrado.') {
        expect(error.message).toBe('Este CPF já está cadastrado.');
      }
    }
  });
});
