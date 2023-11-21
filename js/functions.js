
export function validarFormulario(nombre, apellidos, dni, telefono, fechaCita, mesNac, observaciones) {
    let bNombre = validarNombre(nombre)
    let bApellidos = validarApellidos(apellidos);
    let bTelefono = validarTelefono(telefono);
    let bDNI = validarDNI(dni);
    let bMesNac = validarMesNac(mesNac);
    let bFechaCita = validarFechaCita(fechaCita);

    if (bNombre && bApellidos && bDNI && bTelefono && bFechaCita && bMesNac) {
        document.querySelector("#allGood").innerHTML = "Se ha registrado la cita correctamente"
        limpiarFormulario();
        setTimeout(() => {
            document.querySelector("#allGood").innerHTML = ""
        }, 4000)
        crearLocalStorage(nombre, apellidos, telefono, dni, mesNac, fechaCita, observaciones);
    }
}
function crearLocalStorage(nombre, apellidos, telefono, dni, mesNac, fechaCita, observaciones) {
    let id_unico = getIdUnico(nombre, apellidos, dni);
    let my_object = {
        "ID_CITA": id_unico,
        "nombre": nombre,
        "apellidos": apellidos,
        "telefono": telefono,
        "dni": dni,
        "mesNac": mesNac,
        "fechaCita": fechaCita,
        "observaciones": observaciones
    };
    localStorage.setItem(my_object.ID_CITA, JSON.stringify(my_object));
};
function getIdUnico(nombre, apellidos, dni) {
    return nombre.substring(0, 1) + apellidos.substring(0, 1) + dni + Date.now();
}
export function validarMesNac(mesNac) {
    const falloMesNac = document.querySelector("#falloBirth");
    let fechaNac = new Date(mesNac);
    let fechaActual = new Date();
    if (fechaNac.getFullYear() < fechaActual.getFullYear()) {
        falloMesNac.innerHTML = "";
        return true;
    } else {
        falloMesNac.innerHTML = "La fecha de nacimiento no puede ser mayor a la fecha actual";
        return false;
    }
}
export function validarNombre(nombre) {
    if (nombre === "") {
        document.querySelector("#falloNombre").textContent = "Este campo se encuentra vacío"
        return false;
    } else if (nombre.length > 20) {
        falloNombre.innerHTML = "Nombre demasiado largo"
        return false;
    } else {
        falloNombre.innerHTML = "";
        return true
    }
}
export function validarApellidos(apellidos) {
    const falloApellidos = document.querySelector("#falloApellidos");
    if (apellidos === "") {
        falloApellidos.innerHTML = "Este campo está vacío";
        return false;
    } else if (apellidos.length > 50) {
        falloApellidos.innerHTML = "Apellidos muy largos"
    } else {
        falloApellidos.innerHTML = "";
        return true;
    }
}
export function validarDNI(dni) {
    const falloDNI = document.querySelector("#falloDNI");
    const dniPattern = /^[0-9]{8}[A-Z]$/;
    if (!dni.match(dniPattern)) {
        falloDNI.innerHTML = "El dni debe de tener 8 números seguido de una letra";
        return false;
    } else {
        falloDNI.innerHTML = "";
        return true;
    }
}
export function validarTelefono(numero) {
    const falloTelefono = document.querySelector("#falloNumero");
    if (numero.length != 9) {
        falloTelefono.innerHTML = "El número de teléfono debe tener 9 dígitos";
        return false;
    } else {
        falloTelefono.innerHTML = "";
        return true;
    }
}
export function validarFechaCita(fechaCita) {
    let fc = new Date(fechaCita);
    let fechaActual = new Date();
    const falloFechaCita = document.querySelector("#falloFechaCita");
    if (fc > fechaActual) {
        falloFechaCita.innerHTML = "";
        return true;
    } else {
        falloFechaCita.innerHTML = "No puedes reservar una cita en una fecha menor a la actual"
        return false;
    }
}
export function limpiarFormulario() {
    document.querySelector("#name").value = "";
    document.querySelector("#surname").value = "";
    document.querySelector("#dni").value = "";
    document.querySelector("#number").value = "";
    document.querySelector("#dateAppt").value = "";
    document.querySelector("#birthDate").value = "";
    document.querySelector("#observaciones").value = ""

}
export function rellenarFormulario(key) {
    citeM.value = key.fechaCita;
    nameM.value = key.nombre;
    apeM.value = key.apellidos;
    dniM.value = key.dni;
    teleM.value = key.telefono;
    naciM.value = key.mesNac;
    obserM.value = key.observaciones;
}
export function tablaConPuntos(cuerpoTabla) {
    cuerpoTabla.innerHTML =
        `<tr>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
    <td class="text-center">...</td>
</tr>`;
}
export function limpiarTabla(cuerpoTabla) {
    cuerpoTabla.innerHTML = "";
}
export function rellenarTabla(keys, cuerpoTabla) {
    let contador = 0;

    keys.forEach(key => {
        const objetoString = localStorage.getItem(key);
        const objeto = JSON.parse(objetoString);
        let obj;
        objeto.observaciones == "" ? obj = "..." : obj = objeto.observaciones

        cuerpoTabla.innerHTML +=
            `<tr class="text-center">
        <td>${objeto.nombre}</td>
        <td>${objeto.apellidos}</td>
        <td>${objeto.mesNac}</td>
        <td>${objeto.telefono}</td>
        <td>${objeto.fechaCita}</td>
        <td>${obj}</td>
        <td><i id="modify_${contador}" class="cursor bi bi-pencil-square"></i></td>
        <td><i id="delete_${contador}" class="cursor1 bi bi-x-square-fill"></i></td>
    </tr>`;
        contador++;
    });
}