const router = require("express").Router();
const fs = require('fs')
const path = require('path')
const Recipe = require("./models/Recipe");
const jwt = require("jsonwebtoken");
const { route } = require("./users");
const { restart } = require("nodemon");
const { test } = require("./middlewares/logs");

const secret = "gH$iDa&T0Gr3&@kTcly09DB#$FcC3tNGBQvVCf@M";

function authPer(token) {
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return 
    }
    let reg=[];
    reg.push(decoded.rol);
    reg.push(decoded.email);
    return reg;
  }

router.get('/', async(req,res)=>{
    let {sk}=req.query;
    let {nombre,ingredientes,categoria, utencilios,correo,etiquetas}= req.body;
    let filtro={};
    let and=[];
    if(nombre)
        filtro.nombre = new RegExp(nombre,'i')
    if(ingredientes){
        
        ingredientes.map(inge=>{
            and.push({'ingredientes.nombre': new RegExp(inge,'i')});
        })
        console.log(and);
        filtro.$and=and;
    }
    if(categoria){
        categoria.map(cat=>{
            and.push({categoria: new RegExp(cat,'i')});
        })
        console.log(and);
        filtro.$and=and;
    }
    if(utencilios){
        utencilios.map(uti=>{
            and.push({utencilios: new RegExp(uti,'i')});
        })
        console.log(and);
        filtro.$and=and;
    }
    if(etiquetas){
        utencilios.map(uti=>{
            and.push({etiquetas: new RegExp(uti,'i')});
        })
        console.log(and);
        filtro.$and=and;
    }
    if(correo){
        let token = req.headers["x-auth"];
        let us=authPer(token);
        console.log(us);
        if(us[0]!="admin"){
            if(us[1]!=correo){
                res.status(401).send({error: "Usuario no autorizado"})
            return
            } 
        }else{
            filtro.correo = correo;
        }
    }
    //console.log(filtro);
    let lista= await Recipe.getRecipe(filtro,sk);
    if(lista[0]){
        res.status(200).send(lista);
        return;
    }else{
        res.status(404).send({error: "No se encontro ninguna receta"})
    }
})

router.post('/', async(req,res)=>{
    let token = req.headers["x-auth"];
    let us=authPer(token);
    console.log(us);
    if(us[0]=="regular"){
        res.status(401).send({error: "Usuario no autorizado"})
        return
    }
    let {nombre,ingredientes,receta, categoria, utencilios,correo,url}= req.body;
    let newRecipe={nombre,ingredientes,receta, categoria, utencilios,correo}
    let faltan= Object.keys(newRecipe).filter(prop=> newRecipe[prop]==undefined).join();
    if(faltan){
        res.status(400).send(`Falta: ${faltan}`);
        return;
    }
    let doc = await Recipe.guardarrecipe({nombre,ingredientes,receta,categoria, utencilios,correo,url})
        if(doc && !doc.error ){
            res.status(201).send(doc)
        }else{
            res.status(400).send(doc)
        }
        return;
})

router.get('/:id', async(req,res)=>{
    console.log(req.params.id);
    let token = req.headers["x-auth"];
    let us=authPer(token);
    console.log(us);
    if(!us){
        res.status(401).send({error: "Usuario no ingresado"})
        return
    }
    let doc = await Recipe.getRecipe({_id : req.params.id});
    if(doc[0]){
        res.status(200).send(doc);
        return;
    }else{
        res.status(404).send({error: "No se encontro ninguna receta"})
    }
})

router.put('/:id', async (req,res)=>{
    let token = req.headers["x-auth"];
    let us=authPer(token);
    console.log(us);
    let receta = await Recipe.getRecipe({_id : req.params.id});
    if(us[0]!="admin"){
        let e=receta[0].correo.includes(us[1]);
        if(!e){
            console.log(receta[0].correo.includes(us[1]));
            res.status(401).send({error: "Usuario no autorizado"})
            return
        } 
    }
    if(!receta[0]){
        res.status(404).send({error: "No se encontro la receta a actualizar"})
           return;
    }else{
        let {nombre,ingredientes,receta, categoria, utencilios,url}= req.body;
        let doc= await Recipe.updateRecipe(req.params.id,{nombre,ingredientes,receta, categoria, utencilios,url});
        res.send(doc);
    }
})

router.delete('/:id', async (req,res)=>{
    let token = req.headers["x-auth"];
    let us=authPer(token);
    console.log(us);
    let receta = await Recipe.getRecipe({_id : req.params.id});
    if(us[0]!="admin"){
        if(us[1]!=receta.correo){
            res.status(401).send({error: "Usuario no autorizado"});
        return
        }
    } 
    if(!receta[0]){
        res.status(404).send({error: "Receta no encontrada"});
        return
    }else{
        await Recipe.deleteRecipe(req.params.id);
        res.status(200).send({alert: "Se ha eliminado"});
        return
    }
})
module.exports = router;