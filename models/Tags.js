const mongoose= require ('../conexion');

let tagSchema = mongoose.Schema({
    nombre: {
        type: String,
        requiere: true
    }
});

tagSchema.statics.savetag= async (newtag)=>{
    let tag= new Tag(newtag);
    console.log(newtag);
    try{
        let doc = await tag.save();
        console.log(doc);
        return doc;
    }catch(e){
        console.log("Error al guardar" ,e.code);
        return {error: 'Fallo al guardar'};
    }
}

tagSchema.statics.updateTag = async function(_id, tag ){
    let doc = await Tag.findOneAndUpdate(
           {_id},
           {$set: tag },
           {new: true, useFindAndModify: false} );
    return doc;
}

tagSchema.statics.deleteTag = async function(_id ){
    await Tag.findOneAndDelete(
           {_id});
    return;
}

let Tag= mongoose.model('tag',tagSchema);

module.exports=Tag;