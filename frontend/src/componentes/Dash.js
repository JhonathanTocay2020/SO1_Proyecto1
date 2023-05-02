import React, { Component } from "react";
import Rep1 from "./reporte1";
import Rep2 from "./reporte2";
import Rep5 from "./reporte5";
import Rep4 from "./reporte4";
import Rep31 from "./reporte3_1";
import Rep32 from "./reporte3_2";
import Reloj from "./Reloj";
import "../css/style.css"
import "gridjs/dist/theme/mermaid.css";


class Dash extends Component{
    
    reload = () => {
        window.location.reload(true);
    }
    componentDidUpdate(){
        this.reload()
    }
    render(){
        return(
        <div>
            <div className="header">
                <h1>Dashboard</h1>
                <Reloj></Reloj>               
            </div>

            <div style={{height: '150px'}}></div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: '80%',
                margin: "0 auto",
              }}>
                
                {
                    /*
                    <Rep1></Rep1>
                    <Rep2></Rep2> 
                    <Rep4></Rep4>              
                    <Rep5></Rep5>    
                    
                    
                    */
                } 
                <div >
                    <Rep1 />
                </div>
                
                <Rep2></Rep2>
                <br></br>
                <br></br> 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '400px' }}>
                    <Rep31></Rep31>
                    <Rep32></Rep32>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Rep4></Rep4>
                <br></br>
                <br></br>
                <br></br>
                <Rep5></Rep5> 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
        );
    }
}

export default Dash;