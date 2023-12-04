 function calcularImporte(prod,cant,sab,imp){

    var importe=0;

    if(prod==3){
        importe+=3.9;
    }

    if(prod==2){
        importe+=2.6;
    }

    if(prod==1 && sab=="Chocolate"){
        importe+=3.9;
    }

    if(prod==1 && sab=="Vainilla"){
        importe+=11.7;
    }

    if(prod==1 && sab=="Fresa"){
        importe+=23.4;
    }

    if(imp.checked == true){
        importe += (importe * .16);
    }

    importe = parseFloat(importe)*parseInt(cant);
    document.write("El total a pagar es: " + importe.toFixed(2) + " pesos.");
}

function calcularNota(event){

    var nombre = document.getElementById("nombre").value;
    var producto = document.getElementById("producto").value;
    var cantidad = document.getElementById("cantidad").value;
    var sabor = document.querySelector('input[name="sabores"]:checked').value;
    var impuesto= document.getElementById("impuesto");
 
    document.write("<strong>***** Nota de Venta ******</strong><br>");
    document.write("<hr>");
    document.write("Nombre Cliente: " + nombre + " <br>");
    document.write("Producto: " + producto + " <br>");
    document.write("Cantidad " + cantidad + " <br>");
    document.write("Sabor: " + sabor +" <br>");
    if(impuesto.checked) {document.write("Impuestos Incluidos <br>");}
    document.write("<hr>");
    calcularImporte(producto,cantidad,sabor,impuesto);
    document.write("<hr>");
    document.write("<a href=\"nota.html\">Regresar</a> ");
    
    event.preventDefault();
}