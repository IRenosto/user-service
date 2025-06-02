import { Request, Response } from 'express';
import { z } from 'zod';

import { validation } from '../../shared/middlewares';
import {  IBodyUpdateRoles, IParamsIdGlobal } from '../../shared/interfaces';
import { RolesProvider } from '../../services/roles';

export const updataByIdValidation = validation({
    body: z.object({
      nome: z.string().min(1).max(50), 
      descricao: z.string().min(1).max(50), 
    }),
  });

export const updateById = async (req: Request<IParamsIdGlobal, {}, IBodyUpdateRoles>, res: Response) => {

    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    const result = await RolesProvider.updateById(req.params.id, req.body);

    if (result instanceof Error) {
        return res.status(500).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(204).send();

};
