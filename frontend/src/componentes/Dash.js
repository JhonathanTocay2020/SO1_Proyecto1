import React, { Component } from "react";
//import Rep1 from "./reporte1";
//import Rep2 from "./reporte2";
//import Rep5 from "./reporte5";
import Rep4 from "./reporte4";
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
                </div>
                {
                    /*
                    <Rep1></Rep1>
                    <Rep2></Rep2>               
                    <Rep5></Rep5>    
                    */
                }
                <Rep4></Rep4>
                
            </div>
        );
    }
}

export default Dash;