import { Response } from 'express';

export const successResponse = (res: Response, data: any, message: string = 'Success') => {
  return res.status(200).json({ message, data });
};

export const createdResponse = (res: Response, data: any, message: string = 'Created') => {
  return res.status(201).json({ message, data });
};

export const errorResponse = (res: Response, error: any, message: string = 'Error') => {
  return res.status(500).json({ message, error });
};

export const notFoundResponse = (res: Response, message: string = 'Not Found') => {
  return res.status(404).json({ message });
};

export const badRequestResponse = (res: Response, message: string = 'Bad Request') => {
  return res.status(400).json({ message });
};
