import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid as GridJS } from 'gridjs-react';


const URL = "http://localhost:4200";
const urlGet = URL + "/recopilacion";

export default function Rep1() {
  const [datos, setDatos] = useState([]);

  const fetchData = () => {
    axios.get(urlGet)
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 10000);
    return () => clearTimeout(timer);
  }, [datos]);

  const columns = [
    { id: 'id_voto', name: 'id_voto' },
    { id: 'no_sede', name: 'no_sede' },
    { id: 'municipio', name: 'municipio' },
    { id: 'departamento', name: 'departamento' },
    { id: 'papeleta', name: 'papeleta' },
    { id: 'partido', name: 'partido' }
  ];

  return (
    <div>
      <h3>Reporte 1: Datos almacenados</h3>
      <GridJS
        data={datos}
        columns={columns}
        pagination={{
          limit: 5,
        }}
      />
    </div>
  );
}
