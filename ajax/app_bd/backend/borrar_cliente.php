<?php
//borrar_cliente.php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idCliente = $_POST['idCliente'];

// SQL
$sql = "DELETE FROM CUSTOMERS WHERE CUSTOMER_ID = $idCliente;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

?>