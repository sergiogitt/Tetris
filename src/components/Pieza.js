
import React, { useState, useEffect } from 'react';
import '../styles/Tablero.css';
function Pieza(props) {
  function mostrarTablero() {
    const tabla = [];
    for (let i = 0; i < props.siguientePieza.length; i++) {
      const fila = [];
      for (let j = 0; j < props.siguientePieza[i].length; j++) {
        const celda = (
          <td key={`${i}-${j}`} className={(props.siguientePieza[i][j]==0)?props.coloresPieza:"fondo"}>
          </td>
        );
        fila.push(celda);
      }
      tabla.push(<tr key={i}>{fila}</tr>);
    }
    return (
      <table>
        <tbody>
          {tabla}
        </tbody>
      </table>
    );
  }
  
  return (
    <div>{mostrarTablero()}</div>
      
    
  );
}

export default Pieza;
