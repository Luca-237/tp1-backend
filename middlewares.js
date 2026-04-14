const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} - ${timestamp}`);
  next(); 
};
const validarDispositivo = (req, res, next) => {
  const { nombre, ip, tipo } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "Completar nombre" });
  }

  if (!tipo || tipo.trim() === "") {
    return res.status(400).json({ error: "Completar tipo de dispositivo" });
  }

  if (!ip) {
    return res.status(400).json({ error: "Completar ip" });
  }
  
  const regexIPv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!regexIPv4.test(ip)) {
    return res.status(400).json({ error: "Error en la ip" });
  }

  next();
};

module.exports = {
  requestLogger,
  validarDispositivo
};