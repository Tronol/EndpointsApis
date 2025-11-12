const Product = require('../models/Product'); // Asegúrate de que la ruta sea correcta
const Category = require('../models/Category');
const Brand = require('../models/Brand');

class ProductsService {
  constructor() {
    console.log('ProductsService inicializado con MongoDB');
  }

  async getProducts() {
    try {
      const products = await Product.find()
        .populate('categoryId', 'categoryName')
        .populate('brandId', 'brandName');
      return products;
    } catch (error) {
      throw new Error('Error al obtener productos: ' + error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id)
        .populate('categoryId', 'categoryName')
        .populate('brandId', 'brandName');
      return product;
    } catch (error) {
      throw new Error('Error al obtener producto: ' + error.message);
    }
  }

  async getProductsByCategory(categoryId) {
    try {
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        throw new Error('Categoría no encontrada');
      }

      const products = await Product.find({ categoryId })
        .populate('categoryId', 'categoryName')
        .populate('brandId', 'brandName');
      return products;
    } catch (error) {
      throw new Error('Error al obtener productos por categoría: ' + error.message);
    }
  }

  async getProductsByBrand(brandId) {
    try {
      const brandExists = await Brand.findById(brandId);
      if (!brandExists) {
        throw new Error('Marca no encontrada');
      }

      const products = await Product.find({ brandId })
        .populate('categoryId', 'categoryName')
        .populate('brandId', 'brandName');
      return products;
    } catch (error) {
      throw new Error('Error al obtener productos por marca: ' + error.message);
    }
  }

  async createProduct(productData) {
    try {
      if (!productData.name || !productData.price || !productData.categoryId || !productData.brandId) {
        throw new Error('Nombre, precio, categoryId y brandId son requeridos');
      }

      const categoryExists = await Category.findById(productData.categoryId);
      const brandExists = await Brand.findById(productData.brandId);

      if (!categoryExists) {
        throw new Error('Categoría no encontrada');
      }
      if (!brandExists) {
        throw new Error('Marca no encontrada');
      }

      const newProduct = new Product({
        name: productData.name,
        price: parseFloat(productData.price),
        image: productData.image || '',
        description: productData.description || '',
        stock: productData.stock ? parseInt(productData.stock) : 0,
        categoryId: productData.categoryId,
        brandId: productData.brandId
      });

      await newProduct.save();

      // Retornar el producto con los datos poblados
      const populatedProduct = await Product.findById(newProduct._id)
        .populate('categoryId', 'categoryName')
        .populate('brandId', 'brandName');

      return populatedProduct;
    } catch (error) {
      throw new Error('Error al crear producto: ' + error.message);
    }
  }

  async updateProduct(id, productData) {
    try {
      if (productData.categoryId) {
        const categoryExists = await Category.findById(productData.categoryId);
        if (!categoryExists) {
          throw new Error('Categoría no encontrada');
        }
      }

      if (productData.brandId) {
        const brandExists = await Brand.findById(productData.brandId);
        if (!brandExists) {
          throw new Error('Marca no encontrada');
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        productData,
        { new: true, runValidators: true }
      ).populate('categoryId', 'categoryName')
       .populate('brandId', 'brandName');

      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }

      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar producto: ' + error.message);
    }
  }

  async patchProduct(id, updates) {
    try {
      if (updates.categoryId) {
        const categoryExists = await Category.findById(updates.categoryId);
        if (!categoryExists) {
          throw new Error('Categoría no encontrada');
        }
      }

      if (updates.brandId) {
        const brandExists = await Brand.findById(updates.brandId);
        if (!brandExists) {
          throw new Error('Marca no encontrada');
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      ).populate('categoryId', 'categoryName')
       .populate('brandId', 'brandName');

      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }

      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar producto: ' + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw new Error('Producto no encontrado');
      }

      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar producto: ' + error.message);
    }
  }
}

module.exports = ProductsService;
