import fetch from 'node-fetch';
import express from 'express';
const app = express();
const port = 4000;

app.get('/', async (req, res) => {
  try {
    const response = await fetch('http://192.168.100.5:3000/staff');
    const data = await response.json();

    // Generar HTML con los datos recibidos
    const html = `
      <html>
        <head>
          <title>Front-End</title>
        </head>
        <body>
          <h1>Front-End</h1>
          <button id="getDataButton">Obtener datos</button>
          <pre id="staffData">${JSON.stringify(data, null, 2)}</pre>
          <script>
            const getDataButton = document.getElementById('getDataButton');
            const staffDataContainer = document.getElementById('staffData');
            getDataButton.addEventListener('click', async () => {
              try {
                const response = await fetch('http://192.168.100.5:3000/staff');
                const data = await response.json();
                staffDataContainer.textContent = JSON.stringify(data, null, 2);
              } catch (error) {
                staffDataContainer.textContent = 'Error al obtener los datos';
              }
            });
          </script>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error al cargar la página');
  }
});

app.listen(port, () => {
  console.log(`Servidor Frontend en ejecución en http://localhost:${port}`);
});
