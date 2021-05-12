const mongoose= require ('../conexion');

let categorySchema = mongoose.Schema({
    nombre: {
        type: String,
        requiere: true
    }
});

categorySchema.statics.savecategory= async (newcategory)=>{
    let category= new Category(newcategory);
    console.log(newcategory);
    try{
        let doc = await category.save();
        console.log(doc);
        return doc;
    }catch(e){
        console.log("Error al guardar" ,e.code);
        return {error: 'Fallo al guardar'};
    }
}

categorySchema.statics.updateCategory = async function(_id, category ){
    let doc = await Category.findOneAndUpdate(
           {_id},
           {$set: category },
           {new: true, useFindAndModify: false} );
    return doc;
}

categorySchema.statics.deleteCategory = async function(_id ){
    await Category.findOneAndDelete(
           {_id});
    return;
}

let Category= mongoose.model('category',categorySchema);

module.exports=Category;