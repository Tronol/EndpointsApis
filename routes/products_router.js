const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();
const productsService = new ProductsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         image:
 *           type: string
 *           description: URL de la imagen del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         stock:
 *           type: integer
 *           description: Cantidad en stock
 *         categoryId:
 *           type: string
 *           description: ID de la categoría
 *         brandId:
 *           type: string
 *           description: ID de la marca
 *       required:
 *         - name
 *         - price
 *         - categoryId
 *         - brandId
 *       example:
 *         id: "1"
 *         name: "Laptop Gaming"
 *         price: 999.99
 *         image: "https://example.com/image.jpg"
 *         description: "Laptop para gaming de alta gama"
 *         stock: 10
 *         categoryId: "1"
 *         brandId: "1"
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestión de productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res, next) => {
  try {
    const products = await productsService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Obtener productos por categoría
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos en la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor
 */
router.get("/category/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryProducts = await productsService.getProductsByCategory(categoryId);
    res.json(categoryProducts);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/brand/{brandId}:
 *   get:
 *     summary: Obtener productos por marca
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Lista de productos de la marca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor
 */
router.get("/brand/:brandId", async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const brandProducts = await productsService.getProductsByBrand(brandId);
    res.json(brandProducts);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *               - brandId
 *             example:
 *               name: "Nuevo Producto"
 *               price: 99.99
 *               image: "https://example.com/image.jpg"
 *               description: "Descripción del nuevo producto"
 *               stock: 50
 *               categoryId: "1"
 *               brandId: "1"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await productsService.createProduct(body);
    res.status(201).json({
      message: 'Producto creado exitosamente',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto completamente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProduct = await productsService.updateProduct(id, body);
    res.json({
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               stock:
 *                 type: integer
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = await productsService.patchProduct(id, updates);
    res.json({
      message: 'Producto actualizado parcialmente',
      data: updatedProduct
    });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteProduct(id);
    res.json({
      message: 'Producto eliminado exitosamente',
      data: deletedProduct
    });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = router;
