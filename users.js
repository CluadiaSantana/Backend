const router = require("express").Router();
const User = require("./models/User");
const bcrypt = require("bcrypt");
const Usuario = require("./models/User");
const jwt = require("jsonwebtoken");

const secret = "gH$iDa&T0Gr3&@kTcly09DB#$FcC3tNGBQvVCf@M";

function authUser(req, res, next) {
  let token = req.headers["x-auth"];
  if (!token)
    return res
      .status(401)
      .send("Usuario no autenticado, utiliza el header 'x-auth'");

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    return res.status(401).send("Token invalido");
  }
  req.decoded = decoded;
  next();
}

function authAdmin(req, res, next) {
  let token = req.headers["x-auth"];
  if (!token)
    return res
      .status(401)
      .send("Usuario no autenticado, utiliza el header 'x-auth'");

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    return res.status(401).send("Token invalido");
  }
  if (decoded.rol == "admin") {
    req.decoded = decoded;
    return next();
  }
  return res.status(401).send("Usuario no autorizado");
}

router.post("/User", async (req, res) => {
  let { username, email, password, nombre, apellido } = req.body;
  var faltantes = [];
  if (!username) faltantes.push("Usuario");
  if (!email) faltantes.push("Correo");
  if (!password) faltantes.push("Contraseña");
  if (!nombre) faltantes.push("Nombre");
  if (!apellido) faltantes.push("Apellido");
  if (faltantes.length > 0)
    res
      .status(400)
      .send("Faltaron los siguientes campos: " + faltantes.join(", "));

  let hashedPassword = bcrypt.hashSync(password, 10);
  let tempUser = {
    username,
    email,
    nombre: nombre + " " + apellido,
    password: hashedPassword,
  };
  let comprobacion = await Usuario.findOne({
    $or: [{ email }, { username }],
  }).then((user) => {
    return user;
  });
  if (comprobacion)
    return res
      .status(400)
      .send(
        comprobacion.email == email
          ? "Ya existe un usuario con ese correo"
          : "Ya existe un usuario con ese usuername"
      );

  let usuario = new User(tempUser);

  usuario.save();
  res.send(usuario);
});

router.get("/", authAdmin, async (req, res) => {
  if (req.query.nombre) {
    return Usuario.find({
      nombre: { $regex: req.query.nombre },
    }).then((Usuarios) => res.send(Usuarios));
  }
  return Usuario.find().then((Usuarios) => res.send(Usuarios));
});

router.delete("/:email", authAdmin, async (req, res) => {
  let comprobacion = await Usuario.findOne({ email: req.params.email }).then(
    (user) => {
      return user;
    }
  );
  if (!comprobacion) return res.status(404).send("El usuario no existe");
  let err = await Usuario.deleteOne(
    { email: req.params.email },
    function (err) {
      if (err) return err;
      // deleted at most one tank document
    }
  );
  if (err) return res.status(400).send("Hubo un error al eliminar");
  res.send("Usuario eliminado");
});

router.put("/:email", async (req, res) => {
  let update = {};
  let token = req.headers["x-auth"];
  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    return res.status(401).send(err);
  }
  if (decoded.rol == "admin") {
    if (req.body.nombre) update.nombre = req.body.nombre;
    if (req.body.email) update.email = req.body.email;
    if (req.body.rol) update.rol = req.body.rol;
    if (req.body.password)
      update.password = bcrypt.hashSync(req.body.password, 10);
    (
      await Usuario.findOneAndUpdate({ email: req.params.email }, update)
    ).save();
    return res.send("usuario actualizado");
  }
  if (decoded.email != req.params.email)
    return res.status(401).send("No aturoizado");

  if (req.body.nombre) update.nombre = req.body.nombre;
  if (req.body.email) update.email = req.body.email;
  if (req.body.password)
    update.password = bcrypt.hashSync(req.body.password, 10);

  Usuario.findOneAndUpdate({ email: req.params.email }, update).then((user) => {
    if (!user) return res.status(404).send("Usuario no encontrado");
    user.save();
    res.send("Usuario actualizado");
  });
});

router.post("/Login", async (req, res) => {
  let { email, password } = req.body;
  var faltantes = [];
  if (!email) faltantes.push("Correo");
  if (!password) faltantes.push("Contraseña");
  if (faltantes.length > 0)
    res
      .status(400)
      .send("Faltaron los siguientes campos: " + faltantes.join(", "));

  let user = await Usuario.findOne({ email }).then((user) => {
    return user;
  });
  if (!user)
    res.status(401).send("No hay un usuario registrado con ese correo");
  if (!bcrypt.compareSync(password, user.password))
    res.status(401).send("Constraseña incorrecta");

  let response = {
    email: user.email,
    nombre: user.nombre,
    rol: user.rol,
  };
  let token = jwt.sign(response, secret);
  res.send({ token });
});

module.exports = router;
