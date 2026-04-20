const express = require('express');
const app = express();
const PORT = 3000;
const dispositivos = require('./database');
const { requestLogger, validarDispositivo } = require('./middlewares');

app.use(express.json());
app.use(requestLogger);

app.get('/dispositivos', (req, res) => {
  res.status(200).json(dispositivos);
});

app.post('/dispositivos', validarDispositivo, (req, res) => {
  const { nombre, ip, estado, tipo } = req.body;

  const nuevoId = dispositivos.length > 0 
    ? Math.max(...dispositivos.map(d => d.id)) + 1 
    : 1;

  const nuevoDispositivo = {
    id: nuevoId,
    nombre,
    ip,
    estado: estado || "activo",
    tipo
  };

  dispositivos.push(nuevoDispositivo);
  res.status(201).json(nuevoDispositivo);
});

app.put('/dispositivos/:id', validarDispositivo, (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, ip, estado, tipo } = req.body;

  const dispositivo = dispositivos.find(d => d.id === id);

  if (!dispositivo) {
    return res.status(404).json({ error: `Not Found: ID ${id} no encontrado.` });
  }

  dispositivo.nombre = nombre;
  dispositivo.ip = ip;
  if (estado) dispositivo.estado = estado;
  dispositivo.tipo = tipo;

  res.status(200).json(dispositivo);
});
app.delete('/dispositivos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = dispositivos.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Not Found: ID ${id} no encontrado.` });
  }

  const dispositivoEliminado = dispositivos.splice(index, 1);
  res.status(200).json({ 
    mensaje: "Dispositivo eliminado",
    dispositivo: dispositivoEliminado[0] 
  });
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});