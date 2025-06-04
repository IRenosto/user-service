import { Request, Response } from 'express';
import { usuariosProvider } from '../../services/usuarios';
import { IBodyCreateUsuarios, IQueryGetAllUsuarios, IParamsIdGlobal, IBodyUpdateUsuario, IBodyUpdateUsuarioRolesAndPermissions, IBodyCopyUsuarioRolesAndPermissions } from '../../shared/interfaces';
import { decoder } from '../../shared/middlewares';
import { errorHandler } from '../../shared/middlewares/errorHandler';

export const createUsuario = async (req: Request<{}, {}, IBodyCreateUsuarios>, res: Response) => {
    try {
        const autorRequest = await decoder(req);

        await usuariosProvider.validaEmailUsuario(req.body.email);

        const resultUsuario = await usuariosProvider.createUsuario({
            ...req.body,
            usuario_cadastrador: `${autorRequest?.nome} ${autorRequest?.sobrenome}` || 'desconhecido',
            usuario_atualizador: `${autorRequest?.nome} ${autorRequest?.sobrenome}` || 'desconhecido',
            usuarioReferenciaId: req.body.usuarioReferenciaId
        });

        return res.status(201).json(resultUsuario);
    } catch (error) {
        console.error('createUsuario - error:', error);
        errorHandler(error, res);
    }
};

export const deleteUsuario = async (req: Request<IParamsIdGlobal>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        await usuariosProvider.deleteUsuario(req.params.id);

        return res.status(204).send();
    } catch (error) {
        console.error('deleteUsuario - error:', error);
        errorHandler(error, res);
    }
};

export const getAllUsuarios = async (req: Request<{}, {}, {}, IQueryGetAllUsuarios>, res: Response) => {
    try {
        const result = await usuariosProvider.getAllUsuarios(
            req.query.page,
            req.query.limit,
            req.query.filter,
        );

        const totalCount = result.length;

        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.setHeader('x-total-count', totalCount);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getAllUsuarios - error:', error);
        errorHandler(error, res);
    }
};

export const getUsuarioById = async (req: Request<IParamsIdGlobal>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        const result = await usuariosProvider.getUsuarioById(req.params.id);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getUsuarioById - error:', error);
        errorHandler(error, res);
    }
};

export const updateUsuario = async (req: Request<IParamsIdGlobal, {}, IBodyUpdateUsuario>, res: Response) => {
    try {
        const autorRequest = await decoder(req);

        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        const result = await usuariosProvider.updateUsuario(Number(req.params.id), {
            ...req.body,
            usuario_atualizador: `${autorRequest?.nome} ${autorRequest?.sobrenome}` || 'desconhecido'
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error('updateUsuario - error:', error);
        errorHandler(error, res);
    }
};

export const updateUsuarioPassword = async (req: Request<IParamsIdGlobal, {}, { senha: string }>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        await usuariosProvider.updateUsuario(Number(req.params.id), {
            senha: req.body.senha
        });

        return res.status(204).send();
    } catch (error) {
        console.error('updateUsuarioPassword - error:', error);
        errorHandler(error, res);
    }
};

export const updateUsuarioRolesAndPermissions = async (req: Request<IParamsIdGlobal, IBodyUpdateUsuarioRolesAndPermissions>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        await usuariosProvider.updateRolesAndPermissionsById(req.params.id, {
            roles: req.body.roles,
            permissoes: req.body.permissoes
        });

        return res.status(204).send();
    } catch (error) {
        console.error('updateUsuarioRolesAndPermissions - error:', error);
        errorHandler(error, res);
    }
};

export const copyUsuarioRolesAndPermissions = async (req: Request<{}, {}, IBodyCopyUsuarioRolesAndPermissions>, res: Response) => {
    try {
        const result = await usuariosProvider.updateUsuario(Number(req.body.usuarioId), {
            usuarioReferenciaId: req.body.usuarioReferenciaId
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error('copyUsuarioRolesAndPermissions - error:', error);
        errorHandler(error, res);
    }
};

export const getUsuarioAuthByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: 'Parâmetro "email" é obrigatório.' });
        }

        const result = await usuariosProvider.getUsuarioAuthByEmail(email);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getUsuarioAuthByEmail - error:', error);
        errorHandler(error, res);
    }
};

export const getUsuarioPermissoes = async (req: Request<IParamsIdGlobal>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        const result = await usuariosProvider.getUsuarioPermissoes(req.params.id);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getUsuarioPermissoes - error:', error);
        errorHandler(error, res);
    }
};

export const getUsuarioRolesPermissoesSeparado = async (req: Request<IParamsIdGlobal>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        const result = await usuariosProvider.getUsuarioRolesPermissoesSeparado(req.params.id);

        return res.status(200).json(result);
    } catch (error) {
        console.error('getUsuarioRolesPermissoesSeparado - error:', error);
        errorHandler(error, res);
    }
};

export const updateUsuarioLoginDate = async (req: Request<IParamsIdGlobal>, res: Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                errors: 'O parâmetro "id" precisa ser informado'
            });
        }

        await usuariosProvider.updateUsuarioLoginDate(req.params.id);

        return res.status(204).send();
    } catch (error) {
        console.error('updateUsuarioLoginDate - error:', error);
        errorHandler(error, res);
    }
};
