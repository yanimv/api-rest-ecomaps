const { Router } = require('express');
const router = Router();
const tablaComentarios = require('../basedatos/comentarios-bd');

router.post('/', async (peti, resp)=>{
    try{
        let comentarios = peti.body;
        console.log("Se va a guardar el comentario.");
        console.log(comentarios);
        await tablaComentarios.insertar(comentarios);
        resp.sendStatus(200);
    }catch(e) {
        console.log('Error en el POST de la ruta comentarios.');
        console.log(e);
        resp.status(500).send(e.message)    
    }
});

module.exports = router;