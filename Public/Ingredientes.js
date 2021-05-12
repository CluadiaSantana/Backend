function log(val) { console.log("683153",val); }
let ingredientes=[];
//numero de registros
let np;
//numero de pagina actual
let numeropag;
const secret = "gH$iDa&T0Gr3&@kTcly09DB#$FcC3tNGBQvVCf@M";

window.onload = function () {
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
    let resp= await fetch(`http://127.0.0.1:3000/api/Ingredientes`,{
        method: 'GET',
        headers:{
            'x-auth': sessionStorage.token
        },
    });
    if(resp.status==200){
        //log('cargo datos')
        ingredientes= await resp.json();
        //una vez teniendo los datos pasarlos a userlist para ponerlos en pantalla
        ingredientesListToHTML(ingredientes);
        // console.log(ingredientes);
        np=ingredientes[0]
        //log(np);
        agregarboton();
        //poner botones de busqueda necesarios

    }else{
        alert('Ha ocurrido un error');
    }
}

function ingredienteToHtml(ingrediente){
    console.log(sessionStorage);
    return`
    <tr>
        <td>${ingrediente.nombre}</td>
        <td>${ingrediente.medida}</td>
        <td width="50px">
        <div class="btn-group" role="group" aria-label="Basic example">
            <a onclick="editarrect('${ingrediente._id}')" class="btn-sm btn-primary text-center ${editarbotton(ingrediente.correo)}" href="" data-toggle="modal" data-dismiss="modal" data-target="#detalleEditar" ><i class="far fa-fw fa-edit"></i> Editar</a>
            <a onclick="borrarreceta('${ingrediente._id}')"class="confirmation btn-sm btn-danger text-center ${borrabotton(ingrediente)}" href="" ><i class="far fa-fw fa-trash-alt"></i> Eliminar</a>
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
function ingredientesListToHTML(ingredientesl){
    //limpipa la pantalla
    listaIngredientes.innerText="";
    console.log(ingredientesl)
    //pone los nuevos datos en pantalla
    //document.querySelector('#listaingredientes').insertAdjacentHTML('beforeend',ingredienteToHtml(ingredientesl[0]));
    for(let i=0;i<ingredientesl.length;i++){
        document.querySelector('#listaIngredientes').insertAdjacentHTML('beforeend',ingredienteToHtml(ingredientesl[i]));
    }
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
    // document.querySelector(`#bot${numeropag}`).setAttribute('disabled','true');

}

paginado(0);
