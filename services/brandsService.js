const faker = require('faker');

class BrandsService {
  constructor() {
    this.brands = [];
    this.generateData();
  }

  generateData() {
    console.log('Generando datos de marcas...');
    for (let i = 0; i < 50; i++) {
      this.brands.push({
        id: String(i + 1),
        brandName: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        active: faker.datatype.boolean(),
      });
    }
    console.log('Datos de marcas generados exitosamente');
  }

  getBrands() {
    return this.brands;
  }

  getBrandById(id) {
    const brand = this.brands.find(item => item.id === id);
    return brand || null;
  }

  createBrand(brandData) {
    // Validar que brandName esté presente
    if (!brandData.brandName) {
      throw new Error('brandName es requerido');
    }

    const newBrand = {
      id: String(this.brands.length + 1),
      brandName: brandData.brandName,
      description: brandData.description || '',
      active: brandData.active !== undefined ? brandData.active : true
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  updateBrand(id, changes) {
    const index = this.brands.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Marca no encontrada');
    }

    // Validar que brandName esté presente si se está actualizando
    if (changes.brandName !== undefined && !changes.brandName) {
      throw new Error('brandName es requerido');
    }

    const updatedBrand = {
      ...this.brands[index],
      ...changes
    };
    this.brands[index] = updatedBrand;
    return updatedBrand;
  }

  patchBrand(id, changes) {
    const index = this.brands.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Marca no encontrada');
    }

    // Validar que brandName no sea vacío si se está actualizando
    if (changes.brandName !== undefined && !changes.brandName) {
      throw new Error('brandName no puede estar vacío');
    }

    const patchedBrand = {
      ...this.brands[index],
      ...changes
    };
    this.brands[index] = patchedBrand;
    return patchedBrand;
  }

  deleteBrand(id) {
    const index = this.brands.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Marca no encontrada');
    }
    const deletedBrand = this.brands.splice(index, 1)[0];
    return deletedBrand;
  }
}

module.exports = BrandsService;
