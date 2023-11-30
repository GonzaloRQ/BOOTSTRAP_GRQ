<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$clienteN = $_GET['cliente'];

// SQL
$sql = "SELECT * FROM CUSTOMERS 
WHERE CUSTOMER_NAME LIKE '%$clienteN%';";


$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);