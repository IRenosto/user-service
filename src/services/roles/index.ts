import * as createRole from './create/createRole';
import * as deleteRole from './delete/deleteRole';
import * as getAllRoles from './read/getAllRoles';
import * as getRoleById from './read/getRoleById'
import * as getRolesByUserId from './read/getRolesByUserId'
import * as updateRole from './update/updateRole'


export const rolesProvider = {
    ...createRole,
    ...deleteRole,
    ...getAllRoles,
    ...getRoleById,
    ...getRolesByUserId,
    ...updateRole
};