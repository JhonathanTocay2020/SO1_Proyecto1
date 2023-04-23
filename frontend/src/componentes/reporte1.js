import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import "../css/nav.css"

//--------------------------------------------------------------
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

const URL = "http://localhost:4200";
const urlGet = URL+"/recopilacion"; 

export default function Rep1() {
    const [datos, setDatos] = useState({});
    useEffect(() => {
        /*setInterval(() => {
            axios.get(urlGet)
          .then(response => {
            console.log(response.data[0])
            setDatos(response.data[0]);
          })
          .catch(error => {
            console.log(error);
          });
        }, 1000);*/
        axios.get(urlGet)
        .then(response => {
            console.log(response.data)
            setDatos(response.data);
        })
        .catch(error => {
            console.log(error);
        });
      }, []);

    /*const data =[
        {"Name":'John', "Email": 'john@example.com'},
        {"Name":'Mark', "Email": 'mark@gmail.com'}
    ];*/

    const columns = [
        { id: 'id_voto', name: 'id_voto' },
        { id: 'no_sede', name: 'no_sede' },
        { id: 'municipio', name: 'municipio'},
        { id: 'departamento', name: 'departamento'},
        { id: 'papeleta', name: 'papeleta'},
        { id: 'partido', name: 'partido'}
    ];
    return (
        <div>
            <h3>Reporte 1: Datos almacenados</h3>
            {<Grid
                data={datos}
                columns={columns}
                pagination={{
                    limit: 5,
                }}
            />}
        </div>
    );
}