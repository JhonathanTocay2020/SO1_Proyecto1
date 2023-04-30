import React, { useState, useEffect } from 'react';

import "../css/style.css"

//--------------------------------------------------------------
export default function Reloj() {
    const [horaActual, setHoraActual] = useState('');
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;
          setHoraActual(timeString);
        }, 1000);
        return () => clearInterval(intervalId);
      }, []);

    return (
            <h3 className="reloj-hora">{horaActual}</h3>
    );
}