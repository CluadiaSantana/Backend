const mongoose= require ('../conexion');

let ingredienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        requiere: true
    },
    medida: {
        type: String,
        requiere: true
    }
})


ingredienteSchema.statics.getIngredientes= async ()=>{
    let docs = await Recipe.find({});
    // console.log(docs);
    return docs;
}

let Ingrediente= mongoose.model('ingrediente',ingredienteSchema);



module.exports=Ingrediente;