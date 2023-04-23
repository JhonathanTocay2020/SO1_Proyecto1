import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "../css/nav.css"

//--------------------------------------------------------------
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

const URL = "http://localhost:4200";
const urlGet = URL+"/ultimos5"; 

export default function Rep5() {
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
        { id: 'sede', name: 'sede' },
        { id: 'municipio', name: 'municipio'},
        { id: 'departamento', name: 'departamento'},
        { id: 'papeleta', name: 'papeleta'},
        { id: 'partido', name: 'partido'}
    ];
    return (
        <div>
            <h3>Reporte 5: ultimos 5</h3>
            {<Grid
                data={datos}
                columns={columns}
            />}
        </div>
    );
}