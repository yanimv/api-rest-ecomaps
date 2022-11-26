const { Router } = require('express');
const router = Router();
const tablaFormulario = require('../basedatos/recicladoras-bd');

/*router.get('/', async (peti, resp)=>{
    try{
        const listaFormulario = await tablaFormulario.consultar();
        /*setTimeout(() => {
            resp.json(listaLibros);
        }, 3000);*/
        /*resp.json(listaFormulario);
    }catch(e){
        console.log('Error en el GET de la ruta formulario');
        console.log(e);
        resp.status(500).send(e.message);
    }
});*/

router.post('/', async (peti, resp)=>{
    try{
        let formulario = peti.body;
        console.log("Se va a guardar la recicladora del formulario.");
        console.log(formulario);
        await tablaFormulario.insertar(formulario);
        resp.sendStatus(200);
    }catch(e) {
        console.log('Error en el POST de la ruta formulario.');
        console.log(e);
        resp.status(500).send(e.message)    
    }
});

module.exports = router;