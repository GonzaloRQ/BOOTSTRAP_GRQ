<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$cliente = json_decode($_POST['cliente']);

$sql = "UPDATE CUSTOMERS
SET 
CUSTOMER_NAME = '" . $cliente->nombre . "', 
    CUSTOMER_ADDRESS = '" . $cliente->direccion . "', 
    CUSTOMER_BIRTHDATE = '" . $cliente->fechaNacimiento . "', 
    CUSTOMER_TLF = " . $cliente->tlf . ",
    CUSTOMER_CS = '" . $cliente->estadoCivil . "',
    CUSTOMER_GENDER = '" . $cliente->genero . "'
WHERE CUSTOMER_ID = $cliente->idCliente";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el componente", $conexion);
}
?>