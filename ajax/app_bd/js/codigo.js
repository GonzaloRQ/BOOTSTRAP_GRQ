"use strict";
//codigo.js
// MAIN PROGRAM
var oSeguros = new Seguro();

registrarEventos();

// Registro de eventos
function registrarEventos() {
    // Opciones de menú
    document
        .querySelector("#mnuAltaCliente")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarCliente")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarPresupuesto")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuAltaPresupuesto")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoCliente")
        .addEventListener("click", mostrarListadoCliente);
    document
        .querySelector("#mnuListadoPresupuesto")
        .addEventListener("click", mostrarListadoPresupuesto);
    document
        .querySelector("#mnuListadoPorNombre")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoPorPrima")
        .addEventListener("click", mostrarFormulario);
    // Botones

    //CLIENTE
    frmAltaCliente.btnAceptarAltaCliente.addEventListener("click", procesarAltaCliente);
    frmBuscarCliente.btnBuscarCliente.addEventListener("click",procesarBuscarCliente);
    frmModificarCliente.btnAceptarModCliente.addEventListener("click", procesarModificarCliente);
    frmListadoPorNombre.btnAceptarListadoPorNombre.addEventListener("click", procesarListadoPorNombre);

    //PRESUPUESTO
    frmBuscarPresupuesto.btnBuscarPresupuesto.addEventListener("click", procesarBuscarPresupuesto);
    frmAltaPresupuesto.btnAceptarAltaPresupuesto.addEventListener("click", procesarAltaPresupuesto);
    frmModificarPresupuesto.btnAceptarModificarPresupuesto.addEventListener("click", procesarModificarPresupuesto);
    frmListadoPorPrima.btnAceptarListadoPorPrima.addEventListener("click", procesarListadoPorPrima);
}

function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id; // Opción de menú pulsada (su id)

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaCliente":
            frmAltaCliente.style.display = "block";
            break;
        case "mnuBuscarCliente":
            frmBuscarCliente.style.display = "block";
            break;
        case "mnuBuscarPresupuesto":
            frmBuscarPresupuesto.style.display = "block";
            break;
        case "mnuAltaPresupuesto":
            frmAltaPresupuesto.style.display = "block";
            actualizarDesplegableIdCliente(undefined);
            break;
        case "mnuListadoPorNombre":
            frmListadoPorNombre.style.display = "block";
            break;
        case "mnuListadoPorPrima":
            frmListadoPorPrima.style.display = "block";
            break;
       
    }
}

function ocultarFormularios() {
    frmAltaCliente.style.display = "none";
    frmBuscarCliente.style.display = "none";
    frmBuscarPresupuesto.style.display = "none";
    frmAltaPresupuesto.style.display = "none";
    frmModificarCliente.style.display = "none";
    resultadoBusqueda.style.display = "none";
    frmModificarPresupuesto.style.display = "none";
    frmListadoPorNombre.style.display = "none";
    frmListadoPorPrima.style.display = "none";
    resultadoBusqueda.innerHTML = "";
    document.querySelector("#listados").innerHTML = "";
}


//ACTUALIZAR DESPLEGABLE

async function actualizarDesplegableIdCliente(idClienteSeleccionado) {

    let respuesta = await oSeguros.getClientes();
    let options = "";

    for (let cliente of respuesta.datos) {
        if (idClienteSeleccionado && idClienteSeleccionado == cliente.CUSTOMER_ID) { // Si llega el parámetro ( != undefined )
            options += "<option selected value='" + cliente.CUSTOMER_ID + "' >" + cliente.CUSTOMER_NAME+ "</option>";
        } else {
            options += "<option value='" + cliente.CUSTOMER_ID + "' >" + cliente.CUSTOMER_NAME + "</option>";
        }

    }
    // Agrego los options generados a partir del contenido de la BD
    // frmListadoCliente.lstTipo.innerHTML = options;
    // Aprovecho y actualizo todos los desplegables se vea o no el formulario
    frmModificarPresupuesto.lstModCliente.innerHTML = options;
    frmAltaPresupuesto.lstAltaCliente.innerHTML = options;
}




//?###############################################################
//?                                                              #
//?                         BUSCAR                               #
//?                                                              #
//?###############################################################

// Procesos de botones
async function procesarBuscarCliente(){
    if(validarBuscarCliente()){
        let idCliente= parseInt(frmBuscarCliente.txtIdCliente.value.trim());

        let respuesta = await oSeguros.buscarCliente(idCliente);

        if (!respuesta.error) { // Si NO hay error
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");
            oSeguros.clienteActual = respuesta.datos;
            // Escribimos resultado
            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr><th>IDCLIENTE</th><th>NOMBRE</th><th>DIRECCION</th><th>FECHA NACIMIENTO</th><th>TLF</th><th>ESTADO CIVIL</th><th>GENERO</th><th>ACCION</th></tr></thead>";
            tablaSalida += "<tbody>";
            tablaSalida += "<td>" + respuesta.datos.CUSTOMER_ID + "</td>"
            tablaSalida +="<td>" + respuesta.datos.CUSTOMER_NAME + "</td>"
            tablaSalida += "<td>" + respuesta.datos.CUSTOMER_ADDRESS + "</td>"
            tablaSalida += "<td>" + respuesta.datos.CUSTOMER_BIRTHDATE + "</td>"
            tablaSalida += "<td>" + respuesta.datos.CUSTOMER_TLF + "</td>"
            tablaSalida += "<td>" + respuesta.datos.CUSTOMER_CS + "</td>"
            tablaSalida += "<td>" + respuesta.datos.CUSTOMER_GENDER + "</td>"
            tablaSalida += "<td><input type='button' value='Borrar' id='btnBorrarCliente' data-idcliente='" + respuesta.datos.CUSTOMER_ID + "'></td>";
            tablaSalida += "<td><button id='btnEditarCliente' class='btn btn-primary' data-cliente='" + JSON.stringify(oSeguros.clienteActual) + "'><i class='bi bi-pencil-square'></i></button></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarCliente").addEventListener("click",borrarCliente);
            document.querySelector("#btnEditarCliente").addEventListener("click",procesarBotonEditarCliente);
        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}

async function procesarBuscarPresupuesto(){
    if(validarBuscarPresupuesto()){
        let idPresupuesto= parseInt(frmBuscarPresupuesto.txtIdPresupuesto.value.trim());

        let respuesta = await oSeguros.buscarPresupuesto(idPresupuesto);

        if (!respuesta.error) { // Si NO hay error
            let resultadoBusqueda = document.querySelector("#resultadoBusqueda");
            oSeguros.presupuestoActual = respuesta.datos;
            // Escribimos resultado
            let tablaSalida = "<table class='table'>";
            tablaSalida += "<thead><tr><th>IDPRESUPUESTO</th><th>NOMBRE</th><th>FECHA</th><th>COBERTURA</th><th>CLIENTE</th><th>PRIMA</th><th>ESTADO</th></tr></thead>";
            tablaSalida += "<tbody>";
            tablaSalida += "<td>" + respuesta.datos.BUDGET_ID + "</td>"
            tablaSalida +="<td>" + respuesta.datos.BUDGET_NAME + "</td>"
            tablaSalida += "<td>" + respuesta.datos.BUDGET_DATE + "</td>"
            tablaSalida += "<td>" + respuesta.datos.BUDGET_COVERAGE + "</td>"
            tablaSalida += "<td>" + respuesta.datos.CUSTOMERNAME + "</td>"
            tablaSalida += "<td>" + respuesta.datos.BUDGET_PRIME + "</td>"
            tablaSalida += "<td>" + respuesta.datos.BUDGET_STATUS + "</td>"
            tablaSalida += "<td><input type='button' value='Borrar' class='btn btn-danger' id='btnBorrarPresupuesto' data-idpresupuesto='" + respuesta.datos.BUDGET_ID + "'></td>";
            tablaSalida += "<td><button id='btnEditarPresupuesto' class='btn btn-primary' data-presupuesto='" + JSON.stringify(oSeguros.presupuestoActual) + "'><i class='bi bi-pencil-square'></i></button></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            // Registrar evento para el botón borrar
            document.querySelector("#btnBorrarPresupuesto").addEventListener("click",borrarPresupuesto);
            document.querySelector("#btnEditarPresupuesto").addEventListener("click",procesarBotonEditarPresupuesto);
        } else { // Si hay error
            alert(respuesta.mensaje);
        }

    }
}




//!###############################################################
//!                                                              #
//!                          BORRAR                              #
//!                                                              #
//!###############################################################


async function borrarCliente(oEvento){
    let boton = oEvento.target;
    let idCliente = boton.dataset.idcliente;

    let respuesta = await oSeguros.borrarCliente(idCliente);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    } 

}

async function borrarPresupuesto(oEvento){
    let boton = oEvento.target;
    let idPresupuesto = boton.dataset.idpresupuesto;

    let respuesta = await oSeguros.borrarPresupuesto(idPresupuesto);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        // Borrado de la tabla html
        document.querySelector("#resultadoBusqueda").innerHTML = "";
    } 

}


//*###############################################################
//*                                                              #
//*                         PROCESAR                             #
//*                                                              #
//*###############################################################



//-------------------------------PROCESAR ALTA---------------------------------------------------

async function procesarAltaPresupuesto() {
    // Recuperar datos del formulario frmAltaPresupuesto
    let nombre = frmAltaPresupuesto.txtNombrePresupuesto.value.trim();
    let fecha = frmAltaPresupuesto.txtFechaPresupuesto.value.trim();
    let cobertura =frmAltaPresupuesto.txtCoberturaPresupuesto.value.trim();
    let idCliente = frmAltaPresupuesto.lstAltaCliente.value.trim();
    let prima = parseFloat(frmAltaPresupuesto.txtPrimaPresupuesto.value.trim());
    let estado = frmAltaPresupuesto.txtEstadoPresupuesto.value.trim();
    // Validar datos del formulario
    if (validarAltaPresupuesto()) {
        let respuesta = await oSeguros.altaPresupuesto(new Presupuesto(null, nombre, fecha, cobertura, idCliente, prima, estado)); 
        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmAltaPresupuesto.reset();
            // Ocultar el formulario
            frmAltaPresupuesto.style.display = "none";
        }

    }
}


async function procesarAltaCliente() {
    if (validarAltaCliente()) {
        let nombre = frmAltaCliente.txtNombre.value;
        let direccion = frmAltaCliente.txtDireccion.value;
        let fechaNacimiento = frmAltaCliente.txtFechaNacimiento.value;   
        let tlf = frmAltaCliente.txtTlf.value;
        let estadoCivil = frmAltaCliente.txtCs.value;
        let genero = frmAltaCliente.txtGenero.value;
        
        let respuesta = await oSeguros.altaCliente(new Cliente(null, nombre, direccion, fechaNacimiento, tlf, estadoCivil, genero));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formularioformulariosCom
            frmAltaCliente.reset();
            // Ocultar el formulario
            frmAltaCliente.style.display = "none";
        }
    }
}

//-------------------------------PROCESAR BOTON EDITAR---------------------------------------------------

function procesarBotonEditarCliente(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de Clientes
        frmModificarCliente.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del Cliente
        let Cliente = JSON.parse(boton.dataset.cliente);

        frmModificarCliente.txtModIdCliente.value = Cliente.CUSTOMER_ID;
        frmModificarCliente.txtModNombre.value = Cliente.CUSTOMER_NAME;
        frmModificarCliente.txtModDireccion.value = Cliente.CUSTOMER_ADDRESS;
        frmModificarCliente.txtModFechaNacimiento.value = Cliente.CUSTOMER_BIRTHDATE;
        frmModificarCliente.txtModTlf.value = Cliente.CUSTOMER_TLF;
        frmModificarCliente.txtModCs.value = Cliente.CUSTOMER_CS;
        frmModificarCliente.txtModGenero.value = Cliente.CUSTOMER_GENDER;


    }
}


function procesarBotonEditarPresupuesto(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        // 1.Ocultar todos los formularios
        ocultarFormularios();
        // 2.Mostrar el formulario de modificación de presupuestos
        frmModificarPresupuesto.style.display = "block";
        // 3. Rellenar los datos de este formulario con los del presupuesto
        let Presupuesto = JSON.parse(boton.dataset.presupuesto);

        frmModificarPresupuesto.txtModIdPresupuesto.value = Presupuesto.BUDGET_ID;
        frmModificarPresupuesto.txtModNombrePresupuesto.value = Presupuesto.BUDGET_NAME;
        frmModificarPresupuesto.txtModFechaPresupuesto.value = Presupuesto.BUDGET_DATE;
        frmModificarPresupuesto.txtModCoberturaPresupuesto.value = Presupuesto.BUDGET_COVERAGE;
        actualizarDesplegableIdCliente(Presupuesto.CUSTOMER_ID);
        frmModificarPresupuesto.txtModPrimaPresupuesto.value = Presupuesto.BUDGET_PRIME;
        frmModificarPresupuesto.txtModEstadoPresupuesto.value = Presupuesto.BUDGET_STATUS;
       


    }
}

//-------------------------------PROCESAR MODIFICAR---------------------------------------------------

async function procesarModificarPresupuesto() {
    // Recuperar datos del formulario frmModificarpresupuesto
    let idPresupuesto = frmModificarPresupuesto.txtModIdPresupuesto.value.trim();
    let nombre = frmModificarPresupuesto.txtModNombrePresupuesto.value.trim();
    let fecha = frmModificarPresupuesto.txtModFechaPresupuesto.value.trim();
    let cobertura = frmModificarPresupuesto.txtModCoberturaPresupuesto.value.trim();
    let idCliente = frmModificarPresupuesto.lstModCliente.value.trim();
    let prima = parseFloat(frmModificarPresupuesto.txtModPrimaPresupuesto.value.trim());
    let estado = frmModificarPresupuesto.txtModEstadoPresupuesto.value.trim();

    // Validar datos del formulario
    if (validarModPresupuesto()) {
        let respuesta = await oSeguros.modificarPresupuesto(new Presupuesto(idPresupuesto, nombre, fecha, cobertura, idCliente, prima, estado));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarPresupuesto.reset();
            // Ocultar el formulario
            frmModificarPresupuesto.style.display = "none";
        }

    }
}

async function procesarModificarCliente() {
    // Recuperar datos del formulario frmModificarCliente
    let idCliente = frmModificarCliente.txtModIdCliente.value.trim();
    let nombre = frmModificarCliente.txtModNombre.value.trim();
    let direccion = frmModificarCliente.txtModDireccion.value.trim();
    let fechaNacimiento = frmModificarCliente.txtModFechaNacimiento.value.trim();
    let tlf = frmModificarCliente.txtModTlf.value.trim();
    let cs = frmModificarCliente.txtModCs.value.trim();
    let genero = frmModificarCliente.txtModGenero.value.trim();

    // Validar datos del formulario
    if (validarModCliente()) {
        let respuesta = await oSeguros.modificarCliente(new Cliente(idCliente, nombre, direccion, fechaNacimiento, tlf, cs, genero));

        alert(respuesta.mensaje);

        if (!respuesta.error) { // Si NO hay error
            //Resetear formulario
            frmModificarCliente.reset();
            // Ocultar el formulario
            frmModificarCliente.style.display = "none";
        }

    }
}

//-------------------------------PROCESAR LISTADO CLIENTE POR NOMBRE---------------------------------------------------
async function procesarListadoPorNombre() {
    // Recuperar idTipo seleccionado
    let nombreCliente = frmListadoPorNombre.txtListadoNombre.value.trim();

    let respuesta = await oSeguros.listadoPorNombre(nombreCliente);

    let tabla = "<table class='table table-striped' id='listadoPorNombre'>";
    tabla += "<thead><tr><th>IDCLIENTE</th><th>NOMBRE</th><th>DIRECCION</th><th>FECHA NACIMIENTO</th><th>TLF</th><th>ESTADO CIVIL</th><th>GENERO</th></tr></thead><tbody>";

    for (let cliente of respuesta.datos) {
        tabla += "<tr><td>" + cliente.CUSTOMER_ID + "</td>";
        tabla += "<td>" + cliente.CUSTOMER_NAME + "</td>";
        tabla += "<td>" + cliente.CUSTOMER_ADDRESS + "</td>";
        tabla += "<td>" + cliente.CUSTOMER_BIRTHDATE + "</td>";
        tabla += "<td>" + cliente.CUSTOMER_TLF + "</td>";
        tabla += "<td>" + cliente.CUSTOMER_CS + "</td>";
        tabla += "<td>" + cliente.CUSTOMER_GENDER + "</td></tr>"; 
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = tabla;

}

//-------------------------------PROCESAR LISTADO PRESUPUESTO SUPERIOR A PRIMA---------------------------------------------------
async function procesarListadoPorPrima() {
    // Recuperar idTipo seleccionado
    let prima = parseFloat(frmListadoPorPrima.txtListadoPrima.value.trim());
    let respuesta = await oSeguros.listadoPorPrima(prima);

    let tabla = "<table class='table table-striped' id='listadoPorPrima'>";
    tabla += "<thead><tr><th>IDPRESUPUESTO</th><th>NOMBRE</th><th>FECHA</th><th>COBERTURA</th><th>CLIENTE</th><th>PRIMA</th><th>ESTADO</th></tr></thead><tbody>";

    for (let presupuesto of respuesta.datos) {
        tabla += "<tr><td>" + presupuesto.BUDGET_ID + "</td>";
        tabla += "<td>" + presupuesto.BUDGET_NAME + "</td>";
        tabla += "<td>" + presupuesto.BUDGET_DATE + "</td>";
        tabla += "<td>" + presupuesto.BUDGET_COVERAGE + "</td>";
        tabla += "<td>" + presupuesto.CUSTOMERNAME+ "</td>";
        tabla += "<td>" + presupuesto.BUDGET_PRIME + "</td>";
        tabla += "<td>" + presupuesto.BUDGET_STATUS + "</td></tr>"; 
    }

    tabla += "</tbody></table>";

    // Agregamos el contenido a la capa de listados
    document.querySelector("#listados").innerHTML = tabla;

}

//################################################################
//#                                                              #
//#                         VALIDAR                              #
//#                                                              #
//################################################################



//-----------------------------VALIDAR BUSCAR------------------------------------------------------------------------------

function validarBuscarCliente() {
    let idCliente = parseInt(frmBuscarCliente.txtIdCliente.value.trim());
    let valido = true;
    let errores = "";
    if(idCliente.length == 0) 
    {
        valido = false;
        errores += "El identificador de Cliente no puede estar vacío";
    }
    else if (isNaN(idCliente)) {
        valido = false;
        errores += "El identificador de Cliente debe ser numérico";
    }
 
    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

function validarBuscarPresupuesto() {
    let idPresupuesto = parseInt(frmBuscarPresupuesto.txtIdPresupuesto.value.trim());
    let valido = true;
    let errores = "";

    if (isNaN(idPresupuesto)) {
        valido = false;
        errores += "El identificador de Cliente debe ser numérico";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

//-----------------------------VALIDAR MODIFICAR-------------------------------------------------------------------------------

function validarModPresupuesto() {
    // Recuperar datos del formulario frmModificarComponente
    let idPresupuesto = frmModificarPresupuesto.txtModIdPresupuesto.value.trim();
    let nombre = frmModificarPresupuesto.txtModNombrePresupuesto.value.trim();
    let fecha = frmModificarPresupuesto.txtModFechaPresupuesto.value.trim();
    let cobertura = frmModificarPresupuesto.txtModCoberturaPresupuesto.value.trim();
    let idCliente = frmModificarPresupuesto.lstModCliente.value.trim();
    let prima = parseFloat(frmModificarPresupuesto.txtModPrimaPresupuesto.value.trim());
    let estado = frmModificarPresupuesto.txtModEstadoPresupuesto.value.trim();
   
    let valido = true;
    let errores = "";

    if(isNaN(idPresupuesto)) {
        valido = false;
        errores += "El identificador del presupuesto debe ser numérico ";
    }

    if (isNaN(prima)) {
        valido = false;
        errores += "La prima del presupuesto debe ser numérico ";
    }

    if (nombre.length == 0 || fecha.length == 0 || cobertura.length == 0 || idCliente.length == 0 || prima.length == 0 || estado.length == 0) {
        valido = false;
        errores += "No pueden haber datos vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}


function validarModCliente() {
    // Recuperar datos del formulario frmModificarComponente
    let idCliente = frmModificarCliente.txtModIdCliente.value.trim();
    let nombre = frmModificarCliente.txtModNombre.value.trim();
    let direccion = frmModificarCliente.txtModDireccion.value.trim();
    let fechaNacimiento = frmModificarCliente.txtModFechaNacimiento.value.trim();
    let tlf = frmModificarCliente.txtModTlf.value;


    let valido = true;
    let errores = "";

    if (isNaN(idCliente)) {
        valido = false;
        errores += "El identificador de cliente debe ser numérico";
    }

    if (isNaN(tlf)) {
        valido = false;
        errores += "El telefono del cliente debe ser numérico";
    }

    if (nombre.length == 0 || direccion.length == 0 || fechaNacimiento.length == 0 || tlf.length == 0) {
        valido = false;
        errores += "El nombre, dirección, fecha de nacimineto y telefono no pueden estar vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}


//-----------------------------VALIDAR ALTA------------------------------------------------------------------------------

function validarAltaPresupuesto() {
    // Recuperar datos del formulario frmModificarComponente
    let nombre = frmAltaPresupuesto.txtNombrePresupuesto.value.trim();
    let fecha = frmAltaPresupuesto.txtFechaPresupuesto.value.trim();
    let cobertura =frmAltaPresupuesto.txtCoberturaPresupuesto.value.trim();
    let idCliente = frmAltaPresupuesto.lstAltaCliente.value.trim();
    let prima = parseFloat(frmAltaPresupuesto.txtPrimaPresupuesto.value.trim());
    let estado = frmAltaPresupuesto.txtEstadoPresupuesto.value.trim();

    let valido = true;
    let errores = "";

    if (isNaN(prima)) {
        valido = false;
        errores += "La prima del presupuesto debe ser numérico";
    }

    if (nombre.length == 0 || fecha.length == 0 || cobertura.length == 0 || idCliente.length == 0 || prima.length == 0 || estado.length == 0) {
        valido = false;
        errores += "No pueden haber datos vacíos";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

function validarAltaCliente() {
    let nombre = frmAltaCliente.txtNombre.value;
    let direccion = frmAltaCliente.txtDireccion.value;
    let fechaNacimiento = frmAltaCliente.txtFechaNacimiento.value;   
    let tlf = frmAltaCliente.txtTlf.value;
    let valido = true;
    let errores = "";

    if (nombre.length == 0 || direccion.length == 0 || fechaNacimiento.length == 0 || tlf.length == 0) {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        // Hay errores
        alert(errores);
    }

    return valido;
}

//################################################################
//#                                                              #
//#              FUNCIONES PARA MOSTRAR LISTADOS                 #
//#                                                              #
//################################################################

// Mostrar listado de tipos de Clientes
function mostrarListadoCliente() {
    open("listado_clientes.html");
}

// Mostrar listado de tipos de Presupuestos
function mostrarListadoPresupuesto() {
    open("listado_presupuesto.html");
}
