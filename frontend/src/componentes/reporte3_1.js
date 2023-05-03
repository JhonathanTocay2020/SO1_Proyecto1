/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const URL = "http://localhost:4200";
const urlGet = URL+"/depa"; 

export default function Rep31() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(urlGet)
      .then(response => {
        let tempLabels = [];
        let tempData = [];
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++) {
          tempLabels.push(response.data[i].departamento + "-" + response.data[i].partido)
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
        <h3>Reporte 3: Departamentos </h3>
        <Pie data={chartData} options={options} />
      </div>
    
  );
};*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const URL = "http://api.34.66.60.225.nip.io";
const urlGet = URL+"/depa";

export default function Rep31() {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  /*useEffect(() => {
    axios.get(urlGet)
      .then(response => {
        let tempLabels = [];
        let tempData = [];
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++) {
          tempLabels.push(response.data[i].departamento + "-" + response.data[i].partido)
          tempData.push(parseFloat(response.data[i].porcentaje_votos));
        }
        console.log(tempLabels)
        console.log(tempData)
        setLabels(tempLabels);
        setData(tempData);

        // Obtener la lista de departamentos únicos
        const uniqueDepartamentos = Array.from(new Set(response.data.map(item => item.departamento)));
        setDepartamentos(uniqueDepartamentos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);*/

  const fetchData = () => {
    axios.get(urlGet)
      .then(response => {
        let tempLabels = [];
        let tempData = [];
        //console.log(response.data)
        for(let i = 0; i < response.data.length; i++) {
          tempLabels.push(response.data[i].departamento + "-" + response.data[i].partido)
          tempData.push(parseFloat(response.data[i].porcentaje_votos));
        }
        //console.log(tempLabels)
        //console.log(tempData)
        setLabels(tempLabels);
        setData(tempData);

        // Obtener la lista de departamentos únicos
        const uniqueDepartamentos = Array.from(new Set(response.data.map(item => item.departamento)));
        setDepartamentos(uniqueDepartamentos);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData(); // llamamos a fetchData() para obtener los datos inicialmente
    const interval = setInterval(() => {
      fetchData(); // llamamos a fetchData() cada 5 segundos
    }, 5000);
    return () => clearInterval(interval); // limpiamos el intervalo al desmontar el componente
  }, []);

  const handleDepartamentoChange = (event) => {
    setSelectedDepartamento(event.target.value);
  }

  const filteredLabels = labels.filter(label => label.startsWith(selectedDepartamento));
  const filteredData = filteredLabels.map(label => {
    const index = labels.indexOf(label);
    return data[index];
  });

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: '# CPU',
        data: filteredData,
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
    <div>
      <h3>Reporte 3: Departamentos </h3>
      <div style={{ width: '400px', height: '400px' }}>
        <select onChange={handleDepartamentoChange} value={selectedDepartamento} style={{width: '300px', border: "1px solid #ccc", padding: "5px"}}>
          <option value="">Seleccione un departamento</option>
          {departamentos.map(departamento => (
            <option key={departamento} value={departamento}>{departamento}</option>
          ))}
        </select>
        <br></br>
        <br></br>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

