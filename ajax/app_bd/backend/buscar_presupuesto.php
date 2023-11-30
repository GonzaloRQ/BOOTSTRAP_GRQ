<?php
//buscar_presupuesto.php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idPresupuesto= $_POST['idPresupuesto'];

// SQL
$sql = "SELECT i.*, c.CUSTOMER_NAME AS CUSTOMERNAME FROM INSURANCE_BUDGETS i, CUSTOMERS c
WHERE c.CUSTOMER_ID = i.CUSTOMER_ID
AND BUDGET_ID = $idPresupuesto;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el presupuesto", $conexion);
}

?>