class BrandsService {
  constructor() {
    console.log('BrandsService inicializado');
  }

  async getBrands() {
    return new Promise((resolve) => {
      resolve(global.brands);
    });
  }

  async getBrandById(id) {
    return new Promise((resolve) => {
      const brand = global.brands.find(item => item.id === id);
      resolve(brand || null);
    });
  }

  async createBrand(brandData) {
    return new Promise((resolve, reject) => {
      if (!brandData.brandName) {
        reject(new Error('brandName es requerido'));
        return;
      }

      const newBrand = {
        id: String(global.brands.length + 1),
        brandName: brandData.brandName,
        description: brandData.description || '',
        active: brandData.active !== undefined ? brandData.active : true
      };

      global.brands.push(newBrand);
      resolve(newBrand);
    });
  }

  async updateBrand(id, changes) {
    return new Promise((resolve, reject) => {
      const index = global.brands.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      if (changes.brandName !== undefined && !changes.brandName) {
        reject(new Error('brandName es requerido'));
        return;
      }

      const updatedBrand = {
        ...global.brands[index],
        ...changes
      };
      global.brands[index] = updatedBrand;
      resolve(updatedBrand);
    });
  }

  async patchBrand(id, changes) {
    return new Promise((resolve, reject) => {
      const index = global.brands.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      if (changes.brandName !== undefined && !changes.brandName) {
        reject(new Error('brandName no puede estar vacío'));
        return;
      }

      const patchedBrand = {
        ...global.brands[index],
        ...changes
      };
      global.brands[index] = patchedBrand;
      resolve(patchedBrand);
    });
  }

  async deleteBrand(id) {
    return new Promise((resolve, reject) => {
      const index = global.brands.findIndex(item => item.id === id);
      if (index === -1) {
        reject(new Error('Marca no encontrada'));
        return;
      }

      const hasAssociatedProducts = global.products.some(product => product.brandId === id);
      if (hasAssociatedProducts) {
        reject(new Error('No se puede eliminar la marca porque tiene productos asociados'));
        return;
      }

      const deletedBrand = global.brands.splice(index, 1)[0];
      resolve(deletedBrand);
    });
  }
}

module.exports = BrandsService;
