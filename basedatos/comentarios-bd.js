const conexion = require('./conexion');

async function insertar(comentarios){
    try{
        await conexion.execute('INSERT INTO comentarios (idcomentario, comentario) VALUES (?, ?)', [comentarios.idcomentario, comentarios.comentario]);
    }catch(error){
        console.log('Error al insertar comentario en la tabla comentarios de la base de datos');
        console.log(error);
        throw error;
    }
}

module.exports = {insertar};