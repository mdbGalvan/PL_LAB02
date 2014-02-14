var assert = chai.assert;

suite('CSV', function() {
    test('Devuelve un string', function() {
        textArea.value = '"Esto", "Devuelve" \n "Un", "String"';
        calculate();
        assert.isString(finaltable.innerHTML);
    });
	test('Resultado Correcto', function() {
        textArea.value = '"Con Encabezado", "Sin Encabezado" \n Si, No';
        calculate();
        assert.deepEqual(finaltable.innerHTML, '\n\t\t<table border="0">\n\t\t\t\n\t\t\t\t<tbody><tr>\n\t\t\t\t\t<td class="empty"></td>\n\t\t\t\t\t\n\t\t\t\t\t\t<th>Con Encabezado</th>\n\t\t\t\t\t\n\t\t\t\t\t\t<th>Sin Encabezado</th>\n\t\t\t\t\t\n\t\t\t\t</tr>\n\t\t\t\n\t\t\t\n\t\t\t\t<tr>\n\t\t\t\t\t<th class="">Registro 1</th>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="even">Si</td>\n\t\t\t\t\t\n\t\t\t\t\t\t<td class="even"> No</td>\n\t\t\t\t\t\n\t\t\t\t</tr>\n\t\t\t\n\t\t</tbody></table>\n    ');
    });
});