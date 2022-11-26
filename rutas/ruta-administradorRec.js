const { Router } = require('express');
const router = Router();
const tablaRecicladoras = require('../basedatos/recicladoras-bd');

router.get('/', async (peti, resp)=>{
    try{
        const listaRecicladoras = await tablaRecicladoras.consultarTodo();
        /*setTimeout(() => {
            resp.json(listaLibros);
        }, 3000);*/
        resp.json(listaRecicladoras);
    }catch(e){
        console.log('Error en el GET de la ruta administradorRec');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

router.post('/', async (peti, resp)=>{
    try{
        let recicladora = peti.body;
        console.log("Se va a guardar la recicladora.");
        console.log(recicladora);
        await tablaRecicladoras.insertar(recicladora);
        resp.sendStatus(200);
    }catch(e) {
        console.log('Error en el POST de la ruta administradorRec.');
        console.log(e);
        resp.status(500).send(e.message)    
    }
});

router.put('/', async (peti, resp)=>{
    try{
        const recicladoraRecibida = peti.body;
        console.log(recicladoraRecibida);
        await tablaRecicladoras.actualizar(recicladoraRecibida);
        resp.sendStatus(200);
    }catch (e){
        console.log('Error en el PUT de la ruta administradorRec');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

router.delete('/:idrecicladora', async (peti, resp)=>{
    try {
        let idrecicladora = peti.params.idrecicladora;
        console.log('Se va a eliminar la recicladora con código '+idrecicladora);
        await tablaRecicladoras.eliminar(idrecicladora);
        resp.sendStatus(200);
    } catch(e){
        console.log('Error en el DELETE de la ruta administradorRec');
        console.log(e);
        resp.status(500).send(e.message);
        
    }
});

module.exports = router;