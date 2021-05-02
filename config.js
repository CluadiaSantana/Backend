let config={
    ds_user:'Claudia',
    password:'yCnFrhniCxfS48kE',
    db_name: 'proyecto',
    getUrl(){
        return `mongodb+srv://Claudia:${this.password}@cluster0.jyhcg.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
    }
}

module.exports= config;