function crearMatrices() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);
    
    let matrixInputsHTML = '';
    for (let i = 0; i < 2; i++) {
        matrixInputsHTML += `<h2>Matriz ${i + 1}</h2>`;
        matrixInputsHTML += '<table>';
        for (let row = 0; row < rows; row++) {
            matrixInputsHTML += '<tr>';
            for (let col = 0; col < cols; col++) {
                matrixInputsHTML += `<td><input type="number" name="matrix${i + 1}row${row}col${col}" placeholder="Fila ${row + 1}, Columna ${col + 1}"></td>`;
            }
            matrixInputsHTML += '</tr>';
        }
        matrixInputsHTML += '</table>';
    }
    
    document.getElementById('matrixInputs').innerHTML = matrixInputsHTML;
}

function sendMatrices() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    const matrices = [[], []];

    for (let i = 0; i < 2; i++) {
        matrices[i] = [];
        for (let row = 0; row < rows; row++) {
            matrices[i][row] = [];
            for (let col = 0; col < cols; col++) {
                const value = parseFloat(document.querySelector(`input[name="matrix${i + 1}row${row}col${col}"]`).value);
                if (isNaN(value)) {
                    alert(`Por favor, ingrese un valor numérico para la fila ${row + 1}, columna ${col + 1} de la Matriz ${i + 1}`);
                    return;
                }
                matrices[i][row][col] = value;
            }
        }
    }

    fetch('/sumar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matrices })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Resultado de la suma de matrices: ${JSON.stringify(data.result)}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
