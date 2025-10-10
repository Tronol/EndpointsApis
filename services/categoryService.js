const faker = require('faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generateData();
  }

  generateData() {
    console.log('Generando datos de categorías...');
    for (let i = 0; i < 50; i++) {
      this.categories.push({
        id: String(i + 1),
        categoryName: faker.commerce.department(),
        description: faker.lorem.sentence(),
        active: faker.datatype.boolean(),
      });
    }
    console.log('Datos de categorías generados exitosamente');
  }

  getCategories() {
    return this.categories;
  }

  getCategoryById(id) {
    const category = this.categories.find(item => item.id === id);
    return category || null;
  }

  createCategory(categoryData) {
    // Validar que categoryName esté presente
    if (!categoryData.categoryName) {
      throw new Error('categoryName es requerido');
    }

    const newCategory = {
      id: String(this.categories.length + 1),
      categoryName: categoryData.categoryName,
      description: categoryData.description || '',
      active: categoryData.active !== undefined ? categoryData.active : true
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  updateCategory(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }

    // Validar que categoryName esté presente si se está actualizando
    if (changes.categoryName !== undefined && !changes.categoryName) {
      throw new Error('categoryName es requerido');
    }

    const updatedCategory = {
      ...this.categories[index],
      ...changes
    };
    this.categories[index] = updatedCategory;
    return updatedCategory;
  }

  patchCategory(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }

    // Validar que categoryName no sea vacío si se está actualizando
    if (changes.categoryName !== undefined && !changes.categoryName) {
      throw new Error('categoryName no puede estar vacío');
    }

    const patchedCategory = {
      ...this.categories[index],
      ...changes
    };
    this.categories[index] = patchedCategory;
    return patchedCategory;
  }

  deleteCategory(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Categoría no encontrada');
    }
    const deletedCategory = this.categories.splice(index, 1)[0]; // [0] para obtener el elemento, no el array
    return deletedCategory;
  }
}

module.exports = CategoriesService;
