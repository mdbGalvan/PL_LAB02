"use strict"; 

function calculate() {
    var result;
    var textArea = document.getElementById("textArea");				// TextArea
    var temp = textArea.value;										// Guarda su valor
    var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;	// ER, que cazará con cada elemento
    var lines = temp.split(/\n+\s*/); 								// Array cuyos elementos son un string con cada fila
    var commonLength = NaN;
    var r = [];														// Almacena cada elemento del underscore
	var reg = [];													// Almacena el nº de registros con errores
    // Template using underscore
    var row = "<% _.each(items, function(name) { %><td><%= name %></td><% }); %>";	// UnderScore, template para el formato de la tabla

    for (var t in lines) {											// Recorre cada línea (no incluye los saltos de línea sin datos)
        var temp = lines[t];										// Almacena en m toda la línea t
        var m = temp.match(regexp);									// Array que contiene en cada elemento todo lo cazado en la línea
        var result = [];											// Array que contiene la información de cada celda de un registro
        var error = false;											

        if (m) {													// Si caza algo
            if (commonLength && (commonLength != m.length)) {					// Controla si el nº de col coincide con el anterior bien, sino da error 
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
			var error = error ? 'error' : '';									// Sirve para saber que registro tiene error, que se guardará en el JSON
			var parity = (parseInt(t)+1) % 2 == 0 ? 'even' : 'odd';				// Devuelve si es registro par o impar, y así pintar distinto el td
            r.push({
				parity: parity,
				error: error,
				register: (parseInt(t)+1),
                value: result
            });
			// UnderScore
            //var tr = error ? '<tr><th class="error">Registro ' + (parseInt(t)+1) + '</th>' : '<tr><th>Registro ' + (parseInt(t)+1) + '</th>';
            //r.push(tr + _.template(row, {
            //    items: result
            //}) + "</tr>");
        } else {													// Sino caza nada al inicio devuelve un error
            alert('ERROR! row ' + temp + ' does not look as legal CSV');
            error = true;
        }
    }
    //r.unshift('<table border=0>');									// Añade al inicio del array
    //r.push('</table>');												// Añade al final
    //alert(r.join('\n')); // debug
    //finaltable.innerHTML = r.join('\n');							// Convierte el array r en string separados por salto de línea cada elemento, y lo añade en id=finaltable
	reg.length == 1 ? registro.innerHTML = 'El registro ' : registro.innerHTML = 'Los registros ';
	registro.innerHTML += reg.join(', ') + ' no tiene el nº de columnas correcta.';	
	
	var template = lista.innerHTML;
    finaltable.innerHTML = _.template(template, {
        items: r
    });
}