import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
Chart.register(
  // Importar y registrar controladores de Chart.js aquí
);

const URL = "http://api.34.66.60.225.nip.io";
const urlGet = URL+"/top"; 

export default function Rep4() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  /*useEffect(() => {
      axios.get(urlGet)
      .then(response => {
        console.log(response.data);
        setDatos(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  }, []);*/
  const fetchData = () => {
    axios.get(urlGet)
      .then(response => {
        //console.log(response.data);
        setDatos(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 5000);
    return () => clearTimeout(timer);
  }, [datos]);
  
  
  const data = {
    //labels: ['1', '2', '3', '4', '5'],
    //labels: [datos[0]?.x, datos[1]?.x, datos[2]?.x, datos[3]?.x, datos[4]?.x],
    labels: [
      datos[0]?.x ? 'Sede: '+datos[0].x + '\n' + datos[0].municipio : '',
      datos[1]?.x ? 'Sede: '+datos[1].x + '\n' + datos[1].municipio : '',
      datos[2]?.x ? 'Sede: '+datos[2].x + '\n' + datos[2].municipio : '',
      datos[3]?.x ? 'Sede: '+datos[3].x + '\n' + datos[3].municipio : '',
      datos[4]?.x ? 'Sede: '+datos[4].x + '\n' + datos[4].municipio : '',
    ],
    datasets: [
      {
        label: '# VOTOS',
        data: [datos[0]?.value, datos[1]?.value, datos[2]?.value, datos[3]?.value, datos[4]?.value],
        //data: [3,1,4,2,1],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Top 5 sedes con más votos',
        padding: {
          bottom: 10
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{width: '80%', height: '500px'}}>

        <h3>Reporte 4: </h3>
        {error ? (
          <p>Ha ocurrido un error al cargar los datos: {error}</p>
        ) : (
          <Bar data={data} options={options} />
        )}

    </div>
  );
};
