function log(val) { console.log("726396",val); }
let recetas=[];
//numero de registros
let np;
//numero de pagina actual
let numeropag;
const secret = "gH$iDa&T0Gr3&@kTcly09DB#$FcC3tNGBQvVCf@M";

window.onload = function () {
    if (sessionStorage.us=="regular" || sessionStorage.us==null) {
      document.getElementById("crear").classList.add("oculto");
    }
    if (sessionStorage.token) {
        document.getElementById("linkreg").classList.add("oculto");
        document.getElementById("login").innerText("logout");
    }
};

async function load(pg){
    if(pg==undefined){
        sk=0;
    }else{
        sk=pg*6
    }
    //pedir los datos con fetch
    let resp= await fetch(`http://127.0.0.1:3000/api/Recipe?sk=${sk}`,{
        method: 'GET',
        headers:{
            'x-auth': sessionStorage.token
        },
    });
    if(resp.status==200){
        log('cargo datos')
        recetas= await resp.json();
        //una vez teniendo los datos pasarlos a userlist para ponerlos en pantalla
        recetasListToHTML(recetas[1]);
        np=recetas[0]
        log(np);
        agregarboton();
        //poner botones de busqueda necesarios

    }else{
        alert('Ha ocurrido un error');
    }
}

function recipeToHtml(recipe){
    return`
    <tr>
    <td>${recipe.nombre}</td>
    <td>${recipe.nombre}</td>
    <td>
        <ul>
            ${listing(recipe.ingredientes)}
        </ul>
    </td>
    <td>
        <ul>
        ${list(recipe.utencilios)}                                 
        </ul>
    </td>
    <td>
        <ul>
            <li>Rapidas</li>
            <li>Favoritos</li>
            <li>Con Tortilla</li>
        </ul>
    </td>
    <td>
        <img class="brand-logo-light"
    src=${recipe.imagen}
    alt="" width="140">
    </td>
    <td width="50px">
        <div class="btn-group" role="group" aria-label="Basic example">
            <a class="btn-sm  btn-success text-center" href="" data-toggle="modal" data-dismiss="modal" data-target="#ver" ><i class="far fa-eye"></i> ver</a>
            <a class="btn-sm btn-primary text-center" href="" data-toggle="modal" data-dismiss="modal" data-target="#detalleEditar" ><i class="far fa-fw fa-edit"></i> Editar</a>
            <a class="confirmation btn-sm btn-danger text-center" href="" ><i class="far fa-fw fa-trash-alt"></i> Eliminar</a>
        </div>
    </td>
    </tr>
    `
}

function listing(ingre){
    let r="";
    for(let i=0;i<ingre.length;i++){
        r+="<li>"+ingre[i].nombre+" "+ingre[i].cantidad+"</li>";
    }
    return(r);
}

function list(type){
    let r="";
    for(let i=0;i<type.length;i++){
        r+="<li>"+type[i]+"</li>";
    }
    return(r);
}

function recetasListToHTML(recetasl){
    //limpipa la pantalla
    listarecetas.innerText="";
    //pone los nuevos datos en pantalla
    //document.querySelector('#listarecetas').insertAdjacentHTML('beforeend',recipeToHtml(recetasl[0]));
    for(let i=0;i<recetasl.length;i++){
        document.querySelector('#listarecetas').insertAdjacentHTML('beforeend',recipeToHtml(recetasl[i]));
    }
}



//pone los botones necesarios
function agregarboton(){
    //limpia el html para que si se hace mas de una busqueda no se dupliquen los botones
    document.querySelector('.pagination').innerText='';
    let agregar=`<li ><button class="btn btn-outline-dark botonpag" onclick="paginado('p')" id="prev">Previous</button></li>`;
    let paginas=np/6
    log(`numero de paginas ${paginas}`);
    for(let i=1;i<paginas+1;i++){
        agregar+=`<li><button class="btn btn-outline-dark botonpag" onclick="paginado('${i}')" id='bot${i}' >${i}</button></li>`
    }
    agregar+=`<li ><button class="btn btn-outline-dark botonpag" onclick="paginado('n')" id="next">Next</button></li>`
    document.querySelector('.pagination').insertAdjacentHTML("beforeend",agregar);
}

//hace la division de los usuarios en paginas
async function  paginado(pag){
    
    //si es next o previus el boton hace los calculos
    if(pag=='n'){
        numeropag++;
        pag=numeropag;
    }else if(pag=='p'){
        numeropag--;
        pag=numeropag;
    }else{
        numeropag=pag;
    }
    log(numeropag)
    await load(numeropag)
    document.querySelectorAll('.botonpag').forEach(e=>{ e.removeAttribute('disabled') })
    //deshabilita los botones necesarios
    if(numeropag==0){
        document.querySelector('#prev').setAttribute('disabled','true');
    }
    if(numeropag+1>=np/6){
        document.querySelector('#next').setAttribute('disabled','true');
    }
    document.querySelector(`#bot${numeropag+1}`).setAttribute('disabled','true');

}

paginado(0);
