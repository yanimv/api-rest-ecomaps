const conexion = require('./conexion');

async function consultar(){
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM recicladoras WHERE estado = "Visible"');
        return rows;
    } catch(error) {
        console.log('Error al consultar recicladoras en la base de datos');
        console.log(error);
        throw error;
    }
}

async function consultarTodo(){
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM recicladoras');
        return rows;
    } catch(error) {
        console.log('Error al consultar recicladoras en la base de datos');
        console.log(error);
        throw error;
    }
}

async function seleccionar(idmaterial){
    try {
        let resultado = [];
        if(idmaterial){
            let consulta = 'SELECT * FROM recicladoras WHERE recicladoras.idrecicladora IN (SELECT idrecicladora FROM detalleMaterial WHERE detalleMaterial.idmaterial = ?)'
            if(Array.isArray(idmaterial)){
                consulta = 'SELECT * FROM recicladoras WHERE recicladoras.idrecicladora IN (SELECT idrecicladora FROM detalleMaterial WHERE detalleMaterial.idmaterial IN (?))'
            }
            const [registros, campos] = await conexion.query(consulta, [idmaterial]);
            resultado = registros;
        }
        return resultado;
    }catch(error) {
        console.log('Error al consultar vista_recicladoras en la base de datos');
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

async function insertar(recicladora){
    try{
        const [result] = await conexion.execute('INSERT INTO recicladoras (idrecicladora, nombre_rec, telefono_rec, paga, ciudad, barrio, calle, gps, estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [recicladora.idrecicladora, recicladora.nombre_rec, recicladora.telefono_rec, recicladora.paga, recicladora.ciudad, recicladora.barrio, recicladora.calle, recicladora.gps, 'Pendiente']);
        return result.insertId;
    }catch(error){
        console.log('Error al insertar recicladora en la base de datos');
        console.log(error);
        throw error;
    }
}

async function insertarAdmi(recicladora){
    try{
        await conexion.execute('INSERT INTO recicladoras (idrecicladora, nombre_rec, telefono_rec, paga, ciudad, barrio, calle, gps, estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [recicladora.idrecicladora, recicladora.nombre_rec, recicladora.telefono_rec, recicladora.paga, recicladora.ciudad, recicladora.barrio, recicladora.calle, recicladora.gps, recicladora.estado]);
    }catch(error){
        console.log('Error al insertar recicladora en la base de datos');
        console.log(error);
        throw error;
    }
}

async function actualizar(recicladoras){
    try {
        const [res] = await conexion.execute(
            'UPDATE recicladoras SET nombre_rec = ?, telefono_rec = ?, paga = ?, ciudad = ?, barrio = ?, calle = ?, gps = ?, estado = ? WHERE idrecicladora = ?', 
            [recicladoras.nombre_rec, recicladoras.telefono_rec, recicladoras.paga, recicladoras.ciudad, recicladoras.barrio, recicladoras.calle, recicladoras.gps, recicladoras.estado, recicladoras.idrecicladora]);
        console.log(res);
    } catch(error){
        console.log('Error al actualizar recicladora',error);
        throw error;
    }
};

async function eliminar(idrecicladora){
    try {
        await conexion.execute('DELETE FROM recicladoras WHERE idrecicladora = ?', [idrecicladora]);
    } catch(error) {
        console.log('Error al eliminar recicladora',error);
        throw error;
    }
};


module.exports = {consultar, consultarTodo, seleccionar, seleccionarRecicladora, insertar, insertarAdmi, actualizar, eliminar};