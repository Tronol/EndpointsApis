class ProductsService {
  constructor() {
    console.log('ProductsService inicializado');
    // Los datos ya están en global, los usamos directamente
  }

  async getProducts() {
    return new Promise((resolve) => {
      resolve(global.products);
    });
  }

  async getProductById(id) {
    return new Promise((resolve) => {
      const product = global.products.find(product => product.id === id);
      resolve(product);
    });
  }

  async getProductsByCategory(categoryId) {
    return new Promise((resolve) => {
      const categoryProducts = global.products.filter(product => product.categoryId === categoryId);
      resolve(categoryProducts);
    });
  }

  async getProductsByBrand(brandId) {
    return new Promise((resolve) => {
      const brandProducts = global.products.filter(product => product.brandId === brandId);
      resolve(brandProducts);
    });
  }

  async createProduct(productData) {
    return new Promise((resolve, reject) => {
      if (!productData.name || !productData.price || !productData.categoryId || !productData.brandId) {
        reject(new Error('Nombre, precio, categoryId y brandId son requeridos'));
        return;
      }

      const categoryExists = global.categories.find(c => c.id === productData.categoryId);
      const brandExists = global.brands.find(b => b.id === productData.brandId);

      if (!categoryExists) {
        reject(new Error('Categoría no encontrada'));
        return;
      }
      if (!brandExists) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      const newId = String(global.products.length + 1);

      const newProduct = {
        id: newId,
        name: productData.name,
        price: parseFloat(productData.price),
        image: productData.image || '',
        description: productData.description || '',
        stock: productData.stock ? parseInt(productData.stock) : 0,
        categoryId: productData.categoryId,
        brandId: productData.brandId
      };

      global.products.push(newProduct);
      resolve(newProduct);
    });
  }

  async updateProduct(id, productData) {
    return new Promise((resolve, reject) => {
      const productIndex = global.products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      if (productData.categoryId) {
        const categoryExists = global.categories.find(c => c.id === productData.categoryId);
        if (!categoryExists) {
          reject(new Error('Categoría no encontrada'));
          return;
        }
      }

      if (productData.brandId) {
        const brandExists = global.brands.find(b => b.id === productData.brandId);
        if (!brandExists) {
          reject(new Error('Marca no encontrada'));
          return;
        }
      }

      global.products[productIndex] = {
        ...global.products[productIndex],
        ...productData
      };

      resolve(global.products[productIndex]);
    });
  }

  async patchProduct(id, updates) {
    return new Promise((resolve, reject) => {
      const productIndex = global.products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      if (updates.categoryId) {
        const categoryExists = global.categories.find(c => c.id === updates.categoryId);
        if (!categoryExists) {
          reject(new Error('Categoría no encontrada'));
          return;
        }
      }

      if (updates.brandId) {
        const brandExists = global.brands.find(b => b.id === updates.brandId);
        if (!brandExists) {
          reject(new Error('Marca no encontrada'));
          return;
        }
      }

      global.products[productIndex] = {
        ...global.products[productIndex],
        ...updates
      };

      resolve(global.products[productIndex]);
    });
  }

  async deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const productIndex = global.products.findIndex(p => p.id === id);

      if (productIndex === -1) {
        reject(new Error('Producto no encontrado'));
        return;
      }

      const deletedProduct = global.products.splice(productIndex, 1)[0];
      resolve(deletedProduct);
    });
  }
}

module.exports = ProductsService;
