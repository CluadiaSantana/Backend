const mongoose= require ('../conexion');

let recipeSchema = mongoose.Schema({
    nombre: {
        type: String,
        requiere: true
    },
    ingredientes:[{
        nombre: String,
        cantidad: String
    }],
    receta:{
        type: String,
        requiere: true
    },
    categoria:{
        type: [String],
        requiere: true
    },
    utencilios:{
        type: [String]
    },
    correo: {
        type: String,
        requiere: true
    },
    imagen: {
        type: String,
        requiere: false
    }
})



recipeSchema.statics.guardarrecipe= async (newrecipe)=>{
    let recipe= new Recipe(newrecipe);
    console.log(newrecipe);
    try{
        let doc = await recipe.save();
        console.log(doc);
        return doc;
    }catch(e){
        console.log("Error al guardar" ,e.code);
        // throw e;
        return {error: 'Fallo al guardar'};
    }
}

recipeSchema.statics.getRecipe= async (filtro)=>{
    console.log(filtro);
    let docs = await Recipe.find(filtro,{'ingredientes._id':0})
    console.log(docs);
    return docs;
}

recipeSchema.statics.updateRecipe = async function(_id, receta ){
    let doc = await Recipe.findOneAndUpdate(
           {_id},
           {$set: receta },
           {new: true, useFindAndModify: false} );
    return doc;
}

recipeSchema.statics.deleteRecipe = async function(_id, receta ){
    await Recipe.findOneAndDelete(
           {_id});
    return;
}

let Recipe= mongoose.model('recipe',recipeSchema);

// Recipe.guardarrecipe({
//     nombre: 'Arroz con leche3',
//     ingredientes:[{nombre:'Arroz', cantidad: '500gr'},{nombre:'Canela', cantidad: '1pz'},{nombre:'Leche', cantidad: '1lt'}],
//     receta:  'Calienta el agua con la canela y cuando suelte el hervor, agrega el arroz Cocina',
//     categoria:'Facil',
//     utencilios:'estufa',
//     correo:'c@test.com'
// })

// Recipe.getRecipe({
//     $and:[{'ingredientes.nombre':"Fresa"},{'ingredientes.nombre':"Leche"},{categoria:"facil"}],
// })

// Recipe.updateRecipe(
//     "608efbffe2f92453f4c83529"
//     ,
//     {
//         "nombre": "Licuado con nieve de mango actualizado",
//         "ingredientes":[{"nombre":"Mango", "cantidad": "100gr"},{"nombre":"Canela", "cantidad": "1pz"},{"nombre":"Leche", "cantidad": "500ml"}],
//         "receta": " procesa todo",
//         "categoria":["rapido","seguro"],
//         "utencilios":["Procesador","se"],
//     }
// )

// Recipe.getRecipe({_id:"608efbffe2f92453f4c83529"})

// Recipe.deleteRecipe({_id:"608efbffe2f92453f4c83529"})

// Recipe.getRecipe({_id:"608efbffe2f92453f4c83529"})


module.exports=Recipe;