const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');

// Indico a node donde están los archivos estáticos
app.use(express.static(path.resolve(__dirname, "..", "public")));
// Dispongo EJS como motor de plantilla
app.set("view engine", "ejs");
//URL encode  - Para que pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: true }));
// Para poder utilizar otros métodos a parte de GET y POST (put, delete, etc.)
app.use(methodOverride('_method'));

// Requiero mis rutas
const webRoutes = require("./routes/web");
// Uso mis rutas
app.use(webRoutes);

//Activar servidor
app.listen(3000, "localhost", () =>
  console.log("servidor corriendo en el puerto 3000")
);
