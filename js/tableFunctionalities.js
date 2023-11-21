import {rellenarTabla, limpiarTabla, tablaConPuntos, rellenarFormulario, validarNombre, validarApellidos, validarMesNac, validarDNI, validarTelefono, validarFechaCita } from './functions.js'
//Obtenemos todas las keys del localStorage
const keys = Object.keys(localStorage);
const cuerpoTabla = document.querySelector(".filasTabla");
const formulario = document.querySelector(".modificarFila");
const nameM = document.querySelector("#nameM");
const apeM = document.querySelector("#apeM");
const dniM = document.querySelector("#dniM");
const teleM = document.querySelector("#teleM");
const naciM = document.querySelector("#naciM");
const citeM = document.querySelector("#citeM");
const obserM = document.querySelector("#obserM");
//Si el localStorage está vacío aparecerá una fila de puntos, sino se rellenará la tabla
localStorage.length === 0 ? tablaConPuntos(cuerpoTabla) : rellenarTabla(keys, cuerpoTabla);
cuerpoTabla.addEventListener("click", (event) => {
    const target = event.target;
    if (target.id.startsWith("modify")) {
        const row = target.parentNode.parentNode;
        const index = Array.from(row.parentNode.children).indexOf(row);
        const key = localStorage.getItem(keys[index]);
        document.querySelector(".botones").innerHTML =
            `<a>
                <button id="boton" class="save">
                    Guardar
                </button>
                <button id="boton" class="cancel">
                    Cancelar
                </button>
            </a>`
        formulario.style.display = "block"
        console.log("hola")
        let nuevaKey = JSON.parse(key);
        rellenarFormulario(nuevaKey);
        const guardar = document.querySelector(".save");
        guardar.addEventListener("click", () => {
            if (validarNombre(nameM.value) && validarApellidos(apeM.value)
                && validarTelefono(teleM.value) && validarDNI(dniM.value)
                && validarMesNac(naciM.value) && validarFechaCita(citeM.value)) {
                nuevaKey.nombre = nameM.value
                nuevaKey.apellidos = apeM.value
                nuevaKey.dni = dniM.value
                nuevaKey.telefono = teleM.value
                nuevaKey.mesNac = naciM.value
                nuevaKey.fechaCita = citeM.value
                nuevaKey.observaciones = obserM.value
                limpiarTabla(cuerpoTabla);
                localStorage.setItem(keys[index], JSON.stringify(nuevaKey))
                rellenarTabla(keys,cuerpoTabla);
                formulario.style.display = "none"
            }
        })
        const cancelar = document.querySelector(".cancel");
        cancelar.addEventListener("click", () => {
            formulario.style.display = "none"
        })
    } else if (target.id.startsWith("delete")) {
        const row = target.parentNode.parentNode;
        const index = Array.from(row.parentNode.children).indexOf(row);
        localStorage.removeItem(keys[index]);
        row.remove();
        if (localStorage.length === 0) {
            tablaConPuntos();
        }
    }
});

