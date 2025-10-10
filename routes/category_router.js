const express = require('express');
const router = express.Router();
const CategoriesService = require('../services/categoryService');
const categoriesService = new CategoriesService();

// GET ALL
router.get("/", (req, res) => {
  try {
    const categories = categoriesService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// GET BY ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = categoriesService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
});

// CREATE
router.post("/", (req, res) => {
  try {
    const body = req.body;

    // Validación básica en el router también
    if (!body.categoryName) {
      return res.status(400).json({ error: 'categoryName es requerido' });
    }

    const newCategory = categoriesService.createCategory(body);
    res.status(201).json({
      message: 'Categoría creada exitosamente',
      data: newCategory
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE (PUT) - Actualización completa
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Validación básica
    if (!body.categoryName) {
      return res.status(400).json({ error: 'categoryName es requerido' });
    }

    const updatedCategory = categoriesService.updateCategory(id, body);
    res.json({
      message: 'Categoría actualizada exitosamente',
      data: updatedCategory
    });
  } catch (error) {
    if (error.message === 'Categoría no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

// PATCH - Actualización parcial
router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCategory = categoriesService.patchCategory(id, updates);
    res.json({
      message: 'Categoría actualizada parcialmente',
      data: updatedCategory
    });
  } catch (error) {
    if (error.message === 'Categoría no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = categoriesService.deleteCategory(id);
    res.json({
      message: 'Categoría eliminada exitosamente',
      data: deletedCategory
    });
  } catch (error) {
    if (error.message === 'Categoría no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
