import { Request, Response } from 'express';
import { permissoesProvider } from '../../services/permissoes';
import { IParamsIdGlobal, IQueryGetAllPermissoes } from '../../shared/interfaces';
import { errorHandler } from '../../shared/middlewares/errorHandler';

export const getAllPermissoes = async (req: Request<{}, {}, {}, IQueryGetAllPermissoes>, res: Response) => {
try {
    const result = await permissoesProvider.getAllPermissoes(
        req.query.page,
        req.query.limit,
        req.query.filter,
    );

    const totalCount = result.length;

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', totalCount);

    return res.status(200).json(result);
}
catch (error) {
    errorHandler(error, res)
}
};

export const getPermissaoById = async (req: Request<IParamsIdGlobal>, res: Response) => {
try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: 'O parâmetro "id" precisa ser informado'
        });
    }

    const result = await permissoesProvider.getPermissaoById(req.params.id);

    return res.status(200).json(result);
}
catch (error) {
    errorHandler(error, res);
}
};

export const updatePermissaoDescricao = async (req: Request<IParamsIdGlobal, {}, {descricao: string}>, res: Response) => {

    if (!req.params.id) {
        return res.status(400).json({
            errors: 'O parâmetro "id" precisa ser informado'
        });
    }

    const result = await permissoesProvider.updatePermissaoDescricao(req.params.id, req.body.descricao);

    return res.status(200).json(result);
};
