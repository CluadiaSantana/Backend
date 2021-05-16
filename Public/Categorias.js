function log(val) { console.log("683153",val); }
let categorias=[];
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
    let resp= await fetch(`https://recetariodasw.herokuapp.com/api/Categoria`,{
        method: 'GET',
        headers:{
            'x-auth': sessionStorage.token
        },
    });
    if(resp.status==200){
        //log('cargo datos')
        categorias= await resp.json();
        //una vez teniendo los datos pasarlos a userlist para ponerlos en pantalla
        categoriasListToHTML(categorias);
        // console.log(categorias);
        np=categorias[0]
        //log(np);
        agregarboton();
        //poner botones de busqueda necesarios

    }else{
        alert('Ha ocurrido un error');
    }
}

function categoriaToHtml(categoria){
    console.log(sessionStorage);
    return`
    <tr>
        <td>${categoria.nombre}</td>
 
    </tr>
    `
}

function categoriasListToHTML(categoriasl){
    //limpipa la pantalla
    listaCategorias.innerText="";
    console.log(categoriasl)
    //pone los nuevos datos en pantalla
    //document.querySelector('#listacategorias').insertAdjacentHTML('beforeend',categoriaToHtml(categoriasl[0]));
    for(let i=0;i<categoriasl.length;i++){
        document.querySelector('#listaCategorias').insertAdjacentHTML('beforeend',categoriaToHtml(categoriasl[i]));
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
