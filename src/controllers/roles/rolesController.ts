import { Request, Response } from 'express';
import { rolesProvider } from '../../services/roles';
import { IBodyCreateRoles, IBodyUpdateRoles, IParamsIdGlobal, IQueryGetAllRoles } from '../../shared/interfaces';
import { errorHandler } from '../../shared/middlewares/errorHandler';

export const createRole = async (req: Request<{}, {}, IBodyCreateRoles>, res: Response) => {
    try {

    const result = await rolesProvider.createRole(req.body);

    return res.status(201).json(result);
    }
    catch (error) {
        errorHandler(error, res)
    }
};

export const deleteRole = async (req: Request<IParamsIdGlobal>, res: Response) => {
try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    await rolesProvider.deleteRole(req.params.id);

    return res.status(204).send();
}
catch(error) {
    errorHandler(error, res)
}
};

export const getAllRoles = async (req: Request<{}, {}, {}, IQueryGetAllRoles>, res: Response) => {
try {
    const result = await rolesProvider.getAllRoles(
        req.query.page,
        req.query.limit,
        req.query.filter
    );

    const totalCount = result.length;

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', totalCount);

    return res.status(200).json(result);

}
catch(error) {
    errorHandler(error, res)
}
};

export const getRoleById = async (req: Request<IParamsIdGlobal>, res: Response) => {
try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    const result = await rolesProvider.getRoleById(req.params.id);

    return res.status(200).json(result);
}
    catch(error) {
        errorHandler(error, res)
    }
};

export const getRolesByUserId = async (req: Request<IParamsIdGlobal>, res: Response) => {
try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    const result = await rolesProvider.getRolesByUserId(req.params.id);

    return res.status(200).json(result);
}
catch(error) {
    errorHandler(error, res)
}
};


export const updateRole = async (req: Request<IParamsIdGlobal, {}, IBodyUpdateRoles>, res: Response) => {
try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        });
    }

    await rolesProvider.updateRole(req.params.id, req.body);
    
    return res.status(204).send();
}
catch(error) {
    errorHandler(error, res)
}
};




