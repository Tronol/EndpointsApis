const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.brands = [];
    this.categories = [];
    this.generateData();
  }

  generateData() {
    console.log('Generando datos de productos...');

    // Generar brands
    for (let i = 0; i < 50; i++) {
      this.brands.push({
        id: String(i+1),
        brandName: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        active: faker.datatype.boolean(),
      });
    }

    // Generar categories
    for (let i = 0; i < 50; i++) {
      this.categories.push({
        id: String(i+1),
        categoryName: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        active: faker.datatype.boolean(),
      });
    }

    // Generar products
    for (let i = 0; i < 100; i++) {
      const randomBrand = this.brands[Math.floor(Math.random() * this.brands.length)];
      const randomCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
      this.products.push({
        id: String(i+1),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        stock: faker.datatype.number({ 'min': 0, 'max': 100 }),
        categoryId: randomCategory.id,
        brandId: randomBrand.id,
      });
    }

    console.log('Datos de productos generados exitosamente');
    console.log('Brands:', this.brands.length);
    console.log('Categories:', this.categories.length);
    console.log('Products:', this.products.length);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(categoryId) {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  getProductsByBrand(brandId) {
    return this.products.filter(product => product.brandId === brandId);
  }

  createProduct(productData) {
    // Validar campos requeridos
    if (!productData.name || !productData.price || !productData.categoryId || !productData.brandId) {
      throw new Error('Nombre, precio, categoryId y brandId son requeridos');
    }

    // Verificar que categoryId y brandId existan
    const categoryExists = this.categories.find(c => c.id === productData.categoryId);
    const brandExists = this.brands.find(b => b.id === productData.brandId);

    if (!categoryExists) {
      throw new Error('Categoría no encontrada');
    }
    if (!brandExists) {
      throw new Error('Marca no encontrada');
    }

    // Generar nuevo ID
    const newId = String(this.products.length + 1);

    const newProduct = {
      id: newId,
      name: productData.name,
      price: parseFloat(productData.price),
      image: productData.image || faker.image.imageUrl(),
      description: productData.description || '',
      stock: productData.stock ? parseInt(productData.stock) : 0,
      categoryId: productData.categoryId,
      brandId: productData.brandId
    };

    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, productData) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Validar categoryId y brandId si se proporcionan
    if (productData.categoryId) {
      const categoryExists = this.categories.find(c => c.id === productData.categoryId);
      if (!categoryExists) {
        throw new Error('Categoría no encontrada');
      }
    }

    if (productData.brandId) {
      const brandExists = this.brands.find(b => b.id === productData.brandId);
      if (!brandExists) {
        throw new Error('Marca no encontrada');
      }
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...productData
    };

    return this.products[productIndex];
  }

  patchProduct(id, updates) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Validar categoryId y brandId si se proporcionan
    if (updates.categoryId) {
      const categoryExists = this.categories.find(c => c.id === updates.categoryId);
      if (!categoryExists) {
        throw new Error('Categoría no encontrada');
      }
    }

    if (updates.brandId) {
      const brandExists = this.brands.find(b => b.id === updates.brandId);
      if (!brandExists) {
        throw new Error('Marca no encontrada');
      }
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updates
    };

    return this.products[productIndex];
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    return deletedProduct;
  }
}

module.exports = ProductsService;
