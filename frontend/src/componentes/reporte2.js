import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "../css/nav.css"

//--------------------------------------------------------------
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

const URL = "http://localhost:4200";
const urlGet = URL+"/top3"; 

export default function Rep2() {
    const [datos, setDatos] = useState({});
    useEffect(() => {
        axios.get(urlGet)
        .then(response => {
            console.log(response.data)
            setDatos(response.data);
        })
        .catch(error => {
            console.log(error);
        });
      }, []);

    const columns = [
        { id: 'departamento', name: 'departamento'},
        { id: 'total_votos', name: 'Votos'}
    ];
    return (
        <div>
            <h3>Reporte 2: Top 3 de departamentos con mayores votos para presidente</h3>
            {<Grid
                data={datos}
                columns={columns}
            />}
        </div>
    );
}