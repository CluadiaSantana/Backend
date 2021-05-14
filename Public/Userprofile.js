"use strict";

function usuarioToHTML(){
    
}

function cargarUsuarios() {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwibm9tYnJlIjoidGFjbyB0YWMiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTYyMTAzMTY3M30.8SLsBPBOkBxTiXPHS6j_G4-lHaRHtwS1m881phh-ILM"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/api/User", requestOptions)
    .then((response) => {
      if (response.status != 200) return err;
      return response.json();
    })
    .then((result) => console.log(result))
}

window.onload = cargarUsuarios;
