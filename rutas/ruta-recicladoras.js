const { Router } = require('express');
const router = Router();
const tablaRecicladoras = require('../basedatos/recicladoras-bd');

router.get('/', async (peti, resp)=>{
    const {idmaterial} = peti.query;
    try{
        if (idmaterial){
            resp.json(await tablaRecicladoras.seleccionar(idmaterial));
        }else{
            resp.json(await tablaRecicladoras.consultar());
        }
        /*setTimeout(() => {
            resp.json(listaLibros);
        }, 3000);*/
        
    }catch(e){
        console.log('Error en el GET de la ruta recicladoras');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

router.get('/:idmaterial/materiales', async (peticion, respuesta) => {
    try {
        const idRecibido = peticion.params.idmaterial
        console.log(idRecibido);
        respuesta.json(await tablaRecicladoras.seleccionarRecicladora(idRecibido));
    } catch (err) {
        respuesta.status(500).send(err.message);
    }
});

module.exports = router;