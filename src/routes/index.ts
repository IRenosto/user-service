import { Router } from 'express';
import { permissoesHandler } from '../controllers/permissoes';
import { rolesHandler } from '../controllers/roles';
import { usuariosHandler } from '../controllers/usuarios';
import { ensureAuthenticated, authorization, register, alteracaoDeSenha } from '../shared/middlewares';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gerenciamento de usuários
 *   - name: Permissoes
 *     description: Gerenciamento de permissões
 *   - name: Roles
 *     description: Gerenciamento de roles
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de sucesso
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
router.get('/', (_, res) => {
  return res.status(200).send('Serviço de usuários funcionando corretamente.');
  });

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Retorna métricas do Prometheus
 *     responses:
 *       200:
 *         description: Métricas do Prometheus
 */
router.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});


//Usuarios
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *               usuarioReferenciaId:
 *                 type: number
 *             required:
 *               - nome
 *               - sobrenome
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/usuarios', ensureAuthenticated, authorization(['USUARIO_ESCRITA']), usuariosHandler.createUsuarioValidation, usuariosHandler.createUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários com paginação e filtro
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Página atual (opcional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Limite de itens por página (opcional)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filtro de busca (opcional)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/usuarios', ensureAuthenticated, authorization(['USUARIO_LEITURA']), usuariosHandler.getAllUsuariosValidation, usuariosHandler.getAllUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 */
router.get('/usuarios/:id', ensureAuthenticated, authorization(['USUARIO_LEITURA']), usuariosHandler.getUsuarioByIdValidation, usuariosHandler.getUsuarioById);

/**
 * @swagger
 * /usuarios/{id}:
 *   patch:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senha:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.patch('/usuarios/:id', ensureAuthenticated, authorization(['USUARIO_ESCRITA']), usuariosHandler.updateUsuarioValidation, usuariosHandler.updateUsuario);


/**
 * @swagger
 * /usuarios/{id}/senha:
 *   put:
 *     summary: Atualiza a senha de um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senha:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.patch('/usuarios/:id/senha', ensureAuthenticated, usuariosHandler.updateUsuarioPasswordValidation, alteracaoDeSenha, usuariosHandler.updateUsuarioPassword);

/**
 * @swagger
 * /usuarios/:id/permissoes:
 *   patch:
 *     summary: Atualiza as roles e permissões de um usuário
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *               permissoes:
 *                 type: array
 *                 items:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissões atualizadas com sucesso
 */
router.patch('/usuarios/:id/permissoes', ensureAuthenticated, authorization(['USUARIO_ESCRITA']), usuariosHandler.updateUsuarioRolesAndPermissionsValidation, usuariosHandler.updateUsuarioRolesAndPermissions);


/**
 * @swagger
 * /usuarios/copiar/permissoes:
 *   patch:
 *     summary: Copia as permissões de autenticação de um usuário para outro
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: number
 *               usuarioReferenciaId:
 *                 type: number
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissões copiadas com sucesso
 */
router.patch('/usuarios/copiar/permissoes', ensureAuthenticated, authorization(['USUARIO_ESCRITA']), usuariosHandler.copyUsuarioRolesAndPermissionsValidation, usuariosHandler.copyUsuarioRolesAndPermissions);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 */
router.delete('/usuarios/:id', ensureAuthenticated, authorization(['USUARIO_DELECAO']), usuariosHandler.deleteUsuarioValidation, usuariosHandler.deleteUsuario);

router.post('/usuarios/email', usuariosHandler.getUsuarioAuthByEmailValidation, usuariosHandler.getUsuarioAuthByEmail);
router.get('/usuarios/permissoes/:id', usuariosHandler.getUsuarioPermissoesValidation, usuariosHandler.getUsuarioPermissoes);
router.get('/usuarios/rolesPermissoesSeparado/:id', usuariosHandler.getUsuarioRolesPermissoesSeparadoValidation, usuariosHandler.getUsuarioRolesPermissoesSeparado);
router.patch('/usuarios/:id/updateLogin', usuariosHandler.updateUsuarioLoginDateValidation, usuariosHandler.updateUsuarioLoginDate);


//Permissoes
/**
 * @swagger
 * /permissoes:
 *   get:
 *     summary: Lista todas as permissões com paginação e filtro
 *     tags: [Permissoes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Página atual (opcional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Limite de itens por página (opcional)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filtro de busca (opcional)
 *     responses:
 *       200:
 *         description: Lista de permissões retornada com sucesso
 *         headers:
 *           x-total-count:
 *             description: Total de permissões
 *             schema:
 *               type: number
 */
router.get('/permissoes', ensureAuthenticated, authorization(['PERMISSAO_LEITURA']), permissoesHandler.getAllPermissoesValidation, permissoesHandler.getAllPermissoes);

/**
 * @swagger
 * /permissoes/{id}:
 *   get:
 *     summary: Busca uma permissão pelo ID
 *     tags: [Permissoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permissão
 *     responses:
 *       200:
 *         description: Permissão retornada com sucesso
 *       400:
 *         description: O parâmetro "id" precisa ser informado
 */
router.get('/permissoes/:id', ensureAuthenticated, authorization(['PERMISSAO_LEITURA']), permissoesHandler.getPermissaoByIdValidation, permissoesHandler.getPermissaoById);

/**
 * @swagger
 * /permissoes/{id}:
 *   patch:
 *     summary: Atualiza a descrição de uma permissão
 *     tags: [Permissoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da permissão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Nova descrição da permissão
 *     responses:
 *       200:
 *         description: Permissão atualizada com sucesso
 *       400:
 *         description: O parâmetro "id" precisa ser informado
 */
router.patch('/permissoes/:id', ensureAuthenticated, authorization(['PERMISSAO_ESCRITA']), permissoesHandler.updatePermissaoDescricaoValidation, permissoesHandler.updatePermissaoDescricao);


//Roles
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria uma nova role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Role criada com sucesso
 */
router.post('/roles', ensureAuthenticated, authorization(['ROLE_ESCRITA']), rolesHandler.createRoleValidation, rolesHandler.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Deleta uma role pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Role deletada com sucesso
 */
router.delete('/roles/:id', ensureAuthenticated, authorization(['ROLE_DELECAO']), rolesHandler.deleteRoleValidation, rolesHandler.deleteRole);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Lista todas as roles
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles retornada com sucesso
 */
router.get('/roles', ensureAuthenticated, authorization(['ROLE_LEITURA']), rolesHandler.getAllRolesValidation, rolesHandler.getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Busca uma role pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role encontrada com sucesso
 */
router.get('/roles/:id', ensureAuthenticated, authorization(['ROLE_LEITURA']), rolesHandler.getRoleByIdValidation, rolesHandler.getRoleById);

/**
 * @swagger
 * /roles/usuario/{id}:
 *   get:
 *     summary: Lista todas as roles de um usuário pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles do usuário retornadas com sucesso
 */
router.get('/roles/usuario/:id', ensureAuthenticated, authorization(['ROLE_LEITURA']), rolesHandler.getRolesByUserIdValidation, rolesHandler.getRolesByUserId);

/**
 * @swagger
 * /roles/{id}:
 *   patch:
 *     summary: Atualiza uma role pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Role atualizada com sucesso
 */
router.patch('/roles/:id', ensureAuthenticated, authorization(['ROLE_ESCRITA']), rolesHandler.updateRoleValidation, rolesHandler.updateRole);


export { router };