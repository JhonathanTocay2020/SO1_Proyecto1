var PROTO_PATH = './proto/proyecto1.proto';
var mysql = require('mysql2');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var proyecto1_proto = grpc.loadPackageDefinition(packageDefinition).proyecto1;

//const mysqlConexion = require('./mysql_conexion');

var mysqlConexion = mysql.createConnection({     
  host: '35.192.54.180',
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

function AddVoto(call, callback) {
  //console.log(call.request);
  

  mysqlConexion.query('INSERT INTO `votos` (`no_sede`,`municipio`,`departamento`,`papeleta`,`partido`) VALUES (?, ?, ?, ?,?)',
    [call.request.sede, call.request.municipio, call.request.departamento, call.request.papeleta, call.request.partido], function(err,result,fields){
        if(err){
            console.log(err)
        }else{
            callback(null, {message: "Se agregó un nuevo Voto!"});
        }
    })
}

function main() {
  var server = new grpc.Server();
  server.addService(proyecto1_proto.Votos.service, {AddVoto: AddVoto});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Servidor gRPC en puerto 50051')
  });
}

main();
