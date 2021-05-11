function log(val) { console.log("726396",val); }
let recetas=[];

async function load(){
    //pedir los datos con fetch
    let resp= await fetch("http://127.0.0.1:3000//api/Recipe",{
        method: 'GET',
        headers:{
            'x-auth': sessionStorage.token
        },
    });
    if(resp.status==200){
        log('cargo datos')
        recetas= await resp.json();
        //una vez teniendo los datos pasarlos a userlist para ponerlos en pantalla
        recetasListToHTML(recetas);
        //limpia el html para quitar botones de busqueda 
        //document.querySelector('.pagination').innerText='';
    }else{
        alert('Ha ocurrido un error');
    }
}

function recipeToHtml(recipe)