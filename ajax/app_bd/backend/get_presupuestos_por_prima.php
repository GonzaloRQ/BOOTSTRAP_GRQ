<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$prima = $_GET['prima'];

// SQL
$sql = "SELECT DISTINCT i.*, c.CUSTOMER_NAME AS CUSTOMERNAME 
FROM CUSTOMERS c, INSURANCE_BUDGETS i
WHERE i.CUSTOMER_ID = c.CUSTOMER_ID
AND i.BUDGET_PRIME >= $prima;";


$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, false, "Datos recuperados", $conexion);