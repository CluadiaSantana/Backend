function log(val) { console.log("726396",val); }
let recetas=[];
//numero de registros
let np;
//numero de pagina actual
let numeropag;
//receta ocn la que se esta trabajando
let recetaactual;
//model de ver
let verr=document.querySelector('#recetaver');

window.onload = function () {
    if (sessionStorage.us=="regular" || sessionStorage.us==null) {
      document.getElementById("crear").classList.add("oculto");
    }else{
        document.getElementById("crear").classList.remove("oculto");
    }
    if (sessionStorage.token) {
        document.getElementById("linkreg").classList.add("oculto");
        document.getElementById("login").innerText="logout";
    }else{
        document.getElementById("linkreg").classList.remove("oculto");
        document.getElementById("login").innerText="login";
    }
};
document.getElementById("login").addEventListener("click", function () {
    sessionStorage.token = null;
    sessionStorage.us=null;
  });

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
        //log('cargo datos')
        recetas= await resp.json();
        //una vez teniendo los datos pasarlos a userlist para ponerlos en pantalla
        recetasListToHTML(recetas[1]);
        np=recetas[0]
        //log(np);
        agregarboton();
        //poner botones de busqueda necesarios

    }else{
        alert('Ha ocurrido un error');
    }
}

// async function bod(){
//     let params={
//         "ingredientes": "Leche",
//         "categoria": "Desayuno",
//         "utencilios": "Plato",
//     }
//     let query = Object.keys(params)
//              .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
//              .join('&');
//     log(query);
    
//     let resp= await fetch(`http://127.0.0.1:3000/api/Recipe/?sk=0&${query}`,{
//         method: 'GET',
//         headers:{
//             'x-auth': sessionStorage.token
//         }
//     });
//     if(resp.status==200){
//         //log('cargo datos')
//         recetas= await resp.json();
//         //una vez teniendo los datos pasarlos a userlist para ponerlos en pantalla
//         recetasListToHTML(recetas[1]);

//     }else{
//         alert('Ha ocurrido un error');
//     }
// }

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
            <a onclick="verdetalle('${recipe._id}')" class="btn-sm  btn-success text-center" href="" data-toggle="modal" data-dismiss="modal" data-target="#ver" ><i class="far fa-eye"></i> ver</a>
            <a class="btn-sm btn-primary text-center ${editarbotton(recipe.correo)}" href="" data-toggle="modal" data-dismiss="modal" data-target="#detalleEditar" ><i class="far fa-fw fa-edit"></i> Editar</a>
            <a class="confirmation btn-sm btn-danger text-center ${borrabotton(recipe)}" href="" ><i class="far fa-fw fa-trash-alt"></i> Eliminar</a>
        </div>
    </td>
    </tr>
    `
}
function editarbotton(correo){
    if(sessionStorage.us=="regular" || sessionStorage.us==null){
        return("oculto")
    }else if(sessionStorage.us=="chef"){
        if((sessionStorage.email).toUpperCase()==correo.toUpperCase()){
            return;
        }else{
            return("oculto");
        }
    }else{
        return;
    }
    
}
function borrabotton(correo){
    if(sessionStorage.us!="admin"){
        return("oculto")
    }else{
        return;
    }
}

function listing(ingre){
    let r="";
    for(let i=0;i<ingre.length;i++){
        r+="<li>"+ingre[i].nombre+" "+ingre[i].cantidad+"</li>";
    }
    return(r);
}

function listing_ingredients(ingre){
    let r="";
    for(let i=0;i<ingre.length;i++){
        r+="<option value='"+ingre[i].nombre+"'>"+ingre[i].nombre+" </option> ";
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

async function actual(id){
    let resp= await fetch(`http://127.0.0.1:3000/api/Recipe/${id}`,{
        method: 'GET',
        headers:{
            'x-auth': sessionStorage.token
        },
    });
    if(resp.status==200){
        //log('cargo datos')
        let s= await resp.json();
        recetaactual=s[1];
    }else{
        alert('Ha ocurrido un error');
    }
}

function listver(ele,list){
    while (ele.firstChild){
        ele.removeChild(ele.firstChild);
      };
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement("li");
        li.innerHTML =
        "<li>" +
        list[i] +
        " </li> ";
        ele.appendChild(li.firstChild);
  }
}
function listvering(ele,list){
    while (ele.firstChild){
        ele.removeChild(ele.firstChild);
      };
    for (let i = 0; i < list.length; i++) {
        let li = document.createElement("li");
        li.innerHTML =
        "<li>" +
        list[i].cantidad +" "+
        list[i].nombre +
        " </li> ";
        ele.appendChild(li.firstChild);
  }
}

async function verdetalle(id){
    await actual(id);
    console.log(recetaactual[0].nombre);
    document.querySelector('#Nombrever').innerText=recetaactual[0].nombre;
    verr.querySelector('#vercat').innerText=recetaactual[0].categoria;
    let ele = document.getElementById("verute");
    listver(ele,recetaactual[0].utencilios);
    ele = document.getElementById("veringr");
    listvering(ele,recetaactual[0].ingredientes);
    verr.querySelector('#verproc').innerText=recetaactual[0].receta;
    ele = document.getElementById("vereti");
    listver(ele,recetaactual[0].etiquetas);
}

//pone los botones necesarios
function agregarboton(){
    //limpia el html para que si se hace mas de una busqueda no se dupliquen los botones
    document.querySelector('.pagination').innerText='';
    let agregar=`<li ><button class="btn btn-outline-dark botonpag" onclick="paginado('p')" id="prev">Previous</button></li>`;
    let paginas=np/6
    //log(`numero de paginas ${paginas}`);
    for(let i=1;i<paginas+1;i++){
        agregar+=`<li><button class="btn btn-outline-dark botonpag" onclick="paginado('${i-1}')" id='bot${i-1}' >${i}</button></li>`
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
    document.querySelector(`#bot${numeropag}`).setAttribute('disabled','true');

}

paginado(0);