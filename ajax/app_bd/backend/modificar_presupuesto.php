<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$presupuesto = json_decode($_POST['presupuesto']);

$sql = "UPDATE INSURANCE_BUDGETS
SET 
BUDGET_NAME = '" . $presupuesto->nombre . "', 
    BUDGET_DATE = '" . $presupuesto->fecha . "', 
    BUDGET_COVERAGE = '" . $presupuesto->cobertura . "',
    CUSTOMER_ID = " . $presupuesto->idCliente . ",
    BUDGET_PRIME = " . $presupuesto->prima . ",
    BUDGET_STATUS = '" . $presupuesto->estado . "'
WHERE BUDGET_ID = $presupuesto->idPresupuesto";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el presupuesto", $conexion);
}
?>