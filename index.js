const express = require("express");
const users = require("./users");
const recipes = require("./recipes");
var mongoose = require("./conexion");
const {log, test} = require('./middlewares/logs')
var Consignador = require("./models/User");

const app = express();
const port = 3000;

app.use(express.json());

app.use(log, test);
app.use(express.static(__dirname+'/public'))
app.use("/api/User", users);
app.use("/api/Recipe", recipes);

app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
