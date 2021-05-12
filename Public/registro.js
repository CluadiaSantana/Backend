"use strict";

function registro(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellidos").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email,
    password,
    nombre,
    apellido,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/api/User", requestOptions).then((response) => {
    console.log(response);
    if ((response.status == 200))
      return (window.location.href = "/Public/index.html");
      window.location.href = "/Public/Registro.html";
     })
     .then((result) => console.log(result));
  
}
document.getElementById("registro").addEventListener("click", registro);
