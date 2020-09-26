//Variables
const btnEnviar = document.querySelector("#enviar");

//Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

eventListeners();
function eventListeners() {
  //Cuando la App arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
}

//Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
}

//Valida el formulario
function validarFormulario(e) {
  if (e.target.value.length > 9) {
    console.log("Si hay algo");
  } else {
    e.target.classList.add("border", "border-red-500");
  }
}
