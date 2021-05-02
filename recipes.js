const router = require("express").Router();
const fs = require('fs')
const path = require('path')
const Recipe = require("./models/Recipe");
const jwt = require("jsonwebtoken");

const secret = "gH$iDa&T0Gr3&@kTcly09DB#$FcC3tNGBQvVCf@M";

function authPer(token) {
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).send("Token invalido");
    }
    let reg=[];
    reg.push(decoded.rol);
    reg.push(decoded.email);
    return reg;
  }

router.get('/', async(req,res)=>{
    console.log(req.body);
    let {nombre,ingredientes,categoria, utencilios,correo}= req.body;
    let filtro={};
    if(nombre)
        filtro.nombre = new RegExp(nombre,'i')
    if(ingredientes){

    }

    let lista= await Recipe.getRecipe();
    res.send(lista);
})

router.post('/', async(req,res)=>{
    let token = req.headers["x-auth"];
    let us=authPer(token);
    console.log(us);
    if(us[0]=="regular"){
        res.status(401).send({error: "Usuario no autorizado"})
        return
    }
    let {nombre,ingredientes,receta, categoria, utencilios,correo}= req.body;
    let newRecipe={nombre,ingredientes,receta, categoria, utencilios,correo}
    let faltan= Object.keys(newRecipe).filter(prop=> newRecipe[prop]==undefined).join();
    if(faltan){
        res.status(400).send(`Falta: ${faltan}`);
        return;
    }
    let doc = await Recipe.guardarrecipe({nombre,ingredientes,receta,categoria, utencilios,correo})
        if(doc && !doc.error ){
            res.status(201).send(doc)
        }else{
            res.status(400).send(doc)
        }
        return;
})

// router.get('/', async (req,res)=>{
//     if(nombre)
//         filtro.nombre = new RegExp(nombre,'i');
//     if(ingrediente)
        
// })

module.exports = router;