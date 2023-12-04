function entroEnFoco(elemento) {
	elemento.className='enfoco';
}

function salioDeFoco(elemento) {
	elemento.className='';
	
}

function revisarObligatorio(elemento) {
	if (elemento.value=="") {
		elemento.className='error';	
	} else {
		elemento.className='';	
	}
}

function revisarLongitud(elemento, minimoDeseado) {
	if (elemento.value!="") {
		var dato = elemento.value;
		if (dato.length<minimoDeseado) {
			elemento.className='error';	
		} else {
			elemento.className='';	
		}
	}
}

function revisarNumerico(elemento) {
	if (elemento.value!="") {
		var dato = elemento.value;
		if (isNaN(dato)) {
			elemento.className='error';
            alert("Debe ser un valor numérico entre 18 y 29.");
		} else {
			if (dato >=18 && dato <=29) {
				elemento.className='';
			} else {
				elemento.className='error';
				alert("Edad entre 18 y 29 años.");
			}
		}
	}
}

function revisarEmail(elemento) {
	if (elemento.value!="") {
		var dato = elemento.value;
		var expresion = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
		if (!expresion.test(dato)) {
			elemento.className='error';
            alert("Correo invalido");
		} else {
			elemento.className='';	
		}
			
	}
}

function validar(event) {
	var estaTodoOK = true;
	if (document.getElementById("nombre").value.length<4) {
		estaTodoOK = false;	
	}
	if (document.getElementById("apellido").value.length<4) {
		estaTodoOK = false;	
	}
	if (document.getElementById("compañia").value.length<2) {
		estaTodoOK = false;	
	}
	if (document.getElementById("telefono").value.length<10) {
		estaTodoOK = false;	
	}
	var expresion = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
	if (!expresion.test(document.getElementById("email").value)) {
		estaTodoOK = false;	
	}
	if (document.getElementById("direccion").value.length<8) {
			estaTodoOK = false;	
		}
	if (document.getElementById("calle").value.length<8) {
			estaTodoOK = false;	
		}
	if (document.getElementById("ciudad").value.length<2) {
			estaTodoOK = false;	
		}
	if (document.getElementById("estado").value.length<4) {
			estaTodoOK = false;	
		}
	if (document.getElementById("codigopostal").value.length<4) {
			estaTodoOK = false;	
		}
    if (document.getElementById("pais").value=="") {
		estaTodoOK = false;
	}
	if (document.getElementById("conferencia").value.length<7) {
		estaTodoOK = false;	
	}
	if (!estaTodoOK) {
		alert("Algunos datos tienen errores, por favor corregir antes de volver a enviar.");	
	}
    
    if (estaTodoOK){
    	var nom = document.getElementById("nombre").value;
		var ape = document.getElementById("apellido").value;
    	var com = document.getElementById("compañia").value;
        var tel= document.getElementById("telefono").value;
    	var ce = document.getElementById("email").value;
		var dire = document.getElementById("direccion").value;
		var cal = document.getElementById("calle").value;
		var ciud = document.getElementById("ciudad").value;
		var est = document.getElementById("estado").value;
		var cop = document.getElementById("codigopostal").value;
		var pai = document.getElementById("pais").value;
		var conf = document.getElementById("conferencia").value;

		var cursosmañanas= document.getElementById("cursosmañanas");
		var cursostardes= document.getElementById("cursostardes");
		var workshop= document.getElementById("workshop");
		var cena= document.getElementById("cena");

    	document.write("<strong>***** Datos registrados ******</strong><br/>");
    	document.write("Nombre: " + nom + " <br/>");
		document.write("Apellido: " + ape + " <br/>");
    	document.write("Direccion: " + com + " <br/>");
        document.write("Telefono: " + tel + " <br/>");
    	document.write("Correo: " + ce + " <br/>");
		document.write("<hr>");
		document.write("Domicilio. <br/>");

		document.write("Dirección: " + dire + " <br/>");
		document.write("Calle: " + cal + " <br/>");
		document.write("Ciudad: " + ciud + " <br/>");
		document.write("Estado: " + est + " <br/>");
		document.write("Código Postal: " + cop + " <br/>");
		document.write("País: " + pai + " <br/>");
		document.write("<hr>");

		document.write("Participación en conferencias. <br/>");
		document.write("Nombre de la conferencia: " + conf + " <br/>");
		document.write("Participación en... ");

		if(cursosmañanas.checked){
			document.write("Conferencias por las mañanas. ");
		}

		if(cursostardes.checked){
			document.write("Conferencias por las tardes. ");
		}

		if(workshop.checked){
			document.write("Workshop. ");
		}

		if(cena.checked){
			document.write("Cena. ");
		}

		document.write("<br/>");
		document.write("<br/>");


        document.write("<a href=\"validaciones.html\">Regresar</a> ");
        alert("Registro exitoso!!!");
    }
	event.preventDefault();
	return estaTodoOK;
}
