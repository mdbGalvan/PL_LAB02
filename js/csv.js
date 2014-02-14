"use strict"; 

function calculate() {
    var result;
    var textArea = document.getElementById("textArea");				// TextArea
    var temp = textArea.value;										// Guarda su valor
    var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;	// ER, que cazará con cada elemento
    var lines = temp.split(/\n+\s*/); 								// Array cuyos elementos son un string con cada fila
    var commonLength = NaN;
    var r = [];														// Almacena cada elemento del underscore, JSON
	var h = [];														// Almacena cada elemento del encabezado, JSON
	var reg = [];													// Almacena el nº de registros con errores

    for (var t in lines) {											// Recorre cada línea (no incluye los saltos de línea sin datos)
        var temp = lines[t];										// Almacena en m toda la línea t
        var m = temp.match(regexp);									// Array que contiene en cada elemento todo lo cazado en la línea
        var result = [];											// Array que contiene la información de cada celda de un registro
        var error = false;	
		var register;												// Almacena el valor del registro con o sin encabezado
		(document.getElementById("header_Y").checked) ? register = parseInt(t) : register = (parseInt(t)+1);
		
        if (m) {													// Si caza algo
            if (commonLength && (commonLength != m.length)) {		// Controla si el nº de col coincide con el anterior bien, sino da error 
                //alert('ERROR! row <'+temp+'> has '+m.length+' items!');	
				reg.push(parseInt(t)+1);							// Se añade el registro que no cumple con el nº de columnas
                error = true;
            } else {
                commonLength = m.length;							// Guarda el nº de columnas del CSV del registro t
                error = false;
            }
            for (var i in m) {
                var removecomma = m[i].replace(/,\s*$/, '');		// Reemplaza la , por '' (nada) del elemento de la columna i con registro t
                var remove1stquote = removecomma.replace(/^\s*"/, '');			// Reemplaza la comilla final por ''
                var removelastquote = remove1stquote.replace(/"\s*$/, '');		// Reemplaza la comilla inicial por ''
                var removeescapedquotes = removelastquote.replace(/\\"/, '"');	// Reemplaza \" por "
                result.push(removeescapedquotes);								// El item limpio se añade a result
            }
			if ((t == "0") && (document.getElementById("header_Y").checked)){	// JSON que almacena los valores del encabezado si está seleccionado
				h.push({
					value: result
				});
			} else {
				var error = error ? 'error' : '';									// Sirve para saber que registro tiene error, que se guardará en el JSON
				var parity = (parseInt(t)+1) % 2 == 0 ? 'even' : 'odd';				// Devuelve si es registro par o impar, y así pintar distinto el td
				r.push({
					parity: parity,
					error: error,
					register: register,
					value: result
				});
			}
        } else {													// Sino caza nada al inicio devuelve un error
            alert('ERROR! row ' + temp + ' does not look as legal CSV');
            error = true;
        }
    }
	reg.length == 1 ? registro.innerHTML = 'El registro ' : registro.innerHTML = 'Los registros ';
	registro.innerHTML += reg.join(', ') + ' no tiene el nº de columnas correcta.';	
	if (reg.length == 0) registro.innerHTML = 'La conversión ha sido correcta.';
	
	// Underscore
	var template = lista.innerHTML;	
    finaltable.innerHTML = _.template(template, {
		header: h,	// Encabezado
        items: r	// El resto		
    });
}