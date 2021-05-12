"use strict";

async function listing_ingredients() {
  let ingred = await fetch(`http://127.0.0.1:3000/api/ingredientes`, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.token,
    },
  }).then((res) => res.json());
  let select = document.getElementById("select-ingredientes");
  let select2 = document.getElementById("select-ingredientes2");
  for (let i = 0; i < ingred.length; i++) {
    let option = document.createElement("option");
    option.innerHTML =
      "<option value='" +
      ingred[i].nombre +
      "'>" +
      ingred[i].nombre +
      " </option> ";
    let option2 = document.createElement("option");
    option2.innerHTML =
      "<option value='" +
      ingred[i].nombre +
      "'>" +
      ingred[i].nombre +
      " </option> ";
    select.appendChild(option.firstChild);
    select2.appendChild(option2.firstChild);
  }
}

async function listing_categories() {
  let utensilio = await fetch(`http://127.0.0.1:3000/api/Utensilio`, {
    method: "GET",
    headers: {
      "x-auth": sessionStorage.token,
    },
  }).then((res) => res.json());
  let select = document.getElementById("select-utensilio");
  for (let i = 0; i < utensilio.length; i++) {
    let option = document.createElement("option");
    option.innerHTML =
      "<option value='" +
      utensilio[i].nombre +
      "'>" +
      utensilio[i].nombre +
      " </option> ";
    select.appendChild(option.firstChild);
  }
}

async function buscar(e) {
  e.preventDefault();
  let ingrediente = document.getElementById("select-ingredientes").value;
  let ingrediente2 = document.getElementById("select-ingredientes2").value;
  let busqueda = {};
  let string = "";
  if (ingrediente || ingrediente2) {
    busqueda.ingredientes = [];
    if (ingrediente) busqueda.ingredientes.push(ingrediente);
    if (ingrediente2) busqueda.ingredientes.push(ingrediente2);
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (busqueda.ingredientes)
    string += `ingredientes=[${JSON.stringify(busqueda.ingredientes)}
    )}]`;
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(
    `http://127.0.0.1:3000/api/Recipe?ingredientes=${JSON.stringify(
      busqueda.ingredientes
    ).replace(/\\"/g, '"')}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result));
}
document.getElementById("buscar").addEventListener("click", buscar);

window.onload = function () {
  listing_ingredients();
  listing_categories();
  console.log(sessionStorage.token);
  if (sessionStorage.token) {
    document.getElementById("Linkreg").classList.add("oculto");

    document.getElementById("login").innerText = "logout";
  }
  document.getElementById("login").addEventListener("click", function () {
    sessionStorage.token = null;
    sessionStorage.us = null;
  });
};
