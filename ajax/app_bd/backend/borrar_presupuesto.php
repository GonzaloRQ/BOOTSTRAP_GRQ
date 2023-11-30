<?php
//borrar_cliente.php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idPresupuesto = $_POST['idPresupuesto'];

// SQL
$sql = "DELETE FROM INSURANCE_BUDGETS WHERE BUDGET_ID = $idPresupuesto;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

?>