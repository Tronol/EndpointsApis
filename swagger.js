// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuración de swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación API",
    version: "1.0.0", // This is your API version, not React version
    description: "Documentación de la API utilizando Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desarrollo",
    },
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Make sure this path matches your route files
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
