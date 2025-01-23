import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Verifica se a variável DATABASE_URL está configurada
verificFunction();

// Configura e exporta o PrismaClient
const prisma = new PrismaClient();

export default prisma;
function verificFunction() {
    if (!process.env.DATABASE_URL) {
        throw new Error('A variável de ambiente DATABASE_URL não está configurada.');
    }
}

