"use strict";

window.onload = function () {
  console.log(sessionStorage.token);
  if (sessionStorage.token) {
    document.getElementById("Linkreg").classList.add("oculto");

    document.getElementById("login").innerText = "logout";
  }else{
    document.getElementById("Linkreg").classList.remove("oculto");

    document.getElementById("login").innerText = "login";
  }
  document.getElementById("login").addEventListener("click", function () {
    sessionStorage.token = null;
    sessionStorage.us=null;
  });
};
