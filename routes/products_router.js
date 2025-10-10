const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();
const productsService = new ProductsService();

// GET - Todos los productos
router.get("/", (req, res) => {
  const products = productsService.getProducts();
  res.json(products);
});

// GET - Producto por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = productsService.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// GET - Productos por categoría
router.get("/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  const categoryProducts = productsService.getProductsByCategory(categoryId);
  res.json(categoryProducts);
});

// GET - Productos por marca
router.get("/brand/:brandId", (req, res) => {
  const { brandId } = req.params;
  const brandProducts = productsService.getProductsByBrand(brandId);
  res.json(brandProducts);
});
/*
// POST - Crear producto
router.post("/", (req, res) => {
  try {
    const { name, price, image, description, stock, categoryId, brandId } = req.body;
    const newProduct = productsService.createProduct({
      name,
      price,
      image,
      description,
      stock,
      categoryId,
      brandId
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      data: newProduct
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
*/
//Nuevo post con logica en service
router.post('/' , (req, res) => {
  const body = req.body;
  const newProduct = productsService.createProduct(body);
  res.status(201).json({
    message: 'Producto creado',
    data: newProduct
  });
});


/*
// PUT - Actualizar producto completo
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, description, stock, categoryId, brandId } = req.body;

    const updatedProduct = productsService.updateProduct(id, {
      name,
      price,
      image,
      description,
      stock,
      categoryId,
      brandId
    });

    res.json({
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});
*/
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedProduct = productsService.updateProduct(id, body);
    res.json({
      message: 'Producto actualizado',
      data: updatedProduct
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
/*
// PATCH - Actualizar producto parcialmente
router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = productsService.updateProduct(id, updates);

    res.json({
      message: 'Producto actualizado parcialmente',
      data: updatedProduct
    });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});
*/
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = productsService.patchProduct(id, updates);

    res.json({
      message: 'Producto actualizado parcialmente',
      data: updatedProduct
    });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar producto
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = productsService.deleteProduct(id);

    res.json({
      message: 'Producto eliminado exitosamente',
      data: deletedProduct
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
