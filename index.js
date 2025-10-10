const express = require('express');
const app = express();
const routerApi = require('./routes/rutas');
const { ro } = require('faker/lib/locales');
const generateData = require('./GenerateData');
const port = 3000;

//generateData();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Un servidor mas mi gente!');
});

routerApi(app);
app.listen(port, () => {
  console.log(`Servidor en linea en en http://localhost:${port}`);
});

/*
app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId
    }
  );
});
// localhost:3000/users?username=Juan&lastname=Perez

app.get("/users", (req, res) => {
  const {username, lastname}= req.query;
  if (username && lastname) {
    res.json(
      {
        username,
        lastname
      }
    );
  } else {
    res.send("No hay parametros query");
  }
});
*/
