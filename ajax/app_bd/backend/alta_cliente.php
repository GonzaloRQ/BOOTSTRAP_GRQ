
<?php
//alta_cliete.php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$nombre = $_POST['nombre'];
$direccion= $_POST['direccion'];
$fechaNacimiento = $_POST['fechaNacimiento'];
$tlf = $_POST['tlf'];
$estadoCivil = $_POST['estadoCivil'];
$genero = $_POST['genero'];

$sql = "INSERT INTO CUSTOMERS VALUES (null,'$nombre','$direccion','$fechaNacimiento','$tlf','$estadoCivil','$genero');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha insertado el cliente", $conexion);
}
?>
