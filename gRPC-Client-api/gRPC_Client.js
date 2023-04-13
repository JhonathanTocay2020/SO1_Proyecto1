var PROTO_PATH ='./proto/proyecto1.proto';

var parseArgs = require('minimist');
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

var argv = parseArgs(process.argv.slice(2), {
  string: 'target'
});
var target;
if (argv.target) {
  target = argv.target;
} else {
  target = 'localhost:50051';
}
var client = new proyecto1_proto.Votos(target, grpc.credentials.createInsecure());

/*client.sayHello({name: user}, function(err, response) {
  console.log('Greeting:', response.message);
});*/

module.exports = client;

