const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (peti, resp)=>{
    resp.send("Hola desde el SERVIDOR REST");
});

app.use('/recicladoras', require('./rutas/ruta-recicladoras'));
app.use('/listarecicladoras', require('./rutas/ruta-listarecicladoras'));
app.use('/administrar', require('./rutas/ruta-administradorRec'));
app.use('/material', require('./rutas/ruta-material'));
app.use('/sesion', require('./rutas/ruta-sesion'));
app.use('/comentarios', require('./rutas/ruta-comentarios'));
app.use('/detalleMaterial', require('./rutas/ruta-detalleMaterial'));

app.listen(3000, ()=>{
    console.log('El servidor inició y está escuchando en el puerto 3000.')
});