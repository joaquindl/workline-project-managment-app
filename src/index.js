const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Indico a node donde están los archivos estáticos
app.use(express.static(path.resolve(__dirname, "..", "public")));
// Dispongo EJS como motor de plantilla
app.set("view engine", "ejs");
//URL encode  - Para que pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: true }));
// Para poder utilizar otros métodos a parte de GET y POST (put, delete, etc.)
app.use(methodOverride('_method'));

app.use(session({
  secret : 'topSecret',
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser());

const rememberUser = require ('./middlewares/rememberUser')
app.use(rememberUser);

// Requiero mis rutas
const webRoutes = require("./routes/web");
const usersRoutes = require('./routes/users');
// Uso mis rutas
app.use(webRoutes);
app.use(usersRoutes);

//Activar servidor
app.listen(3000, "localhost", () =>
  console.log("servidor corriendo en el puerto 3000")
);
