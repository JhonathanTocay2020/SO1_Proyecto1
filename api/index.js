const express = require('express'); 
const mysql = require('mysql2');    //Importando libreria para conectarse a una BD de MYSQL
const cors = require('cors');
const Redis = require('ioredis');
const redis = new Redis();
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

app.get('/ultimos5', (req, res) => {
    redis.keys('voto:*').then(keys => {
      // Sort the keys in reverse order
      keys = keys.sort((a, b) => b.localeCompare(a));
      keys = keys.slice(0, 5);
    
      // Retrieve the values for the last 5 keys
      return redis.mget(keys);
    }).then(values => {
      // Parse the JSON values and send them in the response
      values = values.map(v => JSON.parse(v));
      res.send(values);
    }).catch(error => {
      console.error(error);
      res.status(500).send('Error retrieving last 5 votes');
    });
});

//----------------------------------------------------------------------------------
app.get('/top', async (req, res) => {
  try {
    const keys = await redis.keys('voto:*');

    const sedes = {};

    // Iterar sobre las claves de Redis y contar los votos por sede
    keys.forEach(key => {
      redis.get(key, (error, value) => {
        if (error) {
          throw error;
        }

        const voto = JSON.parse(value);

        if (!sedes[voto.sede]) {
          sedes[voto.sede] = {
            votos: 0,
            municipio: voto.municipio,
            departamento: voto.departamento
          };
        }

        sedes[voto.sede].votos++;
      });
    });

    // Esperar a que se procesen todas las claves
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Ordenar las sedes por número de votos y tomar las 5 primeras
    const topSedes = Object.entries(sedes)
      .sort((a, b) => b[1].votos - a[1].votos)
      .slice(0, 5);

    // Crear un array de objetos con la sede, los votos, el municipio y el departamento
    const result = topSedes.map(([sede, data]) => ({
      sede,
      votos: data.votos,
      municipio: data.municipio,
      departamento: data.departamento
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las sedes con mayores votos');
  }
});
//-----------------------------------------------------------------------------------
const port = process.env.port || 4200;
app.listen(port, () => console.log('Escuchando en puerto 4200...'))