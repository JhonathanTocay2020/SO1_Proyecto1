const express = require('express'); 
const mysql = require('mysql2');    //Importando libreria para conectarse a una BD de MYSQL
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

var conexion = mysql.createConnection({     
    host: 'localhost',
    database: 'proyecto1',
    user: 'root',
    password: 'mysql1234',
    timezone: 'Z'
});

conexion.connect(function(error){   
    if(error){
        throw error;
    }else{
        console.log("CONEXION EXITOSA A LA BASE DE DATOS");
    }
});

app.get('/', (req, res) => {
    res.json({mensaje: "Api Proyecto1"})
});

app.get('/recopilacion', (req, res) => {
    conexion.query('SELECT * FROM votos', function (error, resultados, campos) {
      if (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener los votos" });
      } else {
        res.json(resultados);
      }
    });
});

app.get('/top3', (req, res) => {
    var query = `SELECT departamento, COUNT(*) as total_votos FROM votos
    WHERE papeleta = 'Blanca'
    GROUP BY departamento
    ORDER BY total_votos DESC
    LIMIT 3`;

    conexion.query(query, function (error, resultados, campos) {
      if (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener los votos" });
      } else {
        res.json(resultados);
      }
    });
});

app.get('/muni', (req, res) => {
    /*var query = `SELECT municipio, partido, COUNT(*) * 100 / (SELECT COUNT(*) FROM votos WHERE papeleta = 'blanca' AND municipio = v.municipio) as porcentaje_votos
    FROM votos v
    WHERE papeleta = 'blanca'
    GROUP BY municipio, partido
    ORDER BY municipio ASC, porcentaje_votos DESC`;*/

    var query = `SELECT municipio, partido, COUNT(*) * 100 / (SELECT COUNT(*) FROM votos WHERE municipio = v.municipio) as porcentaje_votos
    FROM votos v
    GROUP BY municipio, partido
    ORDER BY municipio ASC, porcentaje_votos DESC`;

    conexion.query(query, function (error, resultados, campos) {
      if (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener los votos" });
      } else {
        res.json(resultados);
      }
    });
});

app.get('/depa', (req, res) => {
    /*var query = `SELECT departamento, partido, COUNT(*) * 100 / (SELECT COUNT(*) FROM votos WHERE papeleta = 'blanca' AND departamento = v.departamento) as porcentaje_votos
    FROM votos v
    WHERE papeleta = 'blanca'
    GROUP BY departamento, partido
    ORDER BY departamento ASC, porcentaje_votos DESC;`;*/

    var query = `SELECT departamento, partido, COUNT(*) * 100 / (SELECT COUNT(*) FROM votos WHERE departamento = v.departamento) as porcentaje_votos
    FROM votos v
    GROUP BY departamento, partido
    ORDER BY departamento ASC, porcentaje_votos DESC;`;

    conexion.query(query, function (error, resultados, campos) {
      if (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Error al obtener los votos" });
      } else {
        res.json(resultados);
      }
    });
});

const port = process.env.port || 4200;
app.listen(port, () => console.log('Escuchando en puerto 4200...'))