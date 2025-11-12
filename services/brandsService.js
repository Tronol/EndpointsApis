const Brand = require('../models/Brand'); // Asegúrate de que la ruta sea correcta
const Product = require('../models/Product');

class BrandsService {
  constructor() {
    console.log('BrandsService inicializado con MongoDB');
  }

  async getBrands() {
    try {
      const brands = await Brand.find();
      return brands;
    } catch (error) {
      throw new Error('Error al obtener marcas: ' + error.message);
    }
  }

  async getBrandById(id) {
    try {
      const brand = await Brand.findById(id);
      return brand || null;
    } catch (error) {
      throw new Error('Error al obtener marca: ' + error.message);
    }
  }

  async createBrand(brandData) {
    try {
      if (!brandData.brandName) {
        throw new Error('brandName es requerido');
      }

      const newBrand = new Brand({
        brandName: brandData.brandName,
        description: brandData.description || '',
        active: brandData.active !== undefined ? brandData.active : true
      });

      await newBrand.save();
      return newBrand;
    } catch (error) {
      throw new Error('Error al crear marca: ' + error.message);
    }
  }

  async updateBrand(id, changes) {
    try {
      if (changes.brandName !== undefined && !changes.brandName) {
        throw new Error('brandName es requerido');
      }

      const updatedBrand = await Brand.findByIdAndUpdate(
        id,
        changes,
        { new: true, runValidators: true }
      );

      if (!updatedBrand) {
        throw new Error('Marca no encontrada');
      }

      return updatedBrand;
    } catch (error) {
      throw new Error('Error al actualizar marca: ' + error.message);
    }
  }

  async patchBrand(id, changes) {
    try {
      if (changes.brandName !== undefined && !changes.brandName) {
        throw new Error('brandName no puede estar vacío');
      }

      const patchedBrand = await Brand.findByIdAndUpdate(
        id,
        { $set: changes },
        { new: true, runValidators: true }
      );

      if (!patchedBrand) {
        throw new Error('Marca no encontrada');
      }

      return patchedBrand;
    } catch (error) {
      throw new Error('Error al actualizar marca: ' + error.message);
    }
  }

  async deleteBrand(id) {
    try {
      const hasAssociatedProducts = await Product.exists({ brandId: id });
      if (hasAssociatedProducts) {
        throw new Error('No se puede eliminar la marca porque tiene productos asociados');
      }

      const deletedBrand = await Brand.findByIdAndDelete(id);

      if (!deletedBrand) {
        throw new Error('Marca no encontrada');
      }

      return deletedBrand;
    } catch (error) {
      throw new Error('Error al eliminar marca: ' + error.message);
    }
  }
}

module.exports = BrandsService;
