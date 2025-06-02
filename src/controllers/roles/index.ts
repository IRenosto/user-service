import * as rolesController from './rolesController';
import * as rolesValidator from './rolesValidator';

export const rolesHandler = {
    ...rolesController,
    ...rolesValidator,
};