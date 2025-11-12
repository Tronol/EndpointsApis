const Category = require('../models/Category'); // Asegúrate de que la ruta sea correcta
const Product = require('../models/Product');

class CategoriesService {
  constructor() {
    console.log('CategoriesService inicializado con MongoDB');
  }

  async getCategories() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw new Error('Error al obtener categorías: ' + error.message);
    }
  }

  async getCategoryById(id) {
    try {
      const category = await Category.findById(id);
      return category || null;
    } catch (error) {
      throw new Error('Error al obtener categoría: ' + error.message);
    }
  }

  async createCategory(categoryData) {
    try {
      if (!categoryData.categoryName) {
        throw new Error('categoryName es requerido');
      }

      const newCategory = new Category({
        categoryName: categoryData.categoryName,
        description: categoryData.description || '',
        active: categoryData.active !== undefined ? categoryData.active : true
      });

      await newCategory.save();
      return newCategory;
    } catch (error) {
      throw new Error('Error al crear categoría: ' + error.message);
    }
  }

  async updateCategory(id, changes) {
    try {
      if (changes.categoryName !== undefined && !changes.categoryName) {
        throw new Error('categoryName es requerido');
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        changes,
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        throw new Error('Categoría no encontrada');
      }

      return updatedCategory;
    } catch (error) {
      throw new Error('Error al actualizar categoría: ' + error.message);
    }
  }

  async patchCategory(id, changes) {
    try {
      if (changes.categoryName !== undefined && !changes.categoryName) {
        throw new Error('categoryName no puede estar vacío');
      }

      const patchedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: changes },
        { new: true, runValidators: true }
      );

      if (!patchedCategory) {
        throw new Error('Categoría no encontrada');
      }

      return patchedCategory;
    } catch (error) {
      throw new Error('Error al actualizar categoría: ' + error.message);
    }
  }

  async deleteCategory(id) {
    try {
      const hasAssociatedProducts = await Product.exists({ categoryId: id });
      if (hasAssociatedProducts) {
        throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
      }

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        throw new Error('Categoría no encontrada');
      }

      return deletedCategory;
    } catch (error) {
      throw new Error('Error al eliminar categoría: ' + error.message);
    }
  }
}

module.exports = CategoriesService;
