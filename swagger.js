// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuración de swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentación API",
    version: "1.0.0",
    description: "Documentación de la API utilizando Swagger",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor de desarrollo",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del usuario"
          },
          email: {
            type: "string",
            description: "Email del usuario"
          },
          username: {
            type: "string",
            description: "Username del usuario"
          },
          password: {
            type: "string",
            description: "Password del usuario"
          },
          active: {
            type: "boolean",
            description: "Estado del usuario"
          }
        }
      },
      Product: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del producto"
          },
          price: {
            type: "number",
            description: "Precio del producto"
          },
          image: {
            type: "string",
            description: "URL de la imagen del producto"
          },
          description: {
            type: "string",
            description: "Descripción del producto"
          },
          stock: {
            type: "number",
            description: "Cantidad en stock"
          },
          categoryId: {
            type: "string",
            description: "ID de la categoría"
          },
          brandId: {
            type: "string",
            description: "ID de la marca"
          }
        }
      },
      Category: {
        type: "object",
        properties: {
          categoryName: {
            type: "string",
            description: "Nombre de la categoría"
          },
          description: {
            type: "string",
            description: "Descripción de la categoría"
          },
          active: {
            type: "boolean",
            description: "Estado de la categoría"
          }
        }
      },
      Brand: {
        type: "object",
        properties: {
          brandName: {
            type: "string",
            description: "Nombre de la marca"
          },
          description: {
            type: "string",
            description: "Descripción de la marca"
          },
          active: {
            type: "boolean",
            description: "Estado de la marca"
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
