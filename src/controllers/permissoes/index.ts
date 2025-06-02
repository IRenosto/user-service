import * as permissoesController from './permissoesController';
import * as permissoesValidator from './permissoesValidator';

export const permissoesHandler = {
    ...permissoesController,
    ...permissoesValidator,
};