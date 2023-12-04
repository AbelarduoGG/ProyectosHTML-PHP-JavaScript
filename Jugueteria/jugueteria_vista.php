<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juguetería</title>
</head>
<body>
    <form action="jugueteria_controlador.php" method="post" enctype="application/x-www-form-urlencoded">
            <label for="nombre">Nombre del Cliente</label>
            <input name="nombre" id="nombre" type="text" /> 
            <br><br>

            <label for="producto">Producto</label>
            <select name="producto" id="producto"> 
                    <option value="Se">Seleccionar</option>               
                    <option value="Pelotas">Pelotas</option>
                    <option value="Muñecas">Muñecas</option>
                    <option value="Carritos">Carritos</option>                
            </select>
            <br><br>

            <label for="cantidad">Cantidad</label>
            <input name="cantidad" id="cantidad" type="number"/> 
            <br><br>

            <input type="submit" value="Enviar" />
    </form>

    <?php

if (
    isset($_REQUEST['res']) and isset($_REQUEST['nom']) and isset($_REQUEST['product'])){ 

        echo "Hola ".$_REQUEST['nom'];       
        echo "<br> El total de la compra es: ".$_REQUEST['res'];
        echo "<br> El producto es: " .$_REQUEST['product'];
       
    }
    ?>
</body>
</html>