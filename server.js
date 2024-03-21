const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('public/index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Archivo HTML no encontrado');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/sumar') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { matrices } = JSON.parse(body);
            const result = sumMatrices(matrices[0], matrices[1]);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ result }));
        });
    } else {
        res.writeHead(404);
        res.end('Ruta no encontrada');
    }
});

function sumMatrices(matrix1, matrix2) {
    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return result;
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}/`);
});