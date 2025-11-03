const express = require('express');
const app = express();
const routerApi = require('./routes/rutas');
const generateData = require('./generateData');
const setupSwagger = require('./swagger');
const port = 3000;
const {logError, errorHandler} = require ('./middlewares/errorHandler');

// 1. SOLO llamar generateData() - crea las variables globales directamente
console.log('Inicializando datos globales...');
generateData();
console.log('Datos globales inicializados exitosamente');

// 2. LUEGO el middleware de express
app.use(express.json());

// 3. Ruta básica
app.get('/', (req, res) => {
  res.send('Un servidor mas mi gente!');
});

// 4. Configurar rutas
routerApi(app);

// 5. Configurar Swagger
setupSwagger(app);

// 6. Middlewares de error (al final)
app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor en linea en http://localhost:${port}`);
  console.log(`Documentación de la API en http://localhost:${port}/api-docs/`);
  console.log(`Datos cargados: ${global.products.length} productos, ${global.brands.length} marcas, ${global.categories.length} categorías, ${global.users.length} usuarios`);
});
