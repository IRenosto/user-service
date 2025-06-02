export interface IParamsIdGlobal { id?: number;  [key: string]: any; }

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}