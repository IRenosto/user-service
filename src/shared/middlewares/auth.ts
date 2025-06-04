import { Request, RequestHandler } from "express";
import { usuariosProvider } from "../../services/usuarios";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUsuarioPermissoes } from "../interfaces";

export const decoder = async (req: Request): Promise<IUsuarioPermissoes | undefined> => {
  const authorization = req.headers.authorization;

  console.log(authorization)

  if (!authorization) {
    return undefined;
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return undefined;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const usuario = await usuariosProvider.getUsuarioPermissoes(decoded.id);

    return usuario;
  } catch (err) {
    return undefined;
  }
};

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Sem authHeader')
    return res.status(401).json({ error: 'acessToken não fornecido' });
  }

  const [, acessToken] = authHeader.split(' ');

  try {
    jwt.verify(acessToken, process.env.JWT_SECRET as string) as JwtPayload;
    next();
  } catch (err) {
    console.error('erro jwt verify')
    return res.status(401).json({ error: 'acessToken inválido ou expirado' });
  }
};

export const authorization = (
  permissoesRequeridas: string[]
): RequestHandler => {
  return async (req, res, next) => {
    const usuario = await decoder(req);

    if (!usuario) {
    console.error('Sem usuario')
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const permissoesDoUsuario = usuario.permissoes;
    
    const possuiPermissao = permissoesRequeridas.every((permissao) =>
      permissoesDoUsuario?.includes(permissao)
    );

    if (!possuiPermissao) {
      return res.status(403).json({ message: "Usuário não possui permissão para realizar essa operação" });
    }

    next();
  };
};

export const alteracaoDeSenha: RequestHandler = async (req, res, next) => {
    const usuario = await decoder(req);

    if (!usuario) {
    console.error('Sem usuario')
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    
    const possuiPermissao = usuario.id == Number(req.params.id);
    
    if (!possuiPermissao) {
      return res.status(403).json({ message: "Usuário não possui permissão para realizar essa operação" });
    }

    next();
};
