/*const conexion = require('./conexion');

async function consultar(){
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM formulario');
        return rows;
    } catch(error) {
        console.log('Error al consultar recicladoras en la tabla formulario de la base de datos');
        console.log(error);
        throw error;
    }
}


async function insertar(formulario){
    try{
        await conexion.execute('INSERT INTO formulario (idformulario, nombre, ciudad, barrio, calle, gps, telefono, paga, material) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [formulario.idformulario, formulario.nombre, formulario.ciudad, formulario.barrio, formulario.calle, formulario.gps, formulario.telefono, formulario.paga, formulario.material]);
    }catch(error){
        console.log('Error al insertar recicladora en la tabla formulario de la base de datos');
        console.log(error);
        throw error;
    }
}

module.exports = {consultar, insertar};*/