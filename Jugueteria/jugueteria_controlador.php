<?php
require_once "jugueteria_modelo.php";

if (
    isset($_REQUEST['nombre']) and isset($_REQUEST['producto']) and isset($_REQUEST['cantidad'])    
) {

    $jugueteria= new Jugueteria();
    $jugueteria->nombre=$_REQUEST['nombre'];
    $jugueteria->producto=$_REQUEST['producto'];
    $jugueteria->cantidad=$_REQUEST['cantidad'];

    $resultado = $jugueteria->calcularTotal();
    
    header('Location: jugueteria_vista.php? res='.$resultado. "&nom=".$jugueteria->nombre. "&product=".$jugueteria->producto);

}

?>