"use strict";

var emailEdit = "";

function usuariosToHTML(usuarios) {
  document.getElementById("usuarios").innerHTML = usuarios
    .map((usuario) => {
      return ` <div class="container emp-profile">
        <form>
            <div class="row">
                <div class="col-md-6">
                    <div class="profile-head col-5">
                        <h5>
                            ${usuario.nombre}
                        </h5>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" style="opacity: 0.8;">
                                <a class="" id="home-tab" data-toggle="tab" role="tab" aria-controls="home"
                                    aria-selected="true">Datos del usuario</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="row">
                                <div class="col-md-6">
                                    <label>User Id</label>
                                </div>
                                <div class="col-md-6">
                                    <p>${usuario._id}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Nombre</label>
                                </div>
                                <div class="col-md-6">
                                    <p>${usuario.nombre}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Correo</label>
                                </div>
                                <div class="col-md-6">
                                    <p>${usuario.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-4" style="padding-left: 10%">
                    <input type="button" class="profile-edit-btn" name="btnAddMore" value="Eliminar" onclick="mostrarEliminar('${usuario.email}')" data-toggle="modal" data-target="#modelId"/>
                    <input type="button" class="profile-edit-btn" style="margin-top: 10px;" name="btnAddMore"
                        value="Editar" onclick="mostrarEditar('${usuario.email}')" data-toggle="modal" data-target="#modelId2"/>
                    <input type="button" class="profile-edit-btn" style="margin-top: 10px;" name="btnAddMore"
                        value="Password" data-toggle="modal" data-target="#modelId3"  onclick="mostrarPassword('${usuario.email}')"/>
                </div>   
            </div>
            
        </form>
    </div>`;
    })
    .join("");
}

function mostrarEditar(email) {
  emailEdit = email;
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwibm9tYnJlIjoidGFjbyB0YWMiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTYyMTAzMTY3M30.8SLsBPBOkBxTiXPHS6j_G4-lHaRHtwS1m881phh-ILM"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(`http://localhost:3000/api/User/${email}`, requestOptions)
    .then((response) => {
      if (response.status != 200) return "error";
      return response.json();
    })
    .then((result) => {
      document.getElementById("editNombre").value = result.nombre.split(" ")[0];
      document.getElementById("editApellidos").value =
        result.nombre.split(" ")[1];

      document.getElementById("selectRol").value = result.rol;
    });
}

function mostrarEliminar(email) {
  emailEdit = email;
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwibm9tYnJlIjoidGFjbyB0YWMiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTYyMTAzMTY3M30.8SLsBPBOkBxTiXPHS6j_G4-lHaRHtwS1m881phh-ILM"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(`http://localhost:3000/api/User/${email}`, requestOptions)
    .then((response) => {
      if (response.status != 200) return "error";
      return response.json();
    })
    .then((result) => {
      document.getElementById(
        "eliminar-body"
      ).innerHTML = `<p>Seguro que deseas eliminar a: ${result.nombre}</p><p>Con correo: ${result.email}</p>`;
    });
}

function mostrarPassword(email) {
  emailEdit = email;
}

function editar() {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwibm9tYnJlIjoidGFjbyB0YWMiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTYyMTAzMTY3M30.8SLsBPBOkBxTiXPHS6j_G4-lHaRHtwS1m881phh-ILM"
  );
  myHeaders.append("Content-Type", "application/json");

  let update = {
    nombre: `${document.getElementById("editNombre").value} ${
      document.getElementById("editApellidos").value
    }`,
    rol: `${document.getElementById("selectRol").value}`,
  };

  var raw = JSON.stringify(update);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  fetch(`http://localhost:3000/api/User/${emailEdit}`, requestOptions).then(
    (response) => {
      window.location.reload();
    }
  );
}

function cambiarPassword() {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwibm9tYnJlIjoidGFjbyB0YWMiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTYyMTAzMTY3M30.8SLsBPBOkBxTiXPHS6j_G4-lHaRHtwS1m881phh-ILM"
  );
  myHeaders.append("Content-Type", "application/json");

  let update = {
    password: `${document.getElementById("pwd1").value}`,
  };

  var raw = JSON.stringify(update);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  fetch(`http://localhost:3000/api/User/${emailEdit}`, requestOptions).then(
    (response) => {
      window.location.reload();
    }
  );
}

function eliminar() {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-auth",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwibm9tYnJlIjoidGFjbyB0YWMiLCJyb2wiOiJhZG1pbiIsImlhdCI6MTYyMTAzMTY3M30.8SLsBPBOkBxTiXPHS6j_G4-lHaRHtwS1m881phh-ILM"
  );
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  fetch(`http://localhost:3000/api/User/${emailEdit}`, requestOptions).then(
    (response) => {
      window.location.reload();
    }
  );
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
    .then((result) => {
      usuariosToHTML(result);
    });
}

document.getElementById("editGuardar").addEventListener("click", editar);
document
  .getElementById("eliminarConfirmar")
  .addEventListener("click", eliminar);

document
  .getElementById("confirmarPass")
  .addEventListener("click", cambiarPassword);

window.onload = cargarUsuarios;
