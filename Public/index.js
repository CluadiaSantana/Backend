window.onload = function () {
  console.log(sessionStorage.token);
  if (sessionStorage.token) {
    document.getElementById("linkreg").classList.add("oculto");
    document.getElementById("login").innerText("logout");
  }
};
