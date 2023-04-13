const express = require('express'); 
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
//caso
app.use('/voto', require('./routes/votos.js'));

app.get('/', (req, res) => {
    res.json({mensaje: "Proyecto 1"})
});

/*app.listen(port, () => {
    console.log("Servidor en el puerto: ", port);
})*/

const port = process.env.port || 3300;
app.listen(port, () => console.log('Escuchando en puerto 3300...'))