var mysql = require('mysql2');

var mysqlConexion = mysql.createConnection({     
    host: '127.0.0.1',
    database: 'Proyecto1',
    user: 'root',
    password: 'mysql1234',
    timezone: 'Z'
});

mysqlConexion.connect(function(error){   
    if(error){
        throw error;
    }else{
        console.log("CONEXION EXITOSA A LA BASE DE DATOS");
    }
});

module.exports = mysqlConexion;