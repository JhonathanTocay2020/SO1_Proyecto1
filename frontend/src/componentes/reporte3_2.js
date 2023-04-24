/*import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const URL =  process.env.REACT_APP_API_URL
const urlGet = URL+"/ResumenRAM"; 
//--------------------------------------------------------------
ChartJS.register(ArcElement, Tooltip, Legend);
export default function MyComponent() {
    const [datos, setDatos] = useState({});
    useEffect(() => {
        setInterval(() => {
          axios.get(urlGet)
          .then(response => {
            console.log(response.data[0])
            setDatos(response.data[0]);
          })
          .catch(error => {
            console.log(error);
          });
        }, 1000);
      }, []);
    //const [isLoading, setIsLoading] = useState(true);
  
    const data = {
        labels: ['Libre', 'Usado'],
        datasets: [
          {
            label: '# RAM',
            //data: [datos.valor1, datos.valor2],
            data: [parseInt(datos.ram_libre), parseInt(datos.ram_en_uso)],
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
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
  return (
    <>
        <div>
          <div>
            <h2>Grafica Ram</h2>
            <Doughnut data={data} />          
          </div>
        </div>
    </>
  );
}*/