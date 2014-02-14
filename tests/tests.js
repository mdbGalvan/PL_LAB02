var assert = chai.assert;

suite('CSV', function() {
    test('Devuelve un string', function() {
        textArea.value = '"Esto", "Devuelve" \n "Un", "String"';
        calculate();
        assert.isString(finaltable.innerHTML);
    });
	test('Resultado Correcto con Encabezado', function() {
        textArea.value = '"Con Encabezado", "Sin Encabezado" \n Si, No';
		$("#header_Y").prop("checked", true);
        calculate();
        assert.deepEqual(finaltable.innerHTML, '\n\t\t<table border="0">\n\t\t\t\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td class="empty"></td>\n\t\t\t\t\t\n\t\t\t\t\t\t<th>Con Encabezado</th>\n\t\t\t\t\t\n\t\t\t\t\t\t<th>Sin Encabezado</th>\n\t\t\t\t\t\n\t\t\t\t</tr>\n\t\t\t\n\t\t\t\n\t\t\t\t<tr>\n\t\t\t\t\t<th class="">Registro 1</th>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="even">Si</td>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="even"> No</td>\n\t\t\t\t\t\n\t\t\t\t</tr>\n\t\t\t\n\t\t</tbody></table>\n    ');
    });
	test('Resultado Correcto sin Encabezado.', function() {
        textArea.value = '"Con Encabezado", "Sin Encabezado" \n Si, No';
		$("#header_N").prop("checked", true);
        calculate();
        assert.deepEqual(finaltable.innerHTML, '\n\t\t<table border="0">\n\t\t\t\n\t\t\t\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<th class="">Registro 1</th>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="odd">Con Encabezado</td>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="odd">Sin Encabezado</td>\n\t\t\t\t\t\n\t\t\t\t</tr>\n\t\t\t\n\t\t\t\t<tr>\n\t\t\t\t\t<th class="">Registro 2</th>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="even">Si</td>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="even"> No</td>\n\t\t\t\t\t\n\t\t\t\t</tr>\n\t\t\t\n\t\t</tbody></table>\n    ');
    });
	test('Resultado de los registros err\u00f3neos sin error.', function() {
        textArea.value = '"Con Encabezado", "Sin Encabezado" \n Si, No';
		$("#header_N").prop("checked", true);
        calculate();
        assert.deepEqual(registro.innerHTML, 'La conversi\u00f3n ha sido correcta.');
    });
	test('Resultado de los registros err\u00f3neos con error.', function() {
        textArea.value = '"Con Encabezado", "Sin Encabezado" \n Si, No, "Tal vez"';
		$("#header_Y").prop("checked", true);
        calculate();
        assert.deepEqual(registro.innerHTML, 'El registro 1 no tiene el n\u00famero de columnas correcta.');
    });
	test('Comprobando LocalStorage.', function() {
        assert.deepEqual(localStorage.textArea, '"Con Encabezado", "Sin Encabezado" \n Si, No, "Tal vez"');
    });
	test('Error al introducir n\u00famero de columnas distintas.', function() {
        textArea.value = '"Con Encabezado", "Sin Encabezado" \n Si, No, "Tal vez"';
		$("#header_N").prop("checked", true);
        calculate();
        assert.match(finaltable.innerHTML, /error/);
    });
	
});