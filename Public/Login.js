sessionStorage.token;

//logear usuario
let datos=document.querySelector('#datoslogin');
let entrar=datos.querySelector('#entrar');


entrar.addEventListener("click", async function(e){
    e.preventDefault();
    let f={
        "email": datos.querySelector('#eemail').value,
        "password": datos.querySelector('#inputPassword').value
    }
    let imp=JSON.stringify(f);
    console.log(imp);
    let resp= await fetch("http://127.0.0.1:3000/api/User/Login",{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
       // mode: 'no-cors',
        body: imp
    });
    console.log(resp.status);
    if(resp.status==200){
        let token= await resp.json();
        // guardar el token del usuario
        sessionStorage.token=token.token;
        //llevar a la de inicio
        window.location.href="Index.html";
    }else{
        alert('Usuario o contraseña incorrectos');
    }
})

