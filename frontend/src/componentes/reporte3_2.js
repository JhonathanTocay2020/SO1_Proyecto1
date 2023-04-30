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
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [municipios, setMunicipios] = useState([]);

  /*useEffect(() => {
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

        // Obtener la lista de municipios únicos
        const uniqueMunicipios = Array.from(new Set(response.data.map(item => item.municipio)));
        setMunicipios(uniqueMunicipios);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);*/

  useEffect(() => {
    getData(); // Ejecutar la petición GET al cargar el componente

    const interval = setInterval(() => {
      getData(); // Ejecutar la petición GET cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const getData = () => {
    axios.get(urlGet)
      .then(response => {
        let tempLabels = [];
        let tempData = [];
        //console.log(response.data)
        for(let i = 0; i < response.data.length; i++) {
          tempLabels.push(response.data[i].municipio + "-" + response.data[i].partido)
          tempData.push(parseFloat(response.data[i].porcentaje_votos));
        }
        //console.log(tempLabels)
        //console.log(tempData)
        setLabels(tempLabels);
        setData(tempData);

        // Obtener la lista de municipios únicos
        const uniqueMunicipios = Array.from(new Set(response.data.map(item => item.municipio)));
        setMunicipios(uniqueMunicipios);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleMunicipioChange = (event) => {
    setSelectedMunicipio(event.target.value);
  }

  const filteredLabels = labels.filter(label => label.startsWith(selectedMunicipio));
  const filteredData = filteredLabels.map(label => {
    const index = labels.indexOf(label);
    return data[index];
  });

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: '# Votos',
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
      <h3>Reporte 3: Municipios </h3>
      <div style={{ width: '400px', height: '400px' }}>
        <select onChange={handleMunicipioChange} value={selectedMunicipio} style={{width: '300px', border: "1px solid #ccc", padding: "5px"}}>
          <option value="">Seleccione un municipio</option>
          {municipios.map(municipio => (
            <option key={municipio} value={municipio}>{municipio}</option>
          ))}
        </select>
        <br></br>
        <br></br>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

