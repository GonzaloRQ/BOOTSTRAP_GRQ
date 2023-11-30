<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$presupuesto = json_decode($_POST['presupuesto']);

$sql = "INSERT INTO INSURANCE_BUDGETS VALUES(null, '$presupuesto->nombre' , '$presupuesto->fecha', '$presupuesto->cobertura', $presupuesto->idCliente, $presupuesto->prima, '$presupuesto->estado'); ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta el presupuesto", $conexion);
}
?>