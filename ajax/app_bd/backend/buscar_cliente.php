<?php
//buscar_cliente.php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idCliente = $_POST['idCliente'];

// SQL
$sql = "SELECT * FROM CUSTOMERS 
WHERE CUSTOMER_ID = $idCliente;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el cliente", $conexion);
}

?>