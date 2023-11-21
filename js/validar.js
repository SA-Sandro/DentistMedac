import { validarFormulario } from "./functions.js";

const boton = document.querySelector(".boton");

boton.addEventListener("click", function (e) {
    e.preventDefault();

    const nombre = document.querySelector("#name").value;
    const apellidos = document.querySelector("#surname").value;
    const dni = document.querySelector("#dni").value;
    const telefono = document.querySelector("#number").value;
    const fechaCita = document.querySelector("#dateAppt").value;
    const mesNac = document.querySelector("#birthDate").value;
    const observaciones = document.querySelector("#observaciones").value;

    validarFormulario(nombre, apellidos, dni, telefono, fechaCita, mesNac, observaciones);
});


