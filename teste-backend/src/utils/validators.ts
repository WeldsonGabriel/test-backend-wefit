import { Request, Response, NextFunction } from 'express';
import { badRequestResponse } from './responses';

export const validatePersonRequest = (req: Request, res: Response, next: NextFunction) => {
  const { email, confirmEmail, termsAccepted, cpf, cnpj } = req.body;

  if (!termsAccepted) {
    return badRequestResponse(res, 'Você deve aceitar os termos para continuar.');
  }

  if (!confirmEmail) {
    return badRequestResponse(res, 'A confirmação de email é obrigatória.');
  }

  if (email !== confirmEmail) {
    return badRequestResponse(res, 'O email e a confirmação de email não correspondem.');
  }

  if (!cpf && !cnpj) {
    return badRequestResponse(res, 'É necessário fornecer um CPF ou CNPJ.');
  }

  next();
};
