import { RequestHandler } from "express";
import { AnyZodObject } from "zod";

type ValidationSchema = {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
};

export const validation = (schemas: ValidationSchema): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    try {
      const validated: any = {};
      if (schemas.body) {
        validated.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        validated.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        validated.params = schemas.params.parse(req.params);
      }
      (req as any).validated = validated;

      return next();
    } catch (error: any) {
      console.error("Erro de validação:", error);
      res.status(400).json({
        errors: error.errors ?? [{ message: "Erro de validação", path: [] }],
      });
    }
  };
};