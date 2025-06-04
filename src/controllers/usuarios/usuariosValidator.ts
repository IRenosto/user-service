import { z } from 'zod';
import { validation } from '../../shared/middlewares';

export const createUsuarioValidation = validation({
    body: z.object({
      nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
      sobrenome: z.string().min(3, 'Sobrenome deve ter no mínimo 3 caracteres'),
      senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
      email: z.string().min(5).email('Email inválido'),
      ativo: z.boolean().optional(),
      usuarioReferenciaId: z.number().min(1).optional(),
    }),
  });

export const deleteUsuarioValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const getAllUsuariosValidation = validation({
  query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    filter: z.string().optional(),
  }),
});

export const getUsuarioByIdValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const updateUsuarioValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
  body: z.object({
    nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
    sobrenome: z.string().min(3, 'Sobrenome deve ter no mínimo 3 caracteres').optional(),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
    email: z.string().email('Email inválido').min(5, 'Email deve ter no mínimo 5 caracteres').optional(),
    ativo: z.boolean().optional(),
    usuarioReferenciaId: z.number().min(1).optional(),
  }),
});

export const updateUsuarioPasswordValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
  body: z.object({
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  }),
});

export const updateUsuarioRolesAndPermissionsValidation = validation({
  body: z.object({
    roles: z.array(z.number().int().gt(0)).optional(),
    permissoes: z.array(z.number().int().gt(0)).optional(),
  }),
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const copyUsuarioRolesAndPermissionsValidation = validation({
  body: z.object({
    usuarioId: z.coerce.number().min(1),
    usuarioReferenciaId: z.coerce.number().min(1),
  }),
});

export const getUsuarioAuthByEmailValidation = validation({
  body: z.object({
    email: z.string().email('Email inválido'),
  }),
});

export const getUsuarioPermissoesValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});



export const getUsuarioRolesPermissoesSeparadoValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const updateUsuarioLoginDateValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});
