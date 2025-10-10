const productsRouter = require('./products_router');
const usersRouter = require('./users_router');
const categoryRouter = require('./category_router');
const brandRouter = require('./brand_router');
const moviesRouter = require('./movies_router');

function routerApi(app) {
  console.log('✅ Cargando rutas...');

  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoryRouter);
  app.use('/brands', brandRouter);
  app.use('/movies', moviesRouter);


  console.log('✅ Todas las rutas cargadas correctamente');
}

module.exports = routerApi;
