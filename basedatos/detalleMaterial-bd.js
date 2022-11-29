const conexion = require('./conexion');

async function consultar(){
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM detalleMaterial');
        return rows;
    } catch(error) {
        console.log('Error al consultar la tabla detalleMaterial');
        console.log(error);
        throw error;
    }
}

async function insertar(detalleMaterial){
    try{
        await conexion.execute('INSERT INTO detalleMaterial (idrecicladora, idmaterial) VALUES (?, ?)', [detalleMaterial.idrecicladora, detalleMaterial.idmaterial]);
    }catch(error){
        console.log('Error al insertar en la tabla detalleMaterial');
        console.log(error);
        throw error;
    }
}

async function seleccionarRecicladora(idrecicladora){
    try {
        let resultado = [];
        if(idrecicladora){
            let consulta = 'SELECT * FROM material WHERE material.idmaterial IN (SELECT idmaterial FROM detalleMaterial WHERE detalleMaterial.idrecicladora = ?)'
            if(Array.isArray(idrecicladora)){
                consulta = 'SELECT * FROM material WHERE material.idmaterial IN (SELECT idmaterial FROM detalleMaterial WHERE detalleMaterial.idrecicladora IN (?))'
            }
            const [registros] = await conexion.query(consulta, [idrecicladora]);
            resultado = registros;
        }
        return resultado;
    }catch(error) {
        console.log('Error al consultar materiales en la base de datos');
        console.log(error);
        throw error;
    }
}

async function actualizar(detalleMaterial){
    try {
        const [res] = await conexion.execute(
            'UPDATE detalleMaterial SET idmaterial = ? WHERE idrecicladora = ? && idmaterial = ?', 
            [detalleMaterial.idmaterial, detalleMaterial.idrecicladora]);
        console.log(res);
    } catch(error){
        console.log('Error al actualizar detalleMaterial',error);
        throw error;
    }
};

async function eliminar(idrecicladora){
    try {
        await conexion.execute('DELETE FROM detalleMaterial WHERE idrecicladora = ?', [idrecicladora]);
    } catch(error) {
        console.log('Error al eliminar recicladora',error);
        throw error;
    }
};

module.exports = {consultar,insertar, seleccionarRecicladora, actualizar, eliminar};