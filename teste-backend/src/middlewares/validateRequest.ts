import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const cadastroSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  confirmEmail: Joi.string().valid(Joi.ref("email")).required(),
  phone: Joi.string().pattern(/^\d+$/).required(),
  type: Joi.string().valid("INDIVIDUAL", "COMPANY").required(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().optional(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      postalCode: Joi.string().length(8).required(),
    })
  ).required(),
  cnpj: Joi.when("type", {
    is: "COMPANY",
    then: Joi.string().length(14).required(),
    otherwise: Joi.forbidden(),
  }),
  cpf: Joi.when("type", {
    is: "INDIVIDUAL",
    then: Joi.string().length(11).required(),
    otherwise: Joi.forbidden(),
  }),
  responsibleCpf: Joi.when("type", {
    is: "COMPANY",
    then: Joi.string().length(11).required(),
    otherwise: Joi.forbidden(),
  }),
  termsAccepted: Joi.boolean().valid(true).required(),
});

const validateCreateCadastro = (req: Request, res: Response, next: NextFunction) => {
  const { error } = cadastroSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((err: { message: any; }) => err.message).join(", ");
    return res.status(400).json({ message: errorMessage });
  }

  const { email, confirmEmail, termsAccepted, cpf, cnpj } = req.body;

  if (!termsAccepted) {
    return res.status(400).json({ error: "Você deve aceitar os termos para continuar." });
  }

  if (email !== confirmEmail) {
    return res.status(400).json({ error: "O email e a confirmação de email não correspondem." });
  }

  if (!cpf && !cnpj) {
    return res.status(400).json({ error: "É necessário fornecer um CPF ou CNPJ." });
  }

  next();
};

export default validateCreateCadastro;
