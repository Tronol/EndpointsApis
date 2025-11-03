const express = require('express');
const BrandsService = require('../services/brandsService');

const router = express.Router();
const brandsService = new BrandsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la marca
 *         brandName:
 *           type: string
 *           description: Nombre de la marca
 *         description:
 *           type: string
 *           description: Descripción de la marca
 *         active:
 *           type: boolean
 *           description: Estado de la marca
 *       required:
 *         - brandName
 *       example:
 *         id: "1"
 *         brandName: "Nike"
 *         description: "Marca deportiva"
 *         active: true
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Endpoints para gestión de marcas
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res, next) => {
  try {
    const brands = await brandsService.getBrands();
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await brandsService.getBrandById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json(brand);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crear una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *             required:
 *               - brandName
 *             example:
 *               brandName: "Nueva Marca"
 *               description: "Descripción de la nueva marca"
 *               active: true
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newBrand = await brandsService.createBrand(body);
    res.status(201).json({
      message: 'Marca creada exitosamente',
      data: newBrand
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Actualizar una marca completamente
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedBrand = await brandsService.updateBrand(id, body);
    res.json({
      message: 'Marca actualizada exitosamente',
      data: updatedBrand
    });
  } catch (error) {
    if (error.message === 'Marca no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marca actualizada parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error del servidor
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBrand = await brandsService.patchBrand(id, updates);
    res.json({
      message: 'Marca actualizada parcialmente',
      data: updatedBrand
    });
  } catch (error) {
    if (error.message === 'Marca no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca a eliminar
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *       400:
 *         description: No se puede eliminar, tiene productos asociados
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await brandsService.deleteBrand(id);
    res.json({
      message: 'Marca eliminada exitosamente',
      data: result
    });
  } catch (error) {
    if (error.message === 'Marca no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('No se puede eliminar')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;
