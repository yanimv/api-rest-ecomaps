const { Router } = require('express');
const router = Router();
const tablaDetalleMaterial = require('../basedatos/detalleMaterial-bd');

router.get('/', async (peti, resp)=>{
    try{
        const listaDetalleMaterial = await tablaDetalleMaterial.consultar();
        /*setTimeout(() => {
            resp.json(listaLibros);
        }, 3000);*/
        resp.json(listaDetalleMaterial);
    }catch(e){
        console.log('Error en el GET de la ruta detalleMaterial');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

router.post('/', async (peti, resp)=>{
    try{
        let detalleMaterial = peti.body;
        console.log("Se va a guardar la recicladora.");
        console.log(detalleMaterial);
        await tablaDetalleMaterial.insertar(detalleMaterial);
        resp.sendStatus(200);
    }catch(e) {
        console.log('Error en el POST de la ruta detalleMaterial.');
        console.log(e);
        resp.status(500).send(e.message)    
    }
});

router.put('/', async (peti, resp)=>{
    try{
        const recicladoraRecibida = peti.body;
        console.log(recicladoraRecibida);
        await tablaDetalleMaterial.actualizar(recicladoraRecibida);
        resp.sendStatus(200);
    }catch (e){
        console.log('Error en el PUT de la ruta detalleMaterial.');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

router.delete('/:idrecicladora', async (peti, resp)=>{
    try {
        let idrecicladora = peti.params.idrecicladora;
        console.log('Se va a eliminar el registro con idrecicladora '+idrecicladora);
        await tablaDetalleMaterial.eliminar(idrecicladora);
        resp.sendStatus(200);
    } catch(e){
        console.log('Error en el DELETE de la ruta detalleMaterial.');
        console.log(e);
        resp.status(500).send(e.message);

    }
});

module.exports = router;