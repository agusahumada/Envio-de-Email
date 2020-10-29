//Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

eventListeners();
function eventListeners() {
  //Cuando la App arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //Campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //Enviar email
  formulario.addEventListener("submit", enviarEmail);

  //Reinicia el formulario
  btnReset.addEventListener("click", resetearFormulario);
}

//Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
}

//Valida el formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //Elimina errores...
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");

    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no válido");
    }
  }
  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

//Envío de email

function enviarEmail(e) {
  e.preventDefault();

  //Mostrar el spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //Después de 3 seg. ocultar el spinner y mostrar el msj.
  setTimeout(() => {
    spinner.style.display = "none";

    //Mensaje que dice que se envió correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envió correctamente";

    //Inserta el párrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );
    setTimeout(() => {
      //Eliminar el msj de éxito
      parrafo.remove();

      resetearFormulario();
    }, 5000);
  }, 3000);
}

//Funcion que resetea el form
function resetearFormulario() {
  formulario.reset();

  iniciarApp();
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
  eliminarColores(email, asunto, mensaje);
}

function eliminarColores(correo, asunto, mensaje) {
  const clases = "border-green-500"; //Se elimina los verdes al hacer exitoso el correo
  const clases2 = "border-red-500"; //Se elimina los rojos al presionar cualquier campo, salirse, y darle al reset, se elimina los rojos
  correo.classList.remove(clases, clases2);
  asunto.classList.remove(clases, clases2);
  mensaje.classList.remove(clases, clases2);
}
