class CategoriesService {
  constructor() {
    console.log('CategoriesService inicializado');
  }

  async getCategories() {
    return new Promise((resolve) => {
      resolve(global.categories);
    });
  }

  async getCategoryById(id) {
    return new Promise((resolve) => {
      const category = global.categories.find(item => item.id === id);
      resolve(category || null);
    });
  }

  async createCategory(categoryData) {
    return new Promise((resolve, reject) => {
      if (!categoryData.categoryName) {
        reject(new Error('categoryName es requerido'));
        return;
      }

      const newCategory = {
        id: String(global.categories.length + 1),
        categoryName: categoryData.categoryName,
        description: categoryData.description || '',
        active: categoryData.active !== undefined ? categoryData.active : true
      };

      global.categories.push(newCategory);
      resolve(newCategory);
    });
  }

  async updateCategory(id, changes) {
    return new Promise((resolve, reject) => {
      const index = global.categories.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Categoría no encontrada'));
        return;
      }

      if (changes.categoryName !== undefined && !changes.categoryName) {
        reject(new Error('categoryName es requerido'));
        return;
      }

      const updatedCategory = {
        ...global.categories[index],
        ...changes
      };
      global.categories[index] = updatedCategory;
      resolve(updatedCategory);
    });
  }

  async patchCategory(id, changes) {
    return new Promise((resolve, reject) => {
      const index = global.categories.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Categoría no encontrada'));
        return;
      }

      if (changes.categoryName !== undefined && !changes.categoryName) {
        reject(new Error('categoryName no puede estar vacío'));
        return;
      }

      const patchedCategory = {
        ...global.categories[index],
        ...changes
      };
      global.categories[index] = patchedCategory;
      resolve(patchedCategory);
    });
  }

  async deleteCategory(id) {
    return new Promise((resolve, reject) => {
      const index = global.categories.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Categoría no encontrada'));
        return;
      }

      const hasAssociatedProducts = global.products.some(product => product.categoryId === id);
      if (hasAssociatedProducts) {
        reject(new Error('No se puede eliminar la categoría porque tiene productos asociados'));
        return;
      }

      const deletedCategory = global.categories.splice(index, 1)[0];
      resolve(deletedCategory);
    });
  }
}

module.exports = CategoriesService;
