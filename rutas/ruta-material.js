const { Router } = require('express');
const router = Router();
const tablaMaterial = require('../basedatos/material-bd');

router.get('/', async (peti, resp)=>{
    try{
        const listaMateriales = await tablaMaterial.consultar();
        /*setTimeout(() => {
            resp.json(listaLibros);
        }, 3000);*/
        resp.json(listaMateriales);
    }catch(e){
        console.log('Error en el GET de la ruta material');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

module.exports = router;