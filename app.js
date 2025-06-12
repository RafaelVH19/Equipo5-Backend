require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3001;
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes')
const transporterRoutes = require('./routes/transporterRoutes');
const receptorRoutes = require('./routes/receptorRoutes');
const areaRoutes = require('./routes/areaRoutes');
const containerRoutes = require('./routes/containerRoutes');
const dangerous_wasteRoutes = require('./routes/dangerous_wasteRoutes');
const registerRoutes = require('./routes/registerRoutes');
const logRoutes = require('./routes/logRoutes');
const opcionesRoutes = require('./routes/opcionesRoutes');
const bcrypt = require('bcryptjs');


app.use(cors())
// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);
app.use('/api', transporterRoutes);
app.use('/api', receptorRoutes);
app.use('/api', areaRoutes);
app.use('/api', containerRoutes);
app.use('/api', dangerous_wasteRoutes);
app.use('/api', registerRoutes);
app.use('/api', logRoutes);
app.use('/api', opcionesRoutes);
// Conexión y servidor
sequelize.sync()
  .then(async () => {
    console.log('Conexión a base de datos exitosa');
    const baseUsers = [
      { nombre: 'Admin', email: 'admin@example.com', contraseña: await bcrypt.hash('admin123', 10) },
      { nombre: 'Usuario1', email: 'user1@example.com', contraseña: await bcrypt.hash('user123', 10) },
      { nombre: 'Usuario2', email: 'user2@example.com', contraseña: await bcrypt.hash('user456', 10) }
    ];
    app.listen(port, () => {
      console.log('Servidor corriendo');
    });
  })
  .catch(error => console.error('Error al conectar:', error));
