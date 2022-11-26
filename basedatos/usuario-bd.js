const conexion = require('./conexion');

async function getUsuarioPorCi(ci, password){
    try{
        const [resultado] = await conexion.query('SELECT * FROM usuario WHERE ci = ? AND password = sha2(?, 256)', [ci, password]);
        return resultado;
    }catch(e){
        console.error('Error al consultar usuario por ci y password', e);
        throw e;
    }
}

module.exports = { getUsuarioPorCi}