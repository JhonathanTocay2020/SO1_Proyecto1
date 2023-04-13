var express = require('express');
var router = express.Router();
const client = require('../gRPC_Client')

router.post('/agregarVoto', function(req,res){
    const json_votos  = {
        sede: req.body.sede,
        municipio: req.body.municipio,
        departamento: req.body.departamento,
        papeleta: req.body.papeleta,
        partido: req.body.partido
    }
    
    client.AddVoto(json_votos, function(err, response) {
        if(err){
            res.status(200).json({mensaje: err})
        }else{
            res.status(200).json({mensaje: response.message})
        }

    });
});

module.exports = router;