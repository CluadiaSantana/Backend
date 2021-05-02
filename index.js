const express = require("express");
const users = require("./users");
var mongoose = require("./conexion");
var Consignador = require("./models/User");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", users);

app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
