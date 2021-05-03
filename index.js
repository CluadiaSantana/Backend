const express = require("express");
const users = require("./users");
const recipes = require("./recipes");
var mongoose = require("./conexion");
const {log, test} = require('./middlewares/logs')
var Consignador = require("./models/User");
const Ingrediente = require("./models/Ingredientes");
const Utensilio = require("./models/Utensilios");

const app = express();
const port = 3000;

app.use(express.json());

app.use(log, test);
app.use(express.static(__dirname+'/public'))
app.use("/api/User", users);
app.use("/api/Recipe", recipes);

app.get("/api/Ingrediente" , async (req, res) => {
  let lista= await Ingrediente.getIngredientes();
  res.send(lista);
});

app.get("/api/Utensilio" , async (req, res) => {
  let lista= await Utensilio.getUtensilio();
  res.send(lista);
});

app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
