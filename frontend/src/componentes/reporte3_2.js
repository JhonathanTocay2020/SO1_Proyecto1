import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const URL = "http://localhost:4200";
const urlGet = URL+"/muni"; 

export default function Rep32() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(urlGet)
      .then(response => {
        let tempLabels = [];
        let tempData = [];
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++) {
          tempLabels.push(response.data[i].municipio + "-" + response.data[i].partido)
          tempData.push(parseFloat(response.data[i].porcentaje_votos));
        }
        console.log(tempLabels)
        console.log(tempData)
        setLabels(tempLabels);
        setData(tempData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# CPU',
        data: data,
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
      legend: {
        position: 'bottom',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    width: 400,
    height: 400,
  };
  return (
    
      <div style={{ width: '400px', height: '400px' }}>
        <h3>Reporte 3: Municipios</h3>
        <Pie data={chartData} options={options} />
      </div>
    
  );
};
