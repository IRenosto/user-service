import { z } from 'zod';
import { validation } from '../../shared/middlewares';

export const createRoleValidation = validation({
    body: z.object({
      nome: z.string().min(1).max(50),
      descricao: z.string().min(1).max(50),
    }),
  });

  export const deleteRoleValidation = validation({
    params: z.object({
        id: z.string()
          .transform((val) => parseInt(val, 10))
          .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
      }),
  });

  export const getAllRolesValidation = validation({
    query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    filter: z.string().optional(),
  }),
  });

  export const getRoleByIdValidation = validation({
    params: z.object({
      id: z.string()
        .transform((val) => parseInt(val, 10))
        .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
    }),
  });

  export const getRolesByUserIdValidation = validation({
    params: z.object({
      id: z.string()
        .transform((val) => parseInt(val, 10))
        .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
    }),
  });

  export const updateRoleValidation = validation({
    body: z.object({
      nome: z.string().min(1).max(50).optional(), 
      descricao: z.string().min(1).max(50).optional(),
      permissoesIds: z.array(z.number().int().gt(0)).optional(),
    }),
  });