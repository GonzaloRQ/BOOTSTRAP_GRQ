<?php
//listado_clientes.php
require_once('config.php');
$conexion = obtenerConexion();

// No hay datos de entrada

// SQL
$sql = "SELECT i.*, c.CUSTOMER_NAME AS CUSTOMERNAME FROM CUSTOMERS c, INSURANCE_BUDGETS i 
WHERE i.CUSTOMER_ID = c.CUSTOMER_ID;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);
?>