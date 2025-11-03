const faker = require('faker');

function generateData() {
  console.log('Generando datos...');

  // Generar brands con IDs locales - DIRECTAMENTE en global
  global.brands = [];
  for (let i = 0; i < 50; i++) {
    global.brands.push({
      id: String(i+1),
      brandName: faker.company.companyName(),
      description: faker.company.catchPhrase(),
      active: faker.datatype.boolean(),
    });
  }

  // Generar categories con IDs locales - DIRECTAMENTE en global
  global.categories = [];
  for (let i = 0; i < 50; i++) {
    global.categories.push({
      id: String(i+1),
      categoryName: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      active: faker.datatype.boolean(),
    });
  }

  // Generar products con IDs locales - DIRECTAMENTE en global
  global.products = [];
  for (let i = 0; i < 100; i++) {
    const randomBrand = global.brands[Math.floor(Math.random() * global.brands.length)];
    const randomCategory = global.categories[Math.floor(Math.random() * global.categories.length)];
    global.products.push({
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

  // Generar users con IDs locales - DIRECTAMENTE en global
  global.users = [];
  for (let i = 0; i < 50; i++) {
    global.users.push({
      id: String(i+1),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      active: faker.datatype.boolean(),
    });
  }

  console.log('Datos generados exitosamente');
  console.log('Brands:', global.brands.length);
  console.log('Categories:', global.categories.length);
  console.log('Products:', global.products.length);
  console.log('Users:', global.users.length);
}

module.exports = generateData;
