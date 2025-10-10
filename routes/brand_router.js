const express = require('express');
const BrandsService = require('../services/brandsService'); // Cambia a BrandsService
const router = express.Router();
const brandService = new BrandsService(); // ¡CREA LA INSTANCIA!

// GET ALL
router.get("/", (req, res) => {
  try {
    const brands = brandService.getBrands();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
});

// GET BY ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const brand = brandService.getBrandById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marca' });
  }
});

// CREATE
router.post("/", (req, res) => {
  try {
    const body = req.body;

    // Validación básica
    if (!body.brandName) {
      return res.status(400).json({ error: 'brandName es requerido' });
    }

    const newBrand = brandService.createBrand(body);
    res.status(201).json({
      message: 'Marca creada exitosamente',
      data: newBrand
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE (PUT)
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Validación básica
    if (!body.brandName) {
      return res.status(400).json({ error: 'brandName es requerido' });
    }

    const updatedBrand = brandService.updateBrand(id, body);
    res.json({
      message: 'Marca actualizada exitosamente',
      data: updatedBrand
    });
  } catch (error) {
    if (error.message === 'Marca no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

// PATCH
router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validación: si se envía brandName, no puede estar vacío
    if (updates.brandName !== undefined && !updates.brandName) {
      return res.status(400).json({ error: 'brandName no puede estar vacío' });
    }

    const updatedBrand = brandService.patchBrand(id, updates);
    res.json({
      message: 'Marca actualizada parcialmente',
      data: updatedBrand
    });
  } catch (error) {
    if (error.message === 'Marca no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = brandService.deleteBrand(id);
    res.json({
      message: 'Marca eliminada exitosamente',
      data: result
    });
  } catch (error) {
    if (error.message === 'Marca no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
