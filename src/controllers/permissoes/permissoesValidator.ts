import { z } from 'zod';
import { validation } from '../../shared/middlewares';

export const getAllPermissoesValidation = validation({
    query: z.object({
      page: z.number().int().min(1, 'page deve ser maior que 0').optional(),
      limit: z.number().int().min(1, 'limit deve ser maior que 0').optional(),
      filter: z.string().optional(),
    }),
  });

  export const getPermissaoByIdValidation = validation({
    params: z.object({
        id: z.string()
          .transform((val) => parseInt(val, 10))
          .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
      }),
  });

  export const updatePermissaoDescricaoValidation = validation({
    body: z.object({
      descricao: z.string().min(1).max(50).optional(),
    }),
  });