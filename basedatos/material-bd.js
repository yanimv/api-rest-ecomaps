const conexion = require('./conexion');

async function consultar(){
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM material');
        return rows;
    } catch(error) {
        console.log('Error al consultar material en la base de datos');
        console.log(error);
        throw error;
    }
}

module.exports = {consultar};