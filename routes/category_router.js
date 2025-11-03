const express = require('express');
const CategoriesService = require('../services/categoryService');

const router = express.Router();
const categoriesService = new CategoriesService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la categoría
 *         categoryName:
 *           type: string
 *           description: Nombre de la categoría
 *         description:
 *           type: string
 *           description: Descripción de la categoría
 *         active:
 *           type: boolean
 *           description: Estado de la categoría
 *       required:
 *         - categoryName
 *       example:
 *         id: "1"
 *         categoryName: "Electrónicos"
 *         description: "Productos electrónicos"
 *         active: true
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para gestión de categorías
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res, next) => {
  try {
    const categories = await categoriesService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoriesService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *             required:
 *               - categoryName
 *             example:
 *               categoryName: "Nueva Categoría"
 *               description: "Descripción de la nueva categoría"
 *               active: true
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await categoriesService.createCategory(body);
    res.status(201).json({
      message: 'Categoría creada exitosamente',
      data: newCategory
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar una categoría completamente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedCategory = await categoriesService.updateCategory(id, body);
    res.json({
      message: 'Categoría actualizada exitosamente',
      data: updatedCategory
    });
  } catch (error) {
    if (error.message === 'Categoría no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await categoriesService.patchCategory(id, updates);
    res.json({
      message: 'Categoría actualizada parcialmente',
      data: updatedCategory
    });
  } catch (error) {
    if (error.message === 'Categoría no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: No se puede eliminar, tiene productos asociados
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoriesService.deleteCategory(id);
    res.json({
      message: 'Categoría eliminada exitosamente',
      data: deletedCategory
    });
  } catch (error) {
    if (error.message === 'Categoría no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('No se puede eliminar')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;
