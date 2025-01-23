import { Request, Response, NextFunction } from 'express';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { email, confirmEmail, termsAccepted, cpf, cnpj } = req.body;

  if (!termsAccepted) {
    return res.status(400).json({ error: 'Você deve aceitar os termos para continuar.' });
  }

  if (email !== confirmEmail) {
    return res.status(400).json({ error: 'O email e a confirmação de email não correspondem.' });
  }

  if (!cpf && !cnpj) {
    return res.status(400).json({ error: 'É necessário fornecer um CPF ou CNPJ.' });
  }

  next();
};

export default validateRequest;
