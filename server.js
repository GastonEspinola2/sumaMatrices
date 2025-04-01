const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuramos el servidor para que maneje datos JSON
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/sumarMatrices', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Verificamos si las matrices tienen el mismo tamaño
    const filas1 = matriz1.length;
    const columnas1 = matriz1[0].length;
    const filas2 = matriz2.length;
    const columnas2 = matriz2[0].length;

    if (filas1 !== filas2 || columnas1 !== columnas2) {
        return res.status(400).json({ error: 'Las matrices deben tener las mismas dimensiones' });
    }

    // Realizamos la suma de matrices
    let matrizResultado = [];
    for (let i = 0; i < filas1; i++) {
        let fila = [];
        for (let j = 0; j < columnas1; j++) {
            fila.push(matriz1[i][j] + matriz2[i][j]);
        }
        matrizResultado.push(fila);
    }

    // Enviamos la matriz resultado al cliente
    res.json({ matrizResultado });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
