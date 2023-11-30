//objetos.js
class Cliente {
    constructor(idCliente, nombre, direccion, fechaNacimiento, tlf, estadoCivil, genero) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.direccion = direccion;
        this.fechaNacimiento = fechaNacimiento;
        this.tlf = tlf;
        this.estadoCivil = estadoCivil;
        this.genero = genero;
    }
}

class Presupuesto{
    constructor(idPresupuesto, nombre, fecha, cobertura, idCliente, prima, estado){
        this.idPresupuesto = idPresupuesto;
        this.nombre = nombre;
        this.fecha = fecha;
        this.cobertura = cobertura;
        this.idCliente = idCliente;
        this.prima = prima;
        this.estado = estado;
    }
}

class Seguro {

    //*###############################################
    //*                                              #
    //*                      ALTA                    #
    //*                                              #  
    //*###############################################

    async altaCliente(oCliente) {
        let datos = new FormData();

        datos.append("nombre", oCliente.nombre);
        datos.append("direccion", oCliente.direccion);
        datos.append("fechaNacimiento", oCliente.fechaNacimiento);
        datos.append("tlf", oCliente.tlf);
        datos.append("estadoCivil", oCliente.estadoCivil);
        datos.append("genero", oCliente.genero);

        let respuesta = await peticionPOST("alta_cliente.php", datos);

        return respuesta;
    }

    async altaPresupuesto(oPresupuesto) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("presupuesto",JSON.stringify(oPresupuesto));
       
        let respuesta = await peticionPOST("alta_presupuesto.php", datos);

        return respuesta;
    }


    //TODO###############################################
    //TODO                                              #
    //TODO                 MODIFICAR                    #
    //TODO                                              #  
    //TODO###############################################

    async modificarCliente(oCliente) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("cliente",JSON.stringify(oCliente));
       
        let respuesta = await peticionPOST("modificar_cliente.php", datos);
        return respuesta;
    }

    async modificarPresupuesto(oPresupuesto) {
        let datos = new FormData();

        // Se podría pasar campo a campo al servidor
        // pero en esta ocasión vamos a pasar todos los datos 
        // en un solo parámetro cuyos datos van en formato JSON
        datos.append("presupuesto",JSON.stringify(oPresupuesto));
       
        let respuesta = await peticionPOST("modificar_presupuesto.php", datos);
        return respuesta;
    }


    //?###############################################
    //?                                              #
    //?                    BUSCAR                    #
    //?                                              #  
    //?###############################################

    async buscarPresupuesto(idPresupuesto) {
        let datos = new FormData();

        datos.append("idPresupuesto", idPresupuesto);

        let respuesta = await peticionPOST("buscar_presupuesto.php", datos);

        return respuesta;
    }

    async buscarCliente(idCliente) {
        let datos = new FormData();

        datos.append("idCliente", idCliente);

        let respuesta = await peticionPOST("buscar_cliente.php", datos);

        return respuesta;
    }

    //!###############################################
    //!                                              #
    //!                    BORRAR                    #
    //!                                              #  
    //!###############################################  


    async borrarCliente(idCliente) {
        let datos = new FormData();

        datos.append("idCliente", idCliente);

        let respuesta = await peticionPOST("borrar_cliente.php", datos);

        return respuesta;
    }

    async borrarPresupuesto(idPresupuesto) {
        let datos = new FormData();

        datos.append("idPresupuesto", idPresupuesto);

        let respuesta = await peticionPOST("borrar_presupuesto.php", datos);

        return respuesta;
    }


    //################################################
    //#                                              #
    //#                   LISTADO                    #
    //#                                              #  
    //################################################

    async listadoCliente() {
        let listado = "";

        let respuesta = await peticionGET("listado_clientes.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDCLIENTE</th><th>NOMBRE</th><th>DIRECCION</th><th>FECHA DE NACIMIENTO</th><th>TLF</th><th>ESTADO CIVIL</th><th>GENERO</th></tr></thead>";
            listado += "<tbody>";

            for (let cliente of respuesta.datos) {
                listado += "<tr><td>" + cliente.CUSTOMER_ID + "</td>";
                listado += "<td>" + cliente.CUSTOMER_NAME + "</td>";
                listado += "<td>" + cliente.CUSTOMER_ADDRESS + "</td>";
                listado += "<td>" + cliente.CUSTOMER_BIRTHDATE + "</td>";
                listado += "<td>" + cliente.CUSTOMER_TLF + "</td>";
                listado += "<td>" + cliente.CUSTOMER_CS + "</td>";
                listado += "<td>" + cliente.CUSTOMER_GENDER + "</td>";
             

            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async listadoPresupuesto() {
        let listado = "";

        let respuesta = await peticionGET("listado_presupuestos.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>IDPRESUPUESTO</th><th>NOMBRE</th><th>FECHA</th><th>COBERTURA</th><th>CLIENTE</th><th>PRIMA</th><th>ESTADO</th></tr></thead>";
            listado += "<tbody>";

            for (let presupuesto of respuesta.datos) {
                listado += "<tr><td>" + presupuesto.BUDGET_ID + "</td>";
                listado += "<td>" + presupuesto.BUDGET_NAME + "</td>";
                listado += "<td>" + presupuesto.BUDGET_DATE + "</td>";
                listado += "<td>" + presupuesto.BUDGET_COVERAGE + "</td>";
                listado += "<td>" + presupuesto.CUSTOMERNAME + "</td>";
                listado += "<td>" + presupuesto.BUDGET_PRIME + "</td>";
                listado += "<td>" + presupuesto.BUDGET_STATUS + "</td>";
             

            }
            listado += "</tbody></table>";
        }

        return listado;
    }

    async listadoPorNombre(cliente){
        let datos = new FormData();

        datos.append("cliente",cliente);

        let respuesta = await peticionGET("get_clientes_por_nombre.php", datos);

        return respuesta;
    }

    async listadoPorPrima(prima){
        let datos = new FormData();

        datos.append("prima",prima);

        let respuesta = await peticionGET("get_presupuestos_por_prima.php", datos);

        return respuesta;
    }
    //-------GET--------------------------------
    
    async getClientes() {
        let datos = new FormData();

        let respuesta = await peticionGET("get_cliente.php", datos);

        return respuesta;
    }

}