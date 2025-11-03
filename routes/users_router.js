const express = require('express');
const UsersService = require('../services/usersService');

const router = express.Router();
const usersService = new UsersService();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         active:
 *           type: boolean
 *           description: Estado del usuario
 *       required:
 *         - name
 *         - email
 *       example:
 *         id: "1"
 *         name: "Juan Pérez"
 *         email: "juan@example.com"
 *         username: "juanperez"
 *         password: "password123"
 *         active: true
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               active:
 *                 type: boolean
 *             required:
 *               - name
 *               - email
 *             example:
 *               name: "Nuevo Usuario"
 *               email: "nuevo@example.com"
 *               username: "nuevousuario"
 *               password: "password123"
 *               active: true
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de entrada inválidos o email ya existe
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await usersService.createUser(body);
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      data: newUser
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario completamente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await usersService.updateUser(id, body);
    res.json({
      message: 'Usuario actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await usersService.patchUser(id, updates);
    res.json({
      message: 'Usuario actualizado parcialmente',
      data: updatedUser
    });
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    res.json({
      message: 'Usuario eliminado exitosamente',
      data: result
    });
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;
